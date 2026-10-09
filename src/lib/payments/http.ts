import { NextResponse } from "next/server";
import { GatewayError, PaymentConfigError } from "@/lib/payments/paystack";
import { PaymentInputError } from "@/lib/payments/service";

/** Turns payment errors into safe JSON for the browser (no internals, no keys). */
export const paymentErrorResponse = (error: unknown) => {
  if (error instanceof PaymentInputError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  if (error instanceof PaymentConfigError) {
    console.error("[payments] not configured:", error.message);
    return NextResponse.json(
      { error: "Online payment is not available yet. Please try again later." },
      { status: 503 },
    );
  }
  if (error instanceof GatewayError) {
    console.error("[payments] gateway error:", error.message);
    if (/currency not supported/i.test(error.message)) {
      return NextResponse.json(
        {
          error:
            "Payments in this currency are not switched on yet. Please contact us and we will help you pay.",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      {
        error:
          "The payment provider could not start this payment. Please try again.",
      },
      { status: 502 },
    );
  }
  console.error("[payments] unexpected error:", error);
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 },
  );
};
