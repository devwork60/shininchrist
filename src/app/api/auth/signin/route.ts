import { NextResponse, type NextRequest } from "next/server";
import { NEXT_COOKIE, getSiteUrl, safeNextPath } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/server";

/** Starts Google OAuth sign-in purely on the server. No client-side Supabase credentials needed. */
export async function GET(request: NextRequest) {
  const site = getSiteUrl(request.nextUrl.origin);
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    // No ?query here: the address must match an entry in Supabase > Authentication > URL Configuration exactly.
    options: { redirectTo: `${site}/api/auth/callback` },
  });

  if (error || !data.url) {
    return NextResponse.redirect(`${site}/login?error=signin_failed`);
  }

  const response = NextResponse.redirect(data.url);
  // Remember where to go after sign-in. Read (and cleared) by /api/auth/callback.
  response.cookies.set(NEXT_COOKIE, next, {
    httpOnly: true,
    sameSite: "lax",
    secure: site.startsWith("https://"),
    path: "/",
    maxAge: 600,
  });
  return response;
}
