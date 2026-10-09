import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Admin only: end every session of one user ("admin session control").
 * Deleting auth.sessions also removes the refresh tokens, so the user cannot get a new access token.
 * A token they already hold can still work until it expires (at most one hour).
 */
export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/admin/sessions/[userId]">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { userId } = await ctx.params;
  if (!UUID.test(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const { count } = await prisma.sessions.deleteMany({
    where: { user_id: userId },
  });

  await prisma.audit_log.create({
    data: {
      actor_id: admin.id,
      action: "session.revoke",
      target: userId,
      details: { sessions_removed: count },
    },
  });

  return NextResponse.json({ ok: true, removed: count });
}
