import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getJoinStatus } from "@/lib/join";
import { joinErrorResponse } from "@/lib/join-http";

/** Where is this applicant in the Join flow? Signed out visitors just get { signedIn: false }. */
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json(
        { signedIn: false },
        { headers: { "Cache-Control": "no-store" } },
      );
    return NextResponse.json(await getJoinStatus(user.id, user.email), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
