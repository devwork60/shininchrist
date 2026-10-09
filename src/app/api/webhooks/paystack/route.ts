import { NextResponse, type NextRequest } from "next/server";
import { isValidWebhookSignature } from "@/lib/payments/paystack";
import { confirmPayment } from "@/lib/payments/service";

/**
 * Paystack calls this when a payment succeeds, even if the visitor closed the browser.
 * 1) Check the signature on the RAW body. 2) Re-verify with Paystack. 3) Update our records (idempotent).
 * Set the URL in Paystack Dashboard > Settings > API Keys & Webhooks > Test/Live Webhook URL.
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  let valid = false;
  try {
    valid = isValidWebhookSignature(
      rawBody,
      request.headers.get("x-paystack-signature"),
    );
  } catch {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  if (!valid)
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

  let event: { event?: string; data?: { reference?: string } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }

  const reference = event.data?.reference;
  if (
    event.event === "charge.success" &&
    reference &&
    reference.startsWith("PAY-")
  ) {
    try {
      await confirmPayment(reference, "webhook");
    } catch (error) {
      // A non-2xx makes Paystack retry later, which is what we want for a temporary failure.
      console.error("[webhook] confirm failed:", error);
      return NextResponse.json({ error: "Temporary failure" }, { status: 500 });
    }
  }

  // Always answer 200 for events we do not act on, so Paystack stops retrying them.
  return NextResponse.json({ received: true });
}
