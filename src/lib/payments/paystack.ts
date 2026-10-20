import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Paystack gateway: the ONLY file that talks to Paystack. The rest of the app uses
 * src/lib/payments/service.ts, so another gateway (Flutterwave, Stripe, PayPal) can be added
 * later by writing a sibling file with the same shape.
 */

const API = "https://api.paystack.co";

const secretKey = () => {
  const key = process.env.PAYSTACK_SECRET_KEY?.trim();
  if (!key) throw new PaymentConfigError("PAYSTACK_SECRET_KEY is not set");
  // A public key (pk_...) pasted into the secret slot would only fail later with a confusing Paystack error.
  if (!key.startsWith("sk_")) {
    throw new PaymentConfigError(
      "PAYSTACK_SECRET_KEY must start with sk_test_ or sk_live_ (this looks like another kind of key)",
    );
  }
  return key;
};

/** Throws PaymentConfigError when the Paystack key is missing. Call before writing anything to the database. */
export const assertPaystackConfigured = () => {
  secretKey();
};

export class PaymentConfigError extends Error {}
export class GatewayError extends Error {}

interface PaystackResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  const body = (await res
    .json()
    .catch(() => null)) as PaystackResponse<T> | null;
  if (!res.ok || !body?.status) {
    throw new GatewayError(body?.message ?? `Paystack error (${res.status})`);
  }
  return body.data;
};

/** Paystack takes the smallest currency unit (kobo for NGN, cents for USD). */
export const toMinorUnits = (amount: number) => Math.round(amount * 100);

export interface InitializeInput {
  reference: string;
  email: string;
  amount: number;
  currency: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}

/** Starts a hosted checkout. The browser is sent to authorizationUrl; we never see card details. */
export const initializeTransaction = async (input: InitializeInput) => {
  const data = await request<{
    authorization_url: string;
    access_code: string;
    reference: string;
  }>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      reference: input.reference,
      email: input.email,
      amount: toMinorUnits(input.amount),
      currency: input.currency,
      callback_url: input.callbackUrl,
      metadata: input.metadata,
    }),
  });
  return {
    authorizationUrl: data.authorization_url,
    accessCode: data.access_code,
    reference: data.reference,
  };
};

export interface VerifiedTransaction {
  status: string;
  reference: string;
  /** In minor units, as Paystack reports it. */
  amount: number;
  currency: string;
  raw: unknown;
}

/** Asks Paystack directly whether a payment really succeeded. A browser "success" page is never proof. */
export const verifyTransaction = async (
  reference: string,
): Promise<VerifiedTransaction> => {
  const data = await request<{
    status: string;
    reference: string;
    amount: number;
    currency: string;
  }>(`/transaction/verify/${encodeURIComponent(reference)}`);
  return {
    status: data.status,
    reference: data.reference,
    amount: data.amount,
    currency: data.currency,
    raw: data,
  };
};

/** Checks the x-paystack-signature header: HMAC-SHA512 of the RAW request body with the secret key. */
export const isValidWebhookSignature = (
  rawBody: string,
  signature: string | null,
) => {
  if (!signature) return false;
  const expected = createHmac("sha512", secretKey())
    .update(rawBody)
    .digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
};
