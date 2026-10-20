import { JoinInputError } from "@/lib/join";
import { prisma } from "@/lib/prisma";
import { uploadPrivateFile, validateUpload } from "@/lib/uploads";
import {
  PaymentInputError,
  prepareUniformPayment,
  type UniformInput,
} from "./service";

/** Manual bank transfer: the person pays into the admin-configured account and uploads a receipt for an admin to check. */
export const MANUAL_GATEWAY = "bank_transfer";

type User = { id: string; email: string; name: string };

export interface BankAccountView {
  currency: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  instructions: string | null;
}

export interface ManualPaymentView {
  reference: string;
  status: string;
  amount: number;
  currency: string;
  submittedAt: Date | null;
  rejectionReason: string | null;
}

/** The bank account for the person's price currency, and their current manual payment (if any). */
export const getManualPaymentInfo = async (userId: string) => {
  const profile = await prisma.profiles.findUnique({ where: { id: userId } });
  const price = profile?.country_code
    ? await prisma.uniform_prices.findUnique({
        where: { country_code: profile.country_code },
      })
    : null;
  const account = price
    ? await prisma.bank_accounts.findUnique({
        where: { currency: price.currency },
      })
    : null;
  const payment = await prisma.payments.findFirst({
    where: {
      user_id: userId,
      purpose: "uniform",
      gateway: MANUAL_GATEWAY,
      uniform_orders: { status: { not: "cancelled" } },
    },
    orderBy: { created_at: "desc" },
  });

  const bank: BankAccountView | null =
    account?.active
      ? {
          currency: account.currency,
          bankName: account.bank_name,
          accountTitle: account.account_title,
          accountNumber: account.account_number,
          instructions: account.instructions,
        }
      : null;
  const current: ManualPaymentView | null =
    payment && ["pending_verification", "rejected"].includes(payment.status)
      ? {
          reference: payment.internal_ref,
          status: payment.status,
          amount: Number(payment.amount),
          currency: payment.currency,
          submittedAt: payment.submitted_at,
          rejectionReason: payment.rejection_reason,
        }
      : null;
  return { bank, payment: current };
};

const checkedReceipt = async (value: FormDataEntryValue | null) => {
  try {
    return await validateUpload("receipts", value);
  } catch (error) {
    if (error instanceof JoinInputError)
      throw new PaymentInputError(error.message);
    throw error;
  }
};

const cancelUnsent = async (paymentId: string, orderId: string | null) => {
  await prisma.payments.update({
    where: { id: paymentId },
    data: { status: "cancelled" },
  });
  if (orderId)
    await prisma.uniform_orders.update({
      where: { id: orderId },
      data: { status: "cancelled" },
    });
};

/**
 * Creates (or, after a rejection, reuses) the uniform order and records the uploaded receipt as
 * "pending_verification". The amount always comes from the server-side price; nothing here marks anything paid.
 */
export const submitManualPayment = async (
  input: UniformInput,
  user: User,
  receipt: FormDataEntryValue | null,
) => {
  const file = await checkedReceipt(receipt);

  const existing = await prisma.payments.findFirst({
    where: {
      user_id: user.id,
      purpose: "uniform",
      gateway: MANUAL_GATEWAY,
      status: { in: ["pending_verification", "rejected"] },
      uniform_orders: { status: { not: "cancelled" } },
    },
    orderBy: { created_at: "desc" },
  });
  if (existing?.status === "pending_verification") {
    throw new PaymentInputError(
      "Your payment proof is already waiting for verification.",
    );
  }

  let paymentId: string;
  let orderId: string | null;
  let isNew = false;
  if (existing) {
    paymentId = existing.id;
    orderId = existing.uniform_order_id;
  } else {
    const prepared = await prepareUniformPayment(input, user, MANUAL_GATEWAY);
    paymentId = prepared.payment.id;
    orderId = prepared.order.id;
    isNew = true;
    const account = await prisma.bank_accounts.findUnique({
      where: { currency: prepared.currency },
    });
    if (!account?.active) {
      await cancelUnsent(paymentId, orderId);
      throw new PaymentInputError(
        "Bank transfer is not available yet. Please pay by card or contact us.",
      );
    }
  }

  let path: string;
  try {
    path = await uploadPrivateFile("receipts", user.id, file);
  } catch (error) {
    if (isNew) await cancelUnsent(paymentId, orderId);
    throw error;
  }

  let updated;
  try {
    // The status guard makes a double click or a second tab harmless: only one request can move it forward.
    updated = await prisma.payments.updateMany({
      where: {
        id: paymentId,
        status: { in: ["created", "pending", "rejected"] },
      },
      data: {
        status: "pending_verification",
        receipt_path: path,
        submitted_at: new Date(),
        reviewed_by: null,
        reviewed_at: null,
        rejection_reason: null,
      },
    });
  } catch (error) {
    if ((error as { code?: string }).code === "P2002") {
      throw new PaymentInputError(
        "Your payment proof is already waiting for verification.",
      );
    }
    throw error;
  }
  if (updated.count !== 1) {
    throw new PaymentInputError(
      "Your payment proof is already waiting for verification.",
    );
  }

  await prisma.payment_events.create({
    data: {
      payment_id: paymentId,
      event: isNew ? "submitted" : "resubmitted",
      actor_id: user.id,
    },
  });
  return { ok: true, paymentId };
};
