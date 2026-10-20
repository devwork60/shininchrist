import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { CONTENT_TAG, saveSiteContent } from "@/lib/site-content";
import { CONTENT_KEYS } from "@/lib/site-content-schema";

/** Admin only: save one editable section (invite_mercy, footer or header). Everything is validated on the server. */
export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/content/[key]">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { key } = await ctx.params;
  if (!(CONTENT_KEYS as readonly string[]).includes(key))
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });

  try {
    await saveSiteContent(admin.id, key, await request.json());
    // Make the public pages pick up the change on the next visit.
    revalidateTag(CONTENT_TAG, { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
