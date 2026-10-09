import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

/** Who is signed in? Used by the header to show My Account instead of Login. */
export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json(
    user
      ? { user: { name: user.name, email: user.email }, isAdmin: user.isAdmin }
      : { user: null, isAdmin: false },
    { headers: { "Cache-Control": "no-store" } },
  );
}
