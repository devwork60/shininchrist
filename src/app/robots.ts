import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-origin";

/** Public pages are open to search engines; members-only, account, admin and API areas are not. */
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: [
      "/admin",
      "/account",
      "/api/",
      "/login",
      "/payment/",
      "/daily/this-week",
      "/daily/archive",
    ],
  },
  sitemap: `${siteUrl()}/sitemap.xml`,
});

export default robots;
