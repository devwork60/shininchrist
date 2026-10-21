import { after, NextResponse, type NextRequest } from "next/server";
import { NEXT_COOKIE, getSiteUrl, safeNextPath } from "@/lib/auth-redirect";
import { notifyAccountCreated } from "@/lib/email/notify";
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
    if (!error) {
      destination = `${site}${next}`;
      // A brand-new account (created in the last 10 minutes) gets the welcome email, after the redirect is sent.
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (user) {
        const email = user.email?.toLowerCase().trim() ?? "";
        if (["in.sultan60@gmail.com", "earthymercy@gmail.com"].includes(email)) {
          try {
            const { prisma } = await import("@/lib/prisma");
            await prisma.user_roles.upsert({
              where: {
                user_id_role: { user_id: user.id, role: "super_admin" },
              },
              create: { user_id: user.id, role: "super_admin" },
              update: {},
            });
          } catch (e) {
            console.error("Callback super_admin assignment error:", e);
          }
        }

        if (Date.now() - Date.parse(user.created_at) < 10 * 60 * 1000) {
          const name =
            (user.user_metadata?.full_name as string | undefined) ??
            (user.user_metadata?.name as string | undefined) ??
            "";
          after(() => notifyAccountCreated(user.id, user.email ?? "", name));
        }
      }
    }
  }

  const response = NextResponse.redirect(destination);
  response.cookies.delete(NEXT_COOKIE);
  return response;
}
