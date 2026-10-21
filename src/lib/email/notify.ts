import { prisma } from "@/lib/prisma";
import { alertAdmins, deliver, person } from "./deliver";
import { dateTime, money } from "./layout";
import * as t from "./templates";

/** One function per platform event. Call these from the places where the event happens. They never throw. */

// ------------------------------------------------------------------ events

export const notifyAccountCreated = async (
  userId: string,
  email: string,
  name: string,
) => {
  await deliver(`welcome:${userId}`, "welcome", email, t.welcome(name));
  await alertAdmins(
    `signup:${userId}`,
    "New account created",
    "Someone signed in for the first time.",
    [
      { label: "Name", value: name || "—" },
      { label: "Email", value: email },
    ],
    "/admin/members",
    "Open members",
  );
};

export const notifyProfileComplete = async (userId: string) => {
  const { name, email } = await person(userId);
  await deliver(
    `profile_complete:${userId}`,
    "profile_complete",
    email,
    t.profileComplete(name),
  );
  await alertAdmins(
    `profile_complete:${userId}`,
    "Registration form completed",
    "An applicant finished the About You step.",
    [
      { label: "Name", value: name || "—" },
      { label: "Email", value: email },
    ],
    `/admin/members/${userId}`,
    "Open applicant",
  );
};

export const notifyItemSubmitted = async (
  userId: string,
  item: "proof" | "consent",
) => {
  const { name, email } = await person(userId);
  await alertAdmins(
    `${item}_submitted:${userId}:${Math.floor(Date.now() / 60000)}`,
    item === "proof" ? "Subscription proof to check" : "Parental consent to check",
    `${name || email} uploaded a file that needs your review.`,
    [
      { label: "Applicant", value: name || "—" },
      { label: "Email", value: email },
    ],
    `/admin/members/${userId}`,
    "Review now",
  );
};

export const notifyItemResult = async (
  userId: string,
  item: "proof" | "consent",
  verified: boolean,
) => {
  const { name, email } = await person(userId);
  const result = verified ? "verified" : "rejected";
  await deliver(
    `${item}_${result}:${userId}${verified ? "" : `:${Math.floor(Date.now() / 60000)}`}`,
    `${item}_${result}`,
    email,
    t.itemResult(name, item, verified),
  );
};

const paymentContext = async (paymentId: string) => {
  const payment = await prisma.payments.findUnique({
    where: { id: paymentId },
    include: { uniform_orders: true },
  });
  if (!payment) return null;
  const owner = payment.user_id ? await person(payment.user_id) : null;
  const libraryId = payment.designation?.startsWith("library:")
    ? payment.designation.slice("library:".length)
    : null;
  const resource = libraryId
    ? await prisma.library_resources.findUnique({ where: { id: libraryId } })
    : null;
  const name = owner?.name || payment.payer_name || "";
  const email = owner?.email || payment.payer_email || "";
  const facts: t.PaymentFacts = {
    reference: payment.internal_ref,
    amount: Number(payment.amount),
    currency: payment.currency.trim(),
    method: payment.gateway === "bank_transfer" ? "bank_transfer" : "card",
    at: payment.verified_at ?? payment.submitted_at ?? payment.created_at,
    item:
      payment.purpose === "uniform" && payment.uniform_orders
        ? `ShininChrist uniform, size ${payment.uniform_orders.size} × ${payment.uniform_orders.quantity}`
        : payment.purpose === "store_order"
          ? payment.designation ?? "Store Order"
          : resource
            ? `Library contribution: ${resource.title}`
            : payment.purpose === "donation"
              ? `Donation${payment.designation ? `: ${payment.designation}` : ""}`
              : undefined,
  };
  return { payment, name, email, facts };
};

/** A payment was verified (by Paystack, or approved by an admin): send the receipt once. */
export const notifyPaymentConfirmed = async (
  paymentId: string,
  by: "paystack" | "admin",
) => {
  const ctx = await paymentContext(paymentId);
  if (!ctx) return;
  const { payment, name, email, facts } = ctx;
  await deliver(
    `receipt:${paymentId}`,
    payment.purpose === "donation" ? "donation_receipt" : "receipt",
    email,
    payment.purpose === "donation"
      ? t.donationReceipt(name, facts)
      : t.receipt(name, facts),
  );
  if (by === "paystack") {
    await alertAdmins(
      `paid:${paymentId}`,
      payment.purpose === "donation"
        ? "Donation received"
        : payment.purpose === "uniform"
          ? "Uniform payment received"
          : payment.purpose === "store_order"
            ? "Store order payment received"
            : "Library contribution received",
      `${name || email || "Someone"} paid ${money(facts.amount, facts.currency)} by card.`,
      [
        { label: "Reference", value: facts.reference },
        { label: "Date", value: dateTime(facts.at) },
      ],
      payment.purpose === "uniform"
        ? `/admin/members/${payment.user_id}`
        : "/admin/payments",
      "Open",
    );
  }
};

export const notifyTransferSubmitted = async (paymentId: string) => {
  const ctx = await paymentContext(paymentId);
  if (!ctx) return;
  const { payment, name, email, facts } = ctx;
  const stamp = payment.submitted_at?.getTime() ?? 0;
  await deliver(
    `transfer_submitted:${paymentId}:${stamp}`,
    "transfer_submitted",
    email,
    t.transferSubmitted(name, facts),
  );
  await alertAdmins(
    `receipt_submitted:${paymentId}:${stamp}`,
    "Bank transfer receipt to verify",
    `${name || email} uploaded a payment receipt for ${money(facts.amount, facts.currency)}.`,
    [
      { label: "Customer", value: name || "—" },
      { label: "Reference", value: facts.reference },
    ],
    "/admin/payments",
    "Review receipt",
  );
};

export const notifyTransferRejected = async (paymentId: string) => {
  const ctx = await paymentContext(paymentId);
  if (!ctx) return;
  const { payment, name, email } = ctx;
  await deliver(
    `transfer_rejected:${paymentId}:${payment.reviewed_at?.getTime() ?? 0}`,
    "transfer_rejected",
    email,
    t.transferRejected(name, payment.rejection_reason ?? "Not specified"),
  );
};

export const notifyMembershipApproved = async (
  userId: string,
  memberId: string,
) => {
  const { name, email } = await person(userId);
  await deliver(
    `membership_approved:${userId}`,
    "membership_approved",
    email,
    t.membershipApproved(name, memberId),
  );
};

export const notifyOrderUpdate = async (
  userId: string,
  orderRef: string,
  status: string,
) => {
  const { name, email } = await person(userId);
  await deliver(
    `order:${orderRef}:${status}`,
    "order_update",
    email,
    t.orderUpdate(name, orderRef, status),
  );
};

export const notifySuspension = async (
  userId: string,
  kind: "suspended" | "reinstated",
  reason = "",
) => {
  const { name, email } = await person(userId);
  await deliver(
    `membership_${kind}:${userId}:${Math.floor(Date.now() / 60000)}`,
    `membership_${kind}`,
    email,
    kind === "suspended"
      ? t.membershipSuspended(name, reason)
      : t.membershipReinstated(name),
  );
};

export const notifyFormSubmission = async (
  typeLabel: string,
  reference: string,
  name: string,
  email: string,
  summaryRows: { label: string; value: string }[],
) => {
  await alertAdmins(
    `form_sub:${reference}`,
    `New submission: ${typeLabel}`,
    `A new ${typeLabel} was received from ${name || email}.`,
    [
      { label: "Reference", value: reference },
      { label: "Name", value: name || "—" },
      { label: "Email", value: email || "—" },
      ...summaryRows,
    ],
    "/admin/submissions",
    "Open Submissions",
  );
};

