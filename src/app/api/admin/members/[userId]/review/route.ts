import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { reviewItem } from "@/lib/members-admin";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Admin only: verify or reject a member's proof or parental consent. Body: { item, decision }. */
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/members/[userId]/review">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { userId } = await ctx.params;
  if (!UUID.test(userId))
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

  const { item, decision } = await request.json();
  if (
    (item !== "proof" && item !== "consent") ||
    (decision !== "verify" && decision !== "reject")
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await reviewItem(admin.id, userId, item, decision);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
