import { EARLY_STATUSES } from "@/lib/join";
import { prisma } from "@/lib/prisma";
import {
  assertPaystackConfigured,
  initializeTransaction,
  toMinorUnits,
  verifyTransaction,
} from "@/lib/payments/paystack";

/** Business rules for payments. Gateway details stay in paystack.ts. */

const GATEWAY = "paystack";
const SUPPORTED_CURRENCIES = ["NGN", "USD"] as const;

export class PaymentInputError extends Error {}

const cleanCurrency = (value: unknown) => {
  const currency = String(value ?? "").toUpperCase();
  if (!(SUPPORTED_CURRENCIES as readonly string[]).includes(currency)) {
    throw new PaymentInputError(
      "This currency is not available for online payment.",
    );
  }
  return currency;
};

const cleanEmail = (value: unknown) => {
  const email = String(value ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new PaymentInputError("Please enter a valid email address.");
  }
  return email;
};

export interface DonationInput {
  amount: unknown;
  currency: unknown;
  email: unknown;
  name?: unknown;
  fullName?: unknown;
  country?: unknown;
  designation?: unknown;
  frequency?: unknown;
}

/** One-time donation (open to everyone). Returns the Paystack checkout URL. */
export const startDonation = async (
  input: DonationInput,
  origin: string,
  userId?: string,
) => {
  assertPaystackConfigured();
  if (
    String(input.frequency ?? "")
      .toLowerCase()
      .includes("month")
  ) {
    throw new PaymentInputError(
      "Monthly giving is coming soon. Please choose a one-time gift for now.",
    );
  }

  const amount = Number(input.amount);
  if (!Number.isFinite(amount) || amount < 1 || amount > 10_000_000) {
    throw new PaymentInputError("Please enter a valid gift amount.");
  }
  const currency = cleanCurrency(String(input.currency ?? "").slice(0, 3));
  const email = cleanEmail(input.email);

  const payment = await prisma.payments.create({
    data: {
      purpose: "donation",
      user_id: userId ?? null,
      amount,
      currency,
      gateway: GATEWAY,
      status: "created",
      payer_name:
        (input.name ?? input.fullName)
          ? String(input.name ?? input.fullName).slice(0, 120)
          : null,
      payer_email: email,
      designation: input.designation
        ? String(input.designation).slice(0, 120)
        : null,
    },
  });

  return checkout(
    payment.id,
    payment.internal_ref,
    email,
    amount,
    currency,
    origin,
    {
      purpose: "donation",
      designation: payment.designation,
    },
  );
};

export interface UniformInput {
  size: unknown;
  quantity: unknown;
  address: unknown;
  city: unknown;
  state?: unknown;
  phone: unknown;
  country: unknown;
}

const SIZES = ["S", "M", "L", "XL", "XXL"];

/** Creates the uniform order with SERVER-side prices, then starts the checkout. */
export const startUniformPayment = async (
  input: UniformInput,
  user: { id: string; email: string; name: string },
  origin: string,
) => {
  assertPaystackConfigured();
  const size = String(input.size ?? "");
  if (!SIZES.includes(size))
    throw new PaymentInputError("Please choose a valid size.");
  const quantity = Math.floor(Number(input.quantity));
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
    throw new PaymentInputError("Quantity must be between 1 and 20.");
  }
  const profile = await prisma.profiles.findUnique({ where: { id: user.id } });
  const country = profile?.country_code ?? "";
  if (!country) {
    throw new PaymentInputError("Please complete the About You step first.");
  }
  const alreadyPaid = await prisma.payments.count({
    where: { user_id: user.id, purpose: "uniform", status: "confirmed" },
  });
  if (alreadyPaid > 0) {
    throw new PaymentInputError(
      "Your uniform payment has already been received.",
    );
  }
  const address = String(input.address ?? "").trim();
  const city = String(input.city ?? "").trim();
  const phone = String(input.phone ?? "").trim();
  if (!address || !city || !phone) {
    throw new PaymentInputError("Please complete the delivery details.");
  }

  const price = await prisma.uniform_prices.findUnique({
    where: { country_code: country },
  });
  if (!price?.active) {
    throw new PaymentInputError(
      "Uniform prices for your country have not been set yet. Please contact us.",
    );
  }
  const uniformCost = Number(price.uniform_price) * quantity;
  const deliveryCost = Number(price.delivery_fee);
  const total = uniformCost + deliveryCost;

  await prisma.uniform_orders.updateMany({
    where: {
      user_id: user.id,
      status: { in: ["requested", "payment_pending"] },
    },
    data: { status: "cancelled" },
  });

  const order = await prisma.uniform_orders.create({
    data: {
      user_id: user.id,
      size,
      quantity,
      country_code: country,
      delivery_address: address,
      delivery_city: city,
      delivery_state: input.state ? String(input.state) : null,
      delivery_phone: phone,
      uniform_cost: uniformCost,
      delivery_cost: deliveryCost,
      total,
      currency: price.currency,
      status: "payment_pending",
    },
  });

  await prisma.memberships.updateMany({
    where: { user_id: user.id, status: { in: [...EARLY_STATUSES] } },
    data: { status: "uniform_payment_pending" },
  });

  const payment = await prisma.payments.create({
    data: {
      purpose: "uniform",
      user_id: user.id,
      uniform_order_id: order.id,
      amount: total,
      currency: price.currency,
      gateway: GATEWAY,
      status: "created",
      payer_name: user.name,
      payer_email: user.email,
      country_code: country,
    },
  });

  return checkout(
    payment.id,
    payment.internal_ref,
    user.email,
    total,
    price.currency,
    origin,
    {
      purpose: "uniform",
      order: order.reference,
    },
  );
};

const checkout = async (
  paymentId: string,
  reference: string,
  email: string,
  amount: number,
  currency: string,
  origin: string,
  metadata: Record<string, unknown>,
) => {
  let authorizationUrl: string;
  let accessCode: string;
  try {
    ({ authorizationUrl, accessCode } = await initializeTransaction({
      reference,
      email,
      amount,
      currency,
      callbackUrl: `${origin}/payment/result`,
      metadata,
    }));
  } catch (error) {
    // Paystack refused to start it (for example a currency that is not enabled): do not leave a "created" row behind.
    await prisma.payments.update({
      where: { id: paymentId },
      data: { status: "failed" },
    });
    throw error;
  }
  await prisma.payments.update({
    where: { id: paymentId },
    data: { gateway_ref: reference, status: "pending" },
  });
  return { authorizationUrl, accessCode, reference };
};

export type ConfirmResult =
  | { state: "confirmed"; purpose: string }
  | { state: "pending" }
  | { state: "failed" }
  | { state: "unknown" };

/**
 * Confirms a payment. Called from the redirect page AND the webhook, so it must be safe to run many times.
 * Money is only marked confirmed after Paystack itself says "success" for the same amount and currency.
 */
export const confirmPayment = async (
  reference: string,
  source: "webhook" | "redirect",
): Promise<ConfirmResult> => {
  const payment = await prisma.payments.findUnique({
    where: { internal_ref: reference },
  });
  if (!payment) return { state: "unknown" };
  if (payment.status === "confirmed")
    return { state: "confirmed", purpose: payment.purpose };

  const result = await verifyTransaction(reference);

  if (
    result.status === "failed" ||
    result.status === "abandoned" ||
    result.status === "reversed"
  ) {
    await prisma.payments.update({
      where: { id: payment.id },
      data: {
        status: result.status === "failed" ? "failed" : "cancelled",
        raw_event: result.raw as object,
      },
    });
    return { state: "failed" };
  }
  if (result.status !== "success") return { state: "pending" };

  // The amount and currency must match what WE recorded, not what the browser claims.
  const expected = toMinorUnits(Number(payment.amount));
  if (
    result.amount !== expected ||
    result.currency.toUpperCase() !== payment.currency.toUpperCase()
  ) {
    await prisma.payments.update({
      where: { id: payment.id },
      data: { status: "pending_verification", raw_event: result.raw as object },
    });
    await prisma.audit_log.create({
      data: {
        action: "payment.mismatch",
        target: payment.id,
        details: { reference, source },
      },
    });
    return { state: "pending" };
  }

  // Only the first caller flips the status (updateMany with a status guard makes this race-safe).
  const flipped = await prisma.payments.updateMany({
    where: { id: payment.id, status: { not: "confirmed" } },
    data: {
      status: "confirmed",
      verified_at: new Date(),
      raw_event: result.raw as object,
    },
  });

  if (flipped.count === 1) {
    if (
      payment.purpose === "uniform" &&
      payment.uniform_order_id &&
      payment.user_id
    ) {
      await prisma.uniform_orders.update({
        where: { id: payment.uniform_order_id },
        data: { status: "paid" },
      });
      // Move the member forward, but never downgrade someone who is already approved, active or suspended.
      await prisma.memberships.updateMany({
        where: {
          user_id: payment.user_id,
          status: {
            in: [
              "started",
              "form_completed",
              "subscription_pending",
              "subscription_verified",
              "consent_pending",
              "consent_verified",
              "uniform_payment_pending",
            ],
          },
        },
        data: { status: "payment_confirmed" },
      });
    }
    await prisma.audit_log.create({
      data: {
        action: "payment.confirm",
        target: payment.id,
        details: { reference, source },
      },
    });
  }

  return { state: "confirmed", purpose: payment.purpose };
};
