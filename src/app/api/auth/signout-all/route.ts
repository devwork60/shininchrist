import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

/** "Log out of all devices": ends every session of the signed-in user, including this one. */
export async function POST() {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const supabase = await createClient();
  // scope "global" revokes every refresh token for this user.
  await supabase.auth.signOut({ scope: "global" });

  await prisma.audit_log.create({
    data: { actor_id: user.id, action: "session.logout_all", target: user.id },
  });

  return NextResponse.json({ ok: true });
}
