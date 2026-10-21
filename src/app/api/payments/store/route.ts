import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { paymentErrorResponse } from "@/lib/payments/http";
import { startStoreOrderPayment } from "@/lib/payments/service";

/** Store multi-item cart payment via Paystack. Open to both signed-in users and guests. */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();

    const { authorizationUrl, accessCode, reference } =
      await startStoreOrderPayment(body, request.nextUrl.origin, user?.id);

    return NextResponse.json({
      url: authorizationUrl,
      accessCode,
      reference,
    });
  } catch (error) {
    return paymentErrorResponse(error);
  }
}
