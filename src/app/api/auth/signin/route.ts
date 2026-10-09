import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Starts Google OAuth sign-in purely on the server. No client-side Supabase credentials needed. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const next = searchParams.get("next") ?? "/account";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const redirectBase =
    !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${redirectBase}/api/auth/callback?next=${encodeURIComponent(safeNext)}`,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(`${redirectBase}/login?error=signin_failed`);
  }

  return NextResponse.redirect(data.url);
}
