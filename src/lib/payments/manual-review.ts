import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { MANUAL_GATEWAY } from "./manual";
import { PaymentInputError, markUniformPaid } from "./service";

/** Admin-only review of manual bank-transfer payments. Callers MUST check getAdminUser() first. */

export interface ReviewEvent {
  event: string;
  note: string | null;
  at: Date;
  by: string | null;
}

export interface ManualPaymentRow {
  id: string;
  reference: string;
  status: string;
  customer: string;
  email: string;
  orderRef: string | null;
  item: string;
  amount: number;
  currency: string;
  submittedAt: Date | null;
  reviewedAt: Date | null;
  rejectionReason: string | null;
  /** Short-lived link (10 minutes) created with the admin's own session; null when there is no receipt. */
  receiptUrl: string | null;
  events: ReviewEvent[];
}

const MAX_REASON = 500;

export const listManualPayments = async (): Promise<ManualPaymentRow[]> => {
  const [waiting, decided] = await Promise.all([
    prisma.payments.findMany({
      where: { gateway: MANUAL_GATEWAY, status: "pending_verification" },
      orderBy: { submitted_at: "asc" },
    }),
    prisma.payments.findMany({
      where: {
        gateway: MANUAL_GATEWAY,
        status: { in: ["confirmed", "rejected"] },
      },
      orderBy: { reviewed_at: "desc" },
      take: 30,
    }),
  ]);
  const payments = [...waiting, ...decided];
  if (payments.length === 0) return [];

  const orderIds = payments.flatMap((p) =>
    p.uniform_order_id ? [p.uniform_order_id] : [],
  );
  const [orders, events] = await Promise.all([
    prisma.uniform_orders.findMany({ where: { id: { in: orderIds } } }),
    prisma.payment_events.findMany({
      where: { payment_id: { in: payments.map((p) => p.id) } },
      orderBy: { created_at: "asc" },
    }),
  ]);
  const actorIds = [
    ...new Set(events.flatMap((e) => (e.actor_id ? [e.actor_id] : []))),
  ];
  const actors = await prisma.profiles.findMany({
    where: { id: { in: actorIds } },
    select: { id: true, full_name: true, email: true },
  });
  const supabase = await createClient();

  return Promise.all(
    payments.map(async (p) => {
      const order = orders.find((o) => o.id === p.uniform_order_id);
      const signed = p.receipt_path
        ? await supabase.storage
            .from("receipts")
            .createSignedUrl(p.receipt_path, 600)
        : null;
      return {
        id: p.id,
        reference: p.internal_ref,
        status: p.status,
        customer: p.payer_name ?? "",
        email: p.payer_email ?? "",
        orderRef: order?.reference ?? null,
        item: order
          ? `${order.uniform_type}, size ${order.size} × ${order.quantity}`
          : "",
        amount: Number(p.amount),
        currency: p.currency,
        submittedAt: p.submitted_at,
        reviewedAt: p.reviewed_at,
        rejectionReason: p.rejection_reason,
        receiptUrl: signed?.data?.signedUrl ?? null,
        events: events
          .filter((e) => e.payment_id === p.id)
          .map((e) => {
            const actor = actors.find((a) => a.id === e.actor_id);
            return {
              event: e.event,
              note: e.note,
              at: e.created_at,
              by: actor?.full_name || actor?.email || null,
            };
          }),
      };
    }),
  );
};

/** Approves a receipt: the payment becomes paid and the order moves on. Safe to call twice. */
export const approveManualPayment = async (
  adminId: string,
  paymentId: string,
) => {
  const payment = await prisma.payments.findFirst({
    where: { id: paymentId, gateway: MANUAL_GATEWAY },
  });
  if (!payment) throw new PaymentInputError("Payment not found.");
  if (payment.status === "confirmed") return { ok: true, already: true };

  // Only the first approval flips the status, so the order is marked paid exactly once.
  const flipped = await prisma.payments.updateMany({
    where: { id: payment.id, status: "pending_verification" },
    data: {
      status: "confirmed",
      verified_at: new Date(),
      reviewed_by: adminId,
      reviewed_at: new Date(),
      rejection_reason: null,
    },
  });
  if (flipped.count !== 1) {
    throw new PaymentInputError("This payment is not waiting for verification.");
  }
  if (payment.uniform_order_id && payment.user_id) {
    await markUniformPaid(payment.user_id, payment.uniform_order_id);
  }
  await prisma.payment_events.create({
    data: { payment_id: payment.id, event: "approved", actor_id: adminId },
  });
  await prisma.audit_log.create({
    data: {
      actor_id: adminId,
      action: "payment.approve",
      target: payment.id,
      details: { method: MANUAL_GATEWAY },
    },
  });
  return { ok: true, already: false };
};

/** Rejects a receipt with a required reason. The person can then upload a new receipt. */
export const rejectManualPayment = async (
  adminId: string,
  paymentId: string,
  reason: unknown,
) => {
  const text = String(reason ?? "").trim();
  if (text.length < 3)
    throw new PaymentInputError("Please give a reason for the rejection.");
  if (text.length > MAX_REASON)
    throw new PaymentInputError(
      `The reason is too long (maximum ${MAX_REASON} characters).`,
    );

  const flipped = await prisma.payments.updateMany({
    where: {
      id: paymentId,
      gateway: MANUAL_GATEWAY,
      status: "pending_verification",
    },
    data: {
      status: "rejected",
      reviewed_by: adminId,
      reviewed_at: new Date(),
      rejection_reason: text,
    },
  });
  if (flipped.count !== 1) {
    throw new PaymentInputError("This payment is not waiting for verification.");
  }
  await prisma.payment_events.create({
    data: {
      payment_id: paymentId,
      event: "rejected",
      actor_id: adminId,
      note: text,
    },
  });
  await prisma.audit_log.create({
    data: {
      actor_id: adminId,
      action: "payment.reject",
      target: paymentId,
      details: { method: MANUAL_GATEWAY },
    },
  });
  return { ok: true };
};
