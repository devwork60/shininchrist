import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { requestDownload } from "@/lib/library";
import { paymentErrorResponse } from "@/lib/payments/http";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Asks for a download. Body: { amount? } for "give what you can" resources (0 or empty is allowed).
 * Answers { kind: "download", url } (a link valid for 60 seconds) or { kind: "checkout", url } to pay first.
 */
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/library/[id]/download">,
) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const { id } = await ctx.params;
  if (!UUID.test(id))
    return NextResponse.json({ error: "Invalid resource" }, { status: 400 });

  try {
    const body = await request.json().catch(() => ({}));
    const result = await requestDownload(
      { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
      id,
      body?.amount,
      request.nextUrl.origin,
    );
    return NextResponse.json(result);
  } catch (error) {
    return paymentErrorResponse(error);
  }
}
