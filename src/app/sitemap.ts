import type { MetadataRoute } from "next";
import { STORE_PRODUCTS } from "@/constant/storeData";
import { siteUrl } from "@/lib/site-origin";

/**
 * Every public page. Left out on purpose: admin, account, login, payment result, the members-only Daily pages,
 * and two links that only redirect (/about, /give/major-assets).
 * Add a new public page here when you create it.
 */
const PAGES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about/founder", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/invite-mercy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/chapters", priority: 0.8, changeFrequency: "monthly" },
  { path: "/chapters/men", priority: 0.7, changeFrequency: "monthly" },
  { path: "/chapters/women", priority: 0.7, changeFrequency: "monthly" },
  { path: "/chapters/youth", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/academy/courses", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/assessments", priority: 0.6, changeFrequency: "monthly" },
  { path: "/academy/teachers", priority: 0.6, changeFrequency: "monthly" },
  { path: "/academy/learner-support", priority: 0.6, changeFrequency: "monthly" },
  { path: "/daily", priority: 0.8, changeFrequency: "daily" },
  { path: "/daily/today", priority: 0.8, changeFrequency: "daily" },
  { path: "/library", priority: 0.7, changeFrequency: "weekly" },
  { path: "/serve", priority: 0.8, changeFrequency: "monthly" },
  { path: "/serve/volunteer", priority: 0.6, changeFrequency: "monthly" },
  { path: "/serve/skills", priority: 0.6, changeFrequency: "monthly" },
  { path: "/serve/prayer", priority: 0.6, changeFrequency: "monthly" },
  { path: "/serve/field-missions", priority: 0.6, changeFrequency: "monthly" },
  { path: "/serve/partner", priority: 0.6, changeFrequency: "monthly" },
  { path: "/serve/donate-in-kind", priority: 0.6, changeFrequency: "monthly" },
  { path: "/give", priority: 0.9, changeFrequency: "monthly" },
  { path: "/give/financially", priority: 0.8, changeFrequency: "monthly" },
  { path: "/give/in-kind", priority: 0.6, changeFrequency: "monthly" },
  { path: "/give/property-assets", priority: 0.6, changeFrequency: "monthly" },
  { path: "/join", priority: 0.9, changeFrequency: "monthly" },
  { path: "/store", priority: 0.7, changeFrequency: "weekly" },
];

const sitemap = (): MetadataRoute.Sitemap => {
  const base = siteUrl();
  const now = new Date();
  return [
    ...PAGES.map(({ path, priority, changeFrequency }) => ({
      url: `${base}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...STORE_PRODUCTS.map((product) => ({
      url: `${base}/store/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
};

export default sitemap;
