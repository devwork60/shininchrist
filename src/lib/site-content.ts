import { unstable_cache } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import { NAV_ITEMS, type NavChild, type NavItem } from "@/constant/navData";
import { prisma } from "@/lib/prisma";
import {
  CONTENT_KEYS,
  DEFAULTS,
  sanitize,
  type ContentKey,
  type DailyEntry,
  type DailyTodayContent,
  type FooterContent,
  type HeaderItem,
  type InviteContent,
} from "@/lib/site-content-schema";

export const CONTENT_TAG = "site-content";

/**
 * Saved text for one section, cached so the public pages stay fast (and static). The cache is refreshed when an
 * admin saves, and at most every 5 minutes anyway. If the database cannot be reached, the defaults are used.
 */
const load = unstable_cache(
  async (key: string) => {
    try {
      const row = await prisma.site_content.findUnique({ where: { key } });
      return row ? { value: row.value } : null;
    } catch {
      return null;
    }
  },
  ["site-content"],
  { tags: [CONTENT_TAG], revalidate: 300 },
);

/** Saved value re-checked with the same rules as saving; anything invalid falls back to the defaults. */
const read = async <T>(key: ContentKey, fallback: T): Promise<T> => {
  const saved = await load(key);
  if (!saved) return fallback;
  try {
    return sanitize(key, key === "header" ? { items: saved.value } : saved.value) as T;
  } catch {
    return fallback;
  }
};

export const getInviteContent = () =>
  read<InviteContent>("invite_mercy", DEFAULTS.invite_mercy);

export const getFooterContent = () =>
  read<FooterContent>("footer", DEFAULTS.footer);

export const getHeaderItems = () => read<HeaderItem[]>("header", DEFAULTS.header);

export const getHomeHeroContent = () =>
  read<typeof DEFAULTS.home_hero>("home_hero", DEFAULTS.home_hero);

export const getFaqItems = () =>
  read<typeof DEFAULTS.faqs>("faqs", DEFAULTS.faqs);

/** The Daily Today page: the activities (in order), the verse and the watch / listen options. */
export const getDailyToday = () =>
  read<DailyTodayContent>("daily_today", DEFAULTS.daily_today);

/**
 * The dated Daily entries. `saved` is false until an admin saves a list, so the sample entries keep showing
 * (as they always have) until real ones are added.
 */
export const getDailyEntries = async (): Promise<{
  entries: DailyEntry[];
  saved: boolean;
}> => {
  const saved = await load("daily_entries");
  const entries = await read<DailyEntry[]>("daily_entries", DEFAULTS.daily_entries);
  return { entries, saved: Boolean(saved) && entries !== DEFAULTS.daily_entries };
};

/** The menu with the saved labels and links, keeping each dropdown row's icon and description from the design. */
export const getNavItems = async (): Promise<NavItem[]> => {
  const saved = await getHeaderItems();
  if (saved === DEFAULTS.header) return NAV_ITEMS;
  const designRows: NavChild[] = NAV_ITEMS.flatMap((item) => item.children ?? []);
  return saved.map((item) => ({
    label: item.label,
    href: item.href,
    children: item.children.length
      ? item.children.map((child) => ({
          ...(designRows.find((row) => row.href === child.href) ?? {}),
          label: child.label,
          href: child.href,
        }))
      : undefined,
  }));
};

/** What the admin editor shows: the current saved content, or the defaults. */
export const getEditorContent = async () => ({
  invite_mercy: await getInviteContent(),
  footer: await getFooterContent(),
  header: await getHeaderItems(),
  home_hero: await getHomeHeroContent(),
  faqs: await getFaqItems(),
  daily_today: await getDailyToday(),
  daily_entries: (await getDailyEntries()).entries,
});

/** Validates and saves one section. Admin only (callers check getAdminUser first). */
export const saveSiteContent = async (
  adminId: string,
  key: unknown,
  input: unknown,
) => {
  if (!(CONTENT_KEYS as readonly string[]).includes(String(key)))
    throw new Error("Unknown section");
  const section = key as ContentKey;
  const value = sanitize(section, input) as unknown as Prisma.InputJsonValue;
  await prisma.site_content.upsert({
    where: { key: section },
    create: { key: section, value, updated_by: adminId },
    update: { value, updated_by: adminId, updated_at: new Date() },
  });
  await prisma.audit_log.create({
    data: { actor_id: adminId, action: "content.save", target: section },
  });
};
