import { COUNTRIES } from "@/constant/countries";
import { prisma } from "@/lib/prisma";

/** Server-side rules for the Join flow. The browser never decides status, age or prices. */

export class JoinInputError extends Error {}

export const ageFromDob = (dob: Date) => {
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const hadBirthday =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hadBirthday) age -= 1;
  return age;
};

const INTERESTS = ["Men", "Women", "Youth", "Academy"] as const;
const CHAPTER_BY_INTEREST = {
  Men: "men",
  Women: "women",
  Youth: "youth",
} as const;

/** Statuses a member can still move forward from. Approved / active / suspended are never changed by the member. */
export const EARLY_STATUSES = [
  "started",
  "form_completed",
  "subscription_pending",
  "subscription_verified",
  "consent_pending",
  "consent_verified",
  "uniform_payment_pending",
] as const;

export interface ProfileInput {
  fullName?: unknown;
  dob?: unknown;
  gender?: unknown;
  country?: unknown;
  state?: unknown;
  whatsapp?: unknown;
  interest?: unknown;
}

export const saveProfile = async (userId: string, input: ProfileInput) => {
  const fullName = String(input.fullName ?? "").trim();
  if (fullName.length < 2 || fullName.length > 120) {
    throw new JoinInputError("Please enter your full name.");
  }

  const dob = new Date(String(input.dob ?? ""));
  if (Number.isNaN(dob.getTime()) || dob > new Date()) {
    throw new JoinInputError("Please enter a valid date of birth.");
  }
  const age = ageFromDob(dob);
  if (age < 5 || age > 110)
    throw new JoinInputError("Please check your date of birth.");

  const gender = String(input.gender ?? "").toLowerCase();
  if (gender !== "male" && gender !== "female")
    throw new JoinInputError("Please choose your gender.");

  const countryCode = COUNTRIES[String(input.country ?? "")];
  if (!countryCode) throw new JoinInputError("Please choose your country.");

  const whatsapp = String(input.whatsapp ?? "").trim();
  if (!/^\+?[0-9 ()-]{7,20}$/.test(whatsapp)) {
    throw new JoinInputError("Please enter a valid WhatsApp number.");
  }

  const interest = String(input.interest ?? "");
  if (!(INTERESTS as readonly string[]).includes(interest)) {
    throw new JoinInputError("Please choose an area of interest.");
  }

  const isMinor = age < 18;
  const chapter =
    CHAPTER_BY_INTEREST[interest as keyof typeof CHAPTER_BY_INTEREST] ?? null;

  await prisma.$transaction([
    prisma.profiles.update({
      where: { id: userId },
      data: {
        full_name: fullName,
        date_of_birth: dob,
        gender,
        country_code: countryCode,
        state_region: input.state ? String(input.state).slice(0, 80) : null,
        whatsapp,
        area_of_interest: interest,
      },
    }),
    prisma.memberships.update({
      where: { user_id: userId },
      data: { is_minor: isMinor, chapter },
    }),
    // Only the first save moves the status; edits later never push someone backwards.
    prisma.memberships.updateMany({
      where: { user_id: userId, status: "started" },
      data: { status: "form_completed" },
    }),
  ]);

  return { isMinor };
};

export interface JoinStatus {
  signedIn: true;
  email: string;
  profile: {
    fullName: string | null;
    dob: string | null;
    gender: string | null;
    country: string | null;
    countryCode: string | null;
    state: string | null;
    whatsapp: string | null;
    interest: string | null;
  };
  membership: {
    status: string;
    isMinor: boolean;
    memberId: string | null;
    proofStatus: string;
    consentStatus: string;
    socialPlatform: string | null;
    chapter: string | null;
  };
  /** The newest uniform order, if any. */
  order: {
    reference: string;
    size: string;
    quantity: number;
    status: string;
    total: number | null;
    currency: string;
  } | null;
  uniformPaid: boolean;
}

/** Everything the wizard needs to resume where the applicant left off. */
export const getJoinStatus = async (
  userId: string,
  email: string,
): Promise<JoinStatus> => {
  const [profile, membership, order, paid] = await Promise.all([
    prisma.profiles.findUnique({ where: { id: userId } }),
    prisma.memberships.findUnique({ where: { user_id: userId } }),
    prisma.uniform_orders.findFirst({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    }),
    prisma.payments.count({
      where: {
        user_id: userId,
        purpose: "uniform",
        status: "confirmed",
        verified_at: { not: null },
      },
    }),
  ]);

  const countryCode = profile?.country_code ?? null;
  const countryName =
    Object.entries(COUNTRIES).find(([, code]) => code === countryCode)?.[0] ??
    null;

  return {
    signedIn: true,
    email,
    profile: {
      fullName: profile?.full_name ?? null,
      dob: profile?.date_of_birth
        ? profile.date_of_birth.toISOString().slice(0, 10)
        : null,
      gender: profile?.gender ?? null,
      country: countryName,
      countryCode,
      state: profile?.state_region ?? null,
      whatsapp: profile?.whatsapp ?? null,
      interest: profile?.area_of_interest ?? null,
    },
    membership: {
      status: membership?.status ?? "started",
      isMinor: membership?.is_minor ?? false,
      memberId: membership?.member_id ?? null,
      proofStatus: membership?.proof_status ?? "not_submitted",
      consentStatus: membership?.consent_status ?? "not_submitted",
      socialPlatform: membership?.social_platform ?? null,
      chapter: membership?.chapter ?? null,
    },
    order: order
      ? {
          reference: order.reference,
          size: order.size,
          quantity: order.quantity,
          status: order.status,
          total: order.total ? Number(order.total) : null,
          currency: order.currency,
        }
      : null,
    uniformPaid: paid > 0,
  };
};

/** Price for a country from the admin-managed price list (null when ShininChrist has not set one yet). */
export const getUniformPrice = async (countryCode: string) => {
  const price = await prisma.uniform_prices.findUnique({
    where: { country_code: countryCode },
  });
  if (!price?.active) return null;
  return {
    currency: price.currency,
    uniformPrice: Number(price.uniform_price),
    deliveryFee: Number(price.delivery_fee),
  };
};
