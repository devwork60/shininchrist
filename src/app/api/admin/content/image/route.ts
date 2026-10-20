import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { joinErrorResponse } from "@/lib/join-http";
import { createClient } from "@/lib/supabase/server";
import { uploadPrivateFile } from "@/lib/uploads";

/** Admin only: upload a photo for an editable page. Returns its public address, to be saved with the content. */
export async function POST(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const form = await request.formData();
    // Type, size and the file's real contents are checked inside; storage rules allow only admins to write here.
    const path = await uploadPrivateFile("site-media", admin.id, form.get("file"));
    const supabase = await createClient();
    const { data } = supabase.storage.from("site-media").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
