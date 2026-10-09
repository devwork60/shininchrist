import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { paymentErrorResponse } from "@/lib/payments/http";
import { startUniformPayment } from "@/lib/payments/service";

/** Uniform + delivery payment. Signed-in users only; the price comes from the database, never the browser. */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json(
        { error: "Please sign in first." },
        { status: 401 },
      );

    const body = await request.json();
    const { authorizationUrl, accessCode, reference } =
      await startUniformPayment(
        body,
        { id: user.id, email: user.email, name: user.name },
        request.nextUrl.origin,
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
