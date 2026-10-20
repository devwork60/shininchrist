import { after, NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import {
  notifyPaymentConfirmed,
  notifyTransferRejected,
} from "@/lib/email/notify";
import { paymentErrorResponse } from "@/lib/payments/http";
import {
  approveManualPayment,
  rejectManualPayment,
} from "@/lib/payments/manual-review";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Admin only: approve or reject a manual payment. Body: { decision: "approve" | "reject", reason? }. */
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/payments/[paymentId]/review">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { paymentId } = await ctx.params;
  if (!UUID.test(paymentId))
    return NextResponse.json({ error: "Invalid payment id" }, { status: 400 });

  try {
    const { decision, reason } = await request.json();
    if (decision === "approve") {
      const result = await approveManualPayment(admin.id, paymentId);
      // The receipt is deduplicated, so approving twice still sends one email.
      after(() => notifyPaymentConfirmed(paymentId, "admin"));
      return NextResponse.json(result);
    }
    if (decision === "reject") {
      const result = await rejectManualPayment(admin.id, paymentId, reason);
      after(() => notifyTransferRejected(paymentId));
      return NextResponse.json(result);
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    return paymentErrorResponse(error);
  }
}
