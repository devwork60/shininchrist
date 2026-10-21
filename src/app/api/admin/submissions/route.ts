import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { listSubmissions } from "@/lib/forms";

export async function GET(req: Request) {
  const admin = await getAdminUser().catch(() => null);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const rows = await listSubmissions({ type, status, search });
  return NextResponse.json({ rows });
}
