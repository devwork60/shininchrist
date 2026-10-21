import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { updateMemberChapter } from "@/lib/members-admin";
import { joinErrorResponse } from "@/lib/join-http";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ALLOWED_CHAPTERS = ["men", "women", "youth"] as const;

export async function POST(
  request: NextRequest,
  ctx: { params: Promise<{ userId: string }> },
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { userId } = await ctx.params;
  if (!UUID.test(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  try {
    const { chapter } = await request.json();
    if (!ALLOWED_CHAPTERS.includes(chapter)) {
      return NextResponse.json(
        { error: "Invalid chapter. Choose Men, Women, or Youth." },
        { status: 400 },
      );
    }

    const updated = await updateMemberChapter(admin.id, userId, chapter);
    return NextResponse.json({ ok: true, chapter: updated.chapter });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
