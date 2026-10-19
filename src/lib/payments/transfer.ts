import { prisma } from "@/lib/prisma";
import { createBankTransfer } from "./paystack";
import { prepareUniformPayment, type UniformInput } from "./service";

const TRANSFER_WINDOW_MS = 30 * 60 * 1000;

/** Uniform payment by bank transfer: same order and server-side price as card payment, shown on our own page. */
export const startUniformTransfer = async (
  input: UniformInput,
  user: { id: string; email: string; name: string },
) => {
  const { payment, order, total, currency } = await prepareUniformPayment(
    input,
    user,
  );
  try {
    const transfer = await createBankTransfer({
      reference: payment.internal_ref,
      email: user.email,
      amount: total,
      currency,
      expiresAt: new Date(Date.now() + TRANSFER_WINDOW_MS),
      metadata: { purpose: "uniform", order: order.reference },
    });
    await prisma.payments.update({
      where: { id: payment.id },
      data: { gateway_ref: payment.internal_ref, status: "pending" },
    });
    return {
      reference: payment.internal_ref,
      amount: total,
      currency,
      ...transfer,
    };
  } catch (error) {
    await prisma.payments.update({
      where: { id: payment.id },
      data: { status: "failed" },
    });
    throw error;
  }
};
