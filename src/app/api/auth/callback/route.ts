import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Google sends the user back here with a one-time code. We swap it for a session cookie, then redirect. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  // Only allow redirects to our own paths (stops "?next=https://evil.com").
  const next = searchParams.get("next") ?? "/account";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  // When deployed behind Vercel's edge/proxy, prefer x-forwarded-host so we never redirect to internal host
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const redirectBase =
    !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${redirectBase}${safeNext}`);
  }

  return NextResponse.redirect(`${redirectBase}/login?error=signin_failed`);
}
