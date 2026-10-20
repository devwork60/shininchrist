import { after, NextResponse, type NextRequest } from "next/server";
import { notifyProfileComplete } from "@/lib/email/notify";
import { saveProfile } from "@/lib/join";
import { joinErrorResponse, requireUser } from "@/lib/join-http";

/** Step "About You": saves the registration form. Age, minor flag and chapter are worked out here. */
export async function POST(request: NextRequest) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  try {
    const { isMinor } = await saveProfile(auth.user.id, await request.json());
    after(() => notifyProfileComplete(auth.user.id));
    return NextResponse.json({ ok: true, isMinor });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
