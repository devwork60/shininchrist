import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { setMemberRole } from "@/lib/members-access";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Admin only: switch the Learner, Teacher or Admin role on or off. Body: { role, grant: boolean }. */
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/members/[userId]/roles">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { userId } = await ctx.params;
  if (!UUID.test(userId))
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

  try {
    const { role, grant } = await request.json();
    await setMemberRole(
      { id: admin.id, isSuperAdmin: admin.roles.includes("super_admin") },
      userId,
      role,
      grant,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
