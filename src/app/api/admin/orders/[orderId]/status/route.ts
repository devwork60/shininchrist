import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { setOrderStatus } from "@/lib/members-admin";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Admin only: move a paid uniform order to preparing, shipped or delivered. Body: { status }. */
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/orders/[orderId]/status">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { orderId } = await ctx.params;
  if (!UUID.test(orderId))
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });

  const { status } = await request.json();
  if (typeof status !== "string")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  try {
    await setOrderStatus(admin.id, orderId, status);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
