import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { createUploadTarget } from "@/lib/library-admin";

/**
 * Admin only: checks a file's name, type and size, then returns a one-time upload ticket.
 * The browser sends the file straight to private storage, so big files never pass through our server.
 */
export async function POST(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    return NextResponse.json(await createUploadTarget(await request.json()));
  } catch (error) {
    return joinErrorResponse(error);
  }
}
