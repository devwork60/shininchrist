import { COUNTRIES } from "@/constant/countries";
import { JoinInputError } from "@/lib/join";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

/** Admin-only member review. Callers MUST check getAdminUser() first; nothing here checks the role. */

export interface Applicant {
  userId: string;
  name: string;
  email: string;
  country: string;
  whatsapp: string;
  isMinor: boolean;
  status: string;
  proofStatus: string;
  consentStatus: string;
  platform: string | null;
  uniformPaid: boolean;
  memberId: string | null;
  proofUrl: string | null;
  consentUrl: string | null;
  /** Everything the Join guide requires is confirmed, so the member can be activated. */
  ready: boolean;
}

const signed = async (bucket: string, path: string | null) => {
  if (!path) return null;
  const supabase = await createClient();
  // The admin's own session is used: storage rules let only admins read these private files.
  const { data } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 600);
  return data?.signedUrl ?? null;
};

export const listApplicants = async (): Promise<Applicant[]> => {
  const memberships = await prisma.memberships.findMany({
    orderBy: { updated_at: "desc" },
    take: 200,
  });
  const ids = memberships.map((m) => m.user_id);

  const [profiles, paid] = await Promise.all([
    prisma.profiles.findMany({ where: { id: { in: ids } } }),
    prisma.payments.groupBy({
      by: ["user_id"],
      where: {
        user_id: { in: ids },
        purpose: "uniform",
        status: "confirmed",
        verified_at: { not: null },
      },
      _count: { _all: true },
    }),
  ]);

  return Promise.all(
    memberships.map(async (m) => {
      const profile = profiles.find((p) => p.id === m.user_id);
      const uniformPaid = paid.some((p) => p.user_id === m.user_id);
      const ready =
        Boolean(
          profile?.full_name && profile.date_of_birth && profile.country_code,
        ) &&
        m.proof_status === "verified" &&
        (!m.is_minor || m.consent_status === "verified") &&
        uniformPaid;

      return {
        userId: m.user_id,
        name: profile?.full_name ?? "(not filled in yet)",
        email: profile?.email ?? "",
        country: profile?.country_code ?? "",
        whatsapp: profile?.whatsapp ?? "",
        isMinor: m.is_minor,
        status: m.status,
        proofStatus: m.proof_status,
        consentStatus: m.consent_status,
        platform: m.social_platform,
        uniformPaid,
        memberId: m.member_id,
        proofUrl: await signed("proofs", m.proof_path),
        consentUrl: await signed("consents", m.consent_path),
        ready,
      };
    }),
  );
};

const PRE_PAYMENT = [
  "started",
  "form_completed",
  "subscription_pending",
  "subscription_verified",
  "consent_pending",
  "consent_verified",
] as const;

/** Verify or reject a member's proof screenshot or parental consent form. */
export const reviewItem = async (
  adminId: string,
  userId: string,
  item: "proof" | "consent",
  decision: "verify" | "reject",
) => {
  const membership = await prisma.memberships.findUnique({
    where: { user_id: userId },
  });
  if (!membership) throw new JoinInputError("Member not found.");
  if (membership.status === "active" || membership.status === "suspended") {
    throw new JoinInputError("This member is already active or suspended.");
  }

  const result = decision === "verify" ? "verified" : "rejected";
  if (item === "proof") {
    if (membership.proof_status === "not_submitted")
      throw new JoinInputError("No proof has been uploaded yet.");
    await prisma.memberships.update({
      where: { user_id: userId },
      data: { proof_status: result },
    });
    if (decision === "verify") {
      await prisma.memberships.updateMany({
        where: { user_id: userId, status: { in: [...PRE_PAYMENT] } },
        data: { status: "subscription_verified" },
      });
    }
  } else {
    if (!membership.is_minor)
      throw new JoinInputError("This member is not under 18.");
    if (membership.consent_status === "not_submitted")
      throw new JoinInputError("No consent form has been uploaded yet.");
    await prisma.memberships.update({
      where: { user_id: userId },
      data: { consent_status: result },
    });
    if (decision === "verify") {
      await prisma.memberships.updateMany({
        where: { user_id: userId, status: { in: [...PRE_PAYMENT] } },
        data: { status: "consent_verified" },
      });
    }
  }

  await prisma.audit_log.create({
    data: {
      actor_id: adminId,
      action: `membership.${item}_${result}`,
      target: userId,
    },
  });
};

/**
 * Activates a member after re-checking EVERY requirement from the Join guide:
 * registration form, verified proof, verified consent (under 18) and a server-confirmed uniform payment.
 * Then issues the Member ID (SC-NG-0000128 style) and the active_member role.
 */
export const activateMember = async (adminId: string, userId: string) => {
  const [membership, profile, paid] = await Promise.all([
    prisma.memberships.findUnique({ where: { user_id: userId } }),
    prisma.profiles.findUnique({ where: { id: userId } }),
    prisma.payments.count({
      where: {
        user_id: userId,
        purpose: "uniform",
        status: "confirmed",
        verified_at: { not: null },
      },
    }),
  ]);

  if (!membership || !profile) throw new JoinInputError("Member not found.");
  if (membership.status === "active")
    throw new JoinInputError("This member is already active.");
  if (membership.status === "suspended")
    throw new JoinInputError("This member is suspended.");
  if (!profile.full_name || !profile.date_of_birth || !profile.country_code) {
    throw new JoinInputError("The registration form is incomplete.");
  }
  if (membership.proof_status !== "verified")
    throw new JoinInputError("The social subscription proof is not verified.");
  if (membership.is_minor && membership.consent_status !== "verified") {
    throw new JoinInputError("The parental consent is not verified.");
  }
  if (paid === 0)
    throw new JoinInputError("The uniform payment is not confirmed.");

  const memberId = await prisma.$transaction(async (tx) => {
    const id =
      membership.member_id ??
      (
        await tx.$queryRaw<
          { id: string }[]
        >`select public.issue_member_id(${profile.country_code}::char(2)) as id`
      )[0].id;

    await tx.memberships.update({
      where: { user_id: userId },
      data: {
        status: "active",
        member_id: id,
        activated_at: new Date(),
        approved_by: adminId,
      },
    });
    await tx.user_roles.deleteMany({
      where: { user_id: userId, role: "pending" },
    });
    await tx.user_roles.upsert({
      where: { user_id_role: { user_id: userId, role: "active_member" } },
      create: { user_id: userId, role: "active_member" },
      update: {},
    });
    await tx.audit_log.create({
      data: {
        actor_id: adminId,
        action: "membership.activate",
        target: userId,
        details: { member_id: id },
      },
    });
    return id;
  });

  return memberId;
};

export interface MemberDetail {
  userId: string;
  email: string;
  signedUpAt: Date;
  profile: {
    fullName: string | null;
    dob: Date | null;
    age: number | null;
    gender: string | null;
    countryCode: string | null;
    state: string | null;
    whatsapp: string | null;
    interest: string | null;
  };
  membership: {
    status: string;
    chapter: string | null;
    memberId: string | null;
    isMinor: boolean;
    platform: string | null;
    proofStatus: string;
    consentStatus: string;
    activatedAt: Date | null;
    approvedBy: string | null;
    adminNotes: string | null;
    proofUrl: string | null;
    consentUrl: string | null;
  };
  roles: string[];
  orders: {
    id: string;
    reference: string;
    item: string;
    status: string;
    total: number | null;
    uniformCost: number | null;
    deliveryCost: number | null;
    currency: string;
    address: string;
    phone: string;
    createdAt: Date;
  }[];
  payments: {
    id: string;
    reference: string;
    gatewayRef: string | null;
    purpose: string;
    gateway: string;
    amount: number;
    currency: string;
    status: string;
    verifiedAt: Date | null;
    createdAt: Date;
  }[];
  sessions: { count: number; lastActive: Date | null };
  activity: { action: string; actor: string; at: Date; details: unknown }[];
}

const ageOf = (dob: Date) => {
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  if (
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
  )
    age -= 1;
  return age;
};

/** Everything an admin needs to know about one member, in one place. Callers must check getAdminUser() first. */
export const getMemberDetail = async (
  userId: string,
): Promise<MemberDetail | null> => {
  const [profile, membership, roles, orders, payments, sessions, audit] =
    await Promise.all([
      prisma.profiles.findUnique({ where: { id: userId } }),
      prisma.memberships.findUnique({ where: { user_id: userId } }),
      prisma.user_roles.findMany({ where: { user_id: userId } }),
      prisma.uniform_orders.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
      }),
      prisma.payments.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
      }),
      prisma.sessions.aggregate({
        where: { user_id: userId },
        _count: { _all: true },
        _max: { updated_at: true },
      }),
      prisma.audit_log.findMany({
        where: { target: userId },
        orderBy: { created_at: "desc" },
        take: 25,
      }),
    ]);
  if (!profile || !membership) return null;

  const actorIds = [
    ...new Set(
      [...audit.map((a) => a.actor_id), membership.approved_by].filter(
        (id): id is string => Boolean(id),
      ),
    ),
  ];
  const actors = await prisma.profiles.findMany({
    where: { id: { in: actorIds } },
  });
  const actorName = (id: string | null) => {
    const actor = actors.find((a) => a.id === id);
    return actor ? (actor.full_name ?? actor.email) : id ? "Admin" : "System";
  };

  return {
    userId,
    email: profile.email,
    signedUpAt: profile.created_at,
    profile: {
      fullName: profile.full_name,
      dob: profile.date_of_birth,
      age: profile.date_of_birth ? ageOf(profile.date_of_birth) : null,
      gender: profile.gender,
      countryCode: profile.country_code,
      state: profile.state_region,
      whatsapp: profile.whatsapp,
      interest: profile.area_of_interest,
    },
    membership: {
      status: membership.status,
      chapter: membership.chapter,
      memberId: membership.member_id,
      isMinor: membership.is_minor,
      platform: membership.social_platform,
      proofStatus: membership.proof_status,
      consentStatus: membership.consent_status,
      activatedAt: membership.activated_at,
      approvedBy: membership.approved_by
        ? actorName(membership.approved_by)
        : null,
      adminNotes: membership.admin_notes,
      proofUrl: await signed("proofs", membership.proof_path),
      consentUrl: await signed("consents", membership.consent_path),
    },
    roles: roles.map((r) => r.role),
    orders: orders.map((o) => ({
      id: o.id,
      reference: o.reference,
      item: `${o.uniform_type}, size ${o.size} × ${o.quantity}`,
      status: o.status,
      total: o.total ? Number(o.total) : null,
      uniformCost: o.uniform_cost ? Number(o.uniform_cost) : null,
      deliveryCost: o.delivery_cost ? Number(o.delivery_cost) : null,
      currency: o.currency,
      address: [
        o.delivery_address,
        o.delivery_city,
        o.delivery_state,
        o.country_code,
      ]
        .filter(Boolean)
        .join(", "),
      phone: o.delivery_phone,
      createdAt: o.created_at,
    })),
    payments: payments.map((p) => ({
      id: p.id,
      reference: p.internal_ref,
      gatewayRef: p.gateway_ref,
      purpose: p.purpose,
      gateway: p.gateway,
      amount: Number(p.amount),
      currency: p.currency,
      status: p.status,
      verifiedAt: p.verified_at,
      createdAt: p.created_at,
    })),
    sessions: {
      count: sessions._count._all,
      lastActive: sessions._max.updated_at,
    },
    activity: audit.map((a) => ({
      action: a.action,
      actor: actorName(a.actor_id),
      at: a.created_at,
      details: a.details,
    })),
  };
};

const NEXT_ORDER_STATUS: Record<string, string[]> = {
  paid: ["preparing", "shipped", "delivered"],
  preparing: ["shipped", "delivered"],
  shipped: ["delivered"],
};

/** Moves a PAID uniform order forward: preparing, shipped, delivered. Unpaid orders cannot be moved. */
export const setOrderStatus = async (
  adminId: string,
  orderId: string,
  status: string,
) => {
  const order = await prisma.uniform_orders.findUnique({
    where: { id: orderId },
  });
  if (!order) throw new JoinInputError("Order not found.");
  if (!NEXT_ORDER_STATUS[order.status]?.includes(status)) {
    throw new JoinInputError(
      order.status === "payment_pending" || order.status === "requested"
        ? "This order has not been paid yet."
        : "That status change is not allowed for this order.",
    );
  }
  await prisma.uniform_orders.update({
    where: { id: orderId },
    data: { status: status as "preparing" | "shipped" | "delivered" },
  });
  await prisma.audit_log.create({
    data: {
      actor_id: adminId,
      action: `order.${status}`,
      target: order.user_id,
      details: { order: order.reference },
    },
  });
};

export interface PriceRow {
  countryCode: string;
  currency: string;
  uniformPrice: number;
  deliveryFee: number;
  active: boolean;
}

/** Currencies Paystack can charge for this site today. Add JMD here only once Paystack supports it for the account. */
export const PRICE_CURRENCIES = ["NGN", "USD"] as const;

export const listUniformPrices = async (): Promise<PriceRow[]> => {
  const rows = await prisma.uniform_prices.findMany();
  return rows.map((row) => ({
    countryCode: row.country_code,
    currency: row.currency,
    uniformPrice: Number(row.uniform_price),
    deliveryFee: Number(row.delivery_fee),
    active: row.active,
  }));
};

/** Creates or updates the uniform price for one country. Admin only (callers check). */
export const saveUniformPrice = async (
  adminId: string,
  input: Record<string, unknown>,
) => {
  const countryCode = String(input.countryCode ?? "").toUpperCase();
  if (!Object.values(COUNTRIES).includes(countryCode))
    throw new JoinInputError("Unknown country.");

  const currency = String(input.currency ?? "").toUpperCase();
  if (!(PRICE_CURRENCIES as readonly string[]).includes(currency)) {
    throw new JoinInputError(
      "Choose NGN or USD. Those are the currencies Paystack can charge.",
    );
  }

  const uniformPrice = Number(input.uniformPrice);
  const deliveryFee = Number(input.deliveryFee ?? 0);
  if (
    !Number.isFinite(uniformPrice) ||
    uniformPrice <= 0 ||
    uniformPrice > 10_000_000
  ) {
    throw new JoinInputError("Enter a uniform price greater than zero.");
  }
  if (
    !Number.isFinite(deliveryFee) ||
    deliveryFee < 0 ||
    deliveryFee > 10_000_000
  ) {
    throw new JoinInputError("Enter a valid delivery fee (0 or more).");
  }
  const active = input.active !== false;

  const data = {
    currency,
    uniform_price: uniformPrice,
    delivery_fee: deliveryFee,
    active,
  };
  await prisma.uniform_prices.upsert({
    where: { country_code: countryCode },
    create: { country_code: countryCode, ...data },
    update: data,
  });
  await prisma.audit_log.create({
    data: {
      actor_id: adminId,
      action: "price.save",
      target: countryCode,
      details: { currency, uniformPrice, deliveryFee, active },
    },
  });
};
