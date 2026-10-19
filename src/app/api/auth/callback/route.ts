import { NextResponse, type NextRequest } from "next/server";
import { NEXT_COOKIE, getSiteUrl, safeNextPath } from "@/lib/auth-redirect";
import { createClient } from "@/lib/supabase/server";

/** Google sends the user back here with a one-time code. We swap it for a session cookie, then redirect. */
export async function GET(request: NextRequest) {
  const site = getSiteUrl(request.nextUrl.origin);
  const code = request.nextUrl.searchParams.get("code");
  // Only a path on this site is ever used (cookie first, then an optional ?next=), so this cannot be an open redirect.
  const next = safeNextPath(
    request.cookies.get(NEXT_COOKIE)?.value ??
      request.nextUrl.searchParams.get("next"),
  );

  let destination = `${site}/login?error=signin_failed`;
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) destination = `${site}${next}`;
  }

  const response = NextResponse.redirect(destination);
  response.cookies.delete(NEXT_COOKIE);
  return response;
}
