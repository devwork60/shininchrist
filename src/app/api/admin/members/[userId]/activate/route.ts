import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { activateMember } from "@/lib/members-admin";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Admin only: activate a member once every requirement is confirmed. Returns the new Member ID. */
export async function POST(
  _request: NextRequest,
  ctx: RouteContext<"/api/admin/members/[userId]/activate">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { userId } = await ctx.params;
  if (!UUID.test(userId))
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

  try {
    const memberId = await activateMember(admin.id, userId);
    return NextResponse.json({ ok: true, memberId });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
