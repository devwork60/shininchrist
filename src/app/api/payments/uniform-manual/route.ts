import { after, NextResponse, type NextRequest } from "next/server";
import { notifyTransferSubmitted } from "@/lib/email/notify";
import { getCurrentUser } from "@/lib/auth";
import { paymentErrorResponse } from "@/lib/payments/http";
import {
  getManualPaymentInfo,
  submitManualPayment,
} from "@/lib/payments/manual";

/** Bank details for the signed-in person's currency, plus their current manual payment (if any). */
export async function GET() {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  try {
    return NextResponse.json(await getManualPaymentInfo(user.id));
  } catch (error) {
    return paymentErrorResponse(error);
  }
}

/**
 * Submit proof of a bank transfer (multipart: order fields + "receipt" file).
 * The amount is calculated on the server; this never marks anything paid. An admin approves it later.
 */
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  try {
    const form = await request.formData();
    const field = (name: string) => form.get(name) ?? undefined;
    const result = await submitManualPayment(
      {
        size: field("size"),
        quantity: field("quantity"),
        deliveryType: field("deliveryType"),
        address: field("address"),
        city: field("city"),
        state: field("state"),
        phone: field("phone"),
        country: undefined,
      },
      { id: user.id, email: user.email, name: user.name },
      form.get("receipt"),
    );
    after(() => notifyTransferSubmitted(result.paymentId));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return paymentErrorResponse(error);
  }
}
