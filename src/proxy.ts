import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/** Pages that need a signed-in user. Admin and member rules are enforced again inside the pages and API routes. */
const SIGNED_IN_ONLY = ["/account", "/admin"];

export const proxy = async (request: NextRequest) => {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const needsLogin = SIGNED_IN_ONLY.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (needsLogin && !user) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return response;
};

export const config = {
  // Skip static files and images; everything else keeps the session fresh.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|videos/|forms/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|pdf)$).*)",
  ],
};
