/**
 * Where Google sign-in sends people back to, and where they land afterwards.
 * Server-only helpers used by /api/auth/signin and /api/auth/callback.
 */

/** Short-lived cookie that remembers the page to open after sign-in (keeps ?next= out of the redirect address). */
export const NEXT_COOKIE = "sc_auth_next";

const DEFAULT_NEXT = "/account";

const originOf = (value: string | undefined) => {
  if (!value) return null;
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.origin
      : null;
  } catch {
    return null;
  }
};

/**
 * The public address of THIS site, with no trailing slash. Order:
 *  1. NEXT_PUBLIC_SITE_URL (or SITE_URL): set this to https://shininchrist.vercel.app in Vercel Production.
 *  2. On Vercel production: Vercel's own production domain, so a missing variable can never produce localhost.
 *  3. Otherwise the address the browser used (local development: http://localhost:3000, 3001, ...).
 * Request headers such as x-forwarded-host are deliberately NOT trusted, so a forged header cannot redirect users.
 */
export const getSiteUrl = (requestOrigin: string) =>
  originOf(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL) ??
  (process.env.VERCEL_ENV === "production"
    ? originOf(process.env.VERCEL_PROJECT_PRODUCTION_URL)
    : null) ??
  requestOrigin;

/** Only allows a path on this site. Blocks "https://evil.com", "//evil.com" and "/\\evil.com" (open redirects). */
export const safeNextPath = (
  value: string | null | undefined,
  fallback = DEFAULT_NEXT,
) => {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\u0000-\u001f]/.test(value)
  ) {
    return fallback;
  }
  try {
    return new URL(value, "http://placeholder.invalid").origin ===
      "http://placeholder.invalid"
      ? value
      : fallback;
  } catch {
    return fallback;
  }
};
