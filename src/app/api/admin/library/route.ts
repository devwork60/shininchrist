import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { saveResource } from "@/lib/library-admin";

/** Admin only: create or update a Library resource (send `id` to update). */
export async function POST(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const result = await saveResource(admin.id, await request.json());
    revalidatePath("/library");
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
