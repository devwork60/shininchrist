import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { deleteResource } from "@/lib/library-admin";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Admin only: delete a Library resource and its file. */
export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/admin/library/[id]">,
) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await ctx.params;
  if (!UUID.test(id))
    return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
  try {
    await deleteResource(admin.id, id);
    revalidatePath("/library");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
