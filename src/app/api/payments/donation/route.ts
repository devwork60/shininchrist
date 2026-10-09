import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { paymentErrorResponse } from "@/lib/payments/http";
import { startDonation } from "@/lib/payments/service";

/** One-time gift. Open to everyone (a signed-in user is linked to the payment when there is one). */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await getCurrentUser();
    const { authorizationUrl, accessCode, reference } = await startDonation(
      body,
      request.nextUrl.origin,
      user?.id,
    );
    return NextResponse.json({
      url: authorizationUrl,
      accessCode,
      reference,
    });
  } catch (error) {
    return paymentErrorResponse(error);
  }
}
