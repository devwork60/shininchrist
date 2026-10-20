const originOf = (value: string | undefined) => {
  if (!value) return null;
  try {
    return new URL(value.includes("://") ? value : `https://${value}`).origin;
  } catch {
    return null;
  }
};

/**
 * Public address of THIS site with no trailing slash: used for the sitemap, robots, canonical and social-share links.
 * NEXT_PUBLIC_SITE_URL, then Vercel's production domain, then localhost for development.
 */
export const siteUrl = () =>
  originOf(process.env.NEXT_PUBLIC_SITE_URL) ??
  originOf(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  "http://localhost:3000";
