import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { listUserSessions } from "@/lib/sessions";

/** Admin only: every user with how many sessions they currently have. */
export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json({ users: await listUserSessions() });
}
