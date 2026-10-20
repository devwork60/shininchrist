import { after, NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { notifySuspension } from "@/lib/email/notify";
import { joinErrorResponse } from "@/lib/join-http";
import { reinstateMember, suspendMember } from "@/lib/members-access";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Admin only: suspend an active member (reason required) or reinstate a suspended one. Body: { action, reason? }. */
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/members/[userId]/suspension">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { userId } = await ctx.params;
  if (!UUID.test(userId))
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

  try {
    const { action, reason } = await request.json();
    const actor = {
      id: admin.id,
      isSuperAdmin: admin.roles.includes("super_admin"),
    };
    if (action === "suspend") {
      await suspendMember(actor, userId, reason);
      after(() => notifySuspension(userId, "suspended", String(reason).trim()));
    } else if (action === "reinstate") {
      await reinstateMember(actor, userId);
      after(() => notifySuspension(userId, "reinstated"));
    } else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
