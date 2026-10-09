import type { JoinStatus } from "@/lib/join";
import { prisma } from "@/lib/prisma";

/** Shapes real database rows into what the My Account cards show. */

export type ItemState = "done" | "pending" | "todo";

export interface ChecklistItem {
  label: string;
  state: ItemState;
  note: string;
}

export const STATUS_LABELS: Record<string, string> = {
  started: "Registration started",
  form_completed: "Form completed",
  subscription_pending: "Subscription proof pending",
  subscription_verified: "Subscription verified",
  consent_pending: "Parental consent pending",
  consent_verified: "Parental consent verified",
  uniform_payment_pending: "Awaiting uniform payment",
  payment_confirmed: "Payment confirmed",
  approved: "Approved",
  active: "Active member",
  suspended: "Suspended",
};

const reviewItem = (
  label: string,
  status: string,
  what: string,
): ChecklistItem => {
  if (status === "verified")
    return { label, state: "done", note: "Verified by the ShininChrist team" };
  if (status === "pending")
    return { label, state: "pending", note: "Received, waiting for review" };
  if (status === "rejected")
    return { label, state: "todo", note: `Please upload your ${what} again` };
  return { label, state: "todo", note: "Not submitted yet" };
};

/** The real checklist behind "Membership status", worked out from what the server has recorded. */
export const buildChecklist = (status: JoinStatus): ChecklistItem[] => {
  const { membership, profile, order, uniformPaid } = status;
  const active = membership.status === "active";

  const items: ChecklistItem[] = [
    profile.fullName
      ? { label: "Registration form", state: "done", note: "Completed" }
      : {
          label: "Registration form",
          state: "todo",
          note: "Not completed yet",
        },
    reviewItem(
      "Social subscription proof",
      membership.proofStatus,
      "screenshot",
    ),
  ];
  if (membership.isMinor)
    items.push(
      reviewItem(
        "Parental consent (under 18)",
        membership.consentStatus,
        "consent form",
      ),
    );

  items.push(
    uniformPaid
      ? { label: "Uniform payment", state: "done", note: "Payment confirmed" }
      : order
        ? {
            label: "Uniform payment",
            state: "todo",
            note: "Ordered, payment not confirmed yet",
          }
        : { label: "Uniform payment", state: "todo", note: "Not ordered yet" },
    active
      ? {
          label: "Approval and activation",
          state: "done",
          note: "Your account is active",
        }
      : {
          label: "Approval and activation",
          state: "todo",
          note: "ShininChrist activates you after every item above is done",
        },
  );
  return items;
};

export interface OrderView {
  reference: string;
  item: string;
  status: string;
  total: number | null;
  currency: string;
  deliveryAddress: string;
  paymentRef: string | null;
  paidAt: Date | null;
}

/** The newest uniform order with its confirmed payment, or null when none exists. */
export const getOrderView = async (
  userId: string,
): Promise<OrderView | null> => {
  const order = await prisma.uniform_orders.findFirst({
    where: { user_id: userId, status: { not: "cancelled" } },
    orderBy: { created_at: "desc" },
    include: {
      payments: {
        where: { status: "confirmed" },
        orderBy: { verified_at: "desc" },
        take: 1,
      },
    },
  });
  if (!order) return null;
  const payment = order.payments[0];

  return {
    reference: order.reference,
    item: `${order.uniform_type}, size ${order.size} × ${order.quantity}`,
    status: order.status,
    total: order.total ? Number(order.total) : null,
    currency: order.currency,
    deliveryAddress: [
      order.delivery_address,
      order.delivery_city,
      order.delivery_state,
    ]
      .filter(Boolean)
      .join(", "),
    paymentRef: payment?.internal_ref ?? null,
    paidAt: payment?.verified_at ?? null,
  };
};

export const ORDER_STEPS = [
  "Requested",
  "Payment confirmed",
  "Preparing",
  "Shipped",
  "Delivered",
] as const;

/** How many of ORDER_STEPS are finished for an order status. */
export const orderStepsDone = (status: string) =>
  ({
    requested: 1,
    payment_pending: 1,
    paid: 2,
    preparing: 3,
    shipped: 4,
    delivered: 5,
    cancelled: 0,
  })[status] ?? 1;
