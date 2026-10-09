import { NextResponse, type NextRequest } from "next/server";
import { paymentErrorResponse } from "@/lib/payments/http";
import { confirmPayment } from "@/lib/payments/service";

/** The result page calls this after Paystack sends the visitor back. It asks Paystack, not the browser. */
export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference || !/^PAY-[a-f0-9]{32}$/.test(reference)) {
    return NextResponse.json(
      { error: "Missing or invalid reference" },
      { status: 400 },
    );
  }
  try {
    return NextResponse.json(await confirmPayment(reference, "redirect"));
  } catch (error) {
    return paymentErrorResponse(error);
  }
}
