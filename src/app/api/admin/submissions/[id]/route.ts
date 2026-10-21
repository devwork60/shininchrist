import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { updateSubmissionStatus } from "@/lib/forms";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/submissions/[id]">,
) {
  const admin = await getAdminUser().catch(() => null);
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!UUID.test(id)) {
    return NextResponse.json({ error: "Invalid submission id" }, { status: 400 });
  }

  try {
    const { status, adminNotes } = await request.json();
    const updated = await updateSubmissionStatus(id, status, adminNotes);
    return NextResponse.json({ ok: true, submission: updated });
  } catch (error) {
    console.error("[admin_submissions_patch] error:", error);
    return NextResponse.json(
      { error: "Failed to update submission status." },
      { status: 500 },
    );
  }
}
