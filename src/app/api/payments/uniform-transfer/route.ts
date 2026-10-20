import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { paymentErrorResponse } from "@/lib/payments/http";
import { startUniformTransfer } from "@/lib/payments/transfer";

/** Uniform + delivery payment by bank transfer. Signed-in users only; the price comes from the database. */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json(
        { error: "Please sign in first." },
        { status: 401 },
      );
    const body = await request.json();
    return NextResponse.json(
      await startUniformTransfer(body, {
        id: user.id,
        email: user.email,
        name: user.name,
      }),
    );
  } catch (error) {
    return paymentErrorResponse(error);
  }
}
