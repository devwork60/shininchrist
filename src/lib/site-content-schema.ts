import { FOOTER_CONTACT, FOOTER_EXPLORE, FOOTER_INVOLVED, FOOTER_LEGAL, FOOTER_SUPPORT, SOCIAL_LINKS, type FooterLink } from "@/constant/footerData";
import { INVITE_HERO } from "@/constant/inviteMercyData";
import { NAV_ITEMS } from "@/constant/navData";
import { JoinInputError } from "@/lib/join";

/**
 * What an admin can edit on the public site, with the defaults taken from the constant files (so the site looks
 * the same before anything is saved) and strict checks for everything an admin types.
 */

export const CONTENT_KEYS = ["invite_mercy", "footer", "header"] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];

export interface LinkItem {
  label: string;
  href: string;
}
export interface HeaderItem extends LinkItem {
  children: LinkItem[];
}
export interface InviteContent {
  title: string[];
  tagline: string[];
  description: string;
  image: string;
  quote: string;
  quoteBy: string[];
}
export interface FooterContent {
  explore: FooterLink[];
  involved: FooterLink[];
  support: FooterLink[];
  legal: FooterLink[];
  email: string;
  whatsapp: string;
  social: { id: string; url: string; enabled: boolean }[];
}

const simpleLink = ({ label, href }: FooterLink): FooterLink => ({ label, href });

export const DEFAULTS: {
  invite_mercy: InviteContent;
  footer: FooterContent;
  header: HeaderItem[];
} = {
  invite_mercy: {
    title: [...INVITE_HERO.title],
    tagline: [...INVITE_HERO.tagline],
    description: INVITE_HERO.description,
    image: INVITE_HERO.image,
    quote: INVITE_HERO.quote,
    quoteBy: [...INVITE_HERO.quoteBy],
  },
  footer: {
    explore: FOOTER_EXPLORE.map(simpleLink),
    involved: FOOTER_INVOLVED.map(simpleLink),
    support: FOOTER_SUPPORT.map(simpleLink),
    legal: FOOTER_LEGAL.map(simpleLink),
    email: FOOTER_CONTACT.items[0].lines[1],
    whatsapp: FOOTER_CONTACT.items[1].lines[1],
    social: SOCIAL_LINKS.map(({ id, url, enabled }) => ({ id, url, enabled })),
  },
  header: NAV_ITEMS.map((item) => ({
    label: item.label,
    href: item.href,
    children: (item.children ?? []).map(({ label, href }) => ({ label, href })),
  })),
};

// ----------------------------------------------------------------- checks

const fail = (message: string): never => {
  throw new JoinInputError(message);
};

const text = (value: unknown, label: string, max: number, required = true) => {
  const clean = String(value ?? "").trim();
  if (required && !clean) fail(`${label} is required.`);
  if (clean.length > max) fail(`${label} is too long (maximum ${max} characters).`);
  return clean;
};

/** Internal paths, http(s) links, mailto: and tel: only. Rejects javascript: and other schemes. */
const link = (value: unknown, label: string) => {
  const href = text(value, `${label} link`, 300);
  if (href === "#") return href;
  if (href.startsWith("/") && !href.startsWith("//") && !/[\\\s]/.test(href))
    return href;
  if (/^(mailto:|tel:)[^\s]+$/i.test(href)) return href;
  if (/^https?:\/\/[^\s]+$/i.test(href)) {
    try {
      new URL(href);
      return href;
    } catch {
      /* falls through to the error below */
    }
  }
  return fail(`${label}: the link "${href}" is not valid. Use /page, https://… , mailto: or tel:.`);
};

const links = (value: unknown, label: string, max: number): LinkItem[] => {
  if (!Array.isArray(value)) return fail(`${label} is invalid.`);
  if (value.length > max) fail(`${label} can have at most ${max} links.`);
  return value.map((row) => ({
    label: text(row?.label, `${label} label`, 60),
    href: link(row?.href, label),
  }));
};

const lines = (value: unknown, label: string, count: number, max: number) => {
  const list = Array.isArray(value) ? value : [];
  return Array.from({ length: count }, (_, i) =>
    text(list[i], `${label} line ${i + 1}`, max),
  );
};

/** Our own images only: a file in /public/images or one in this project's public site-media storage. */
const image = (value: unknown) => {
  const src = text(value, "Photo", 500);
  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}/storage/v1/object/public/site-media/`;
  const ownStorage = !!process.env.NEXT_PUBLIC_SUPABASE_URL && src.startsWith(base);
  const localFile = /^\/images\/[\w./-]+$/.test(src) && !src.includes("..");
  if (!ownStorage && !localFile) fail("Please upload the photo again.");
  return src;
};

export const sanitize = (key: ContentKey, input: unknown) => {
  const v = (input ?? {}) as Record<string, unknown>;
  if (key === "invite_mercy") {
    return {
      title: lines(v.title, "Heading", 2, 40),
      tagline: lines(v.tagline, "Tagline", 2, 80),
      description: text(v.description, "Description", 600),
      image: image(v.image),
      quote: text(v.quote, "Quote", 240),
      quoteBy: lines(v.quoteBy, "Quote by", 2, 40),
    } satisfies InviteContent;
  }
  if (key === "footer") {
    const social = Array.isArray(v.social) ? v.social : [];
    return {
      explore: links(v.explore, "Explore", 20),
      involved: links(v.involved, "Get Involved", 20),
      support: links(v.support, "Support", 20),
      legal: links(v.legal, "Legal", 12),
      email: text(v.email, "Email", 120),
      whatsapp: text(v.whatsapp, "WhatsApp", 40),
      social: DEFAULTS.footer.social.map((base) => {
        const row = social.find((s) => s?.id === base.id) ?? base;
        return { id: base.id, url: link(row.url, base.id), enabled: row.enabled === true };
      }),
    } satisfies FooterContent;
  }
  const items = Array.isArray(v.items) ? v.items : fail("The menu is invalid.");
  if (items.length < 1 || items.length > 12) fail("The menu needs between 1 and 12 items.");
  return items.map((row: Record<string, unknown>) => ({
    label: text(row.label, "Menu label", 40),
    href: link(row.href, "Menu"),
    children: links(row.children ?? [], "Dropdown", 14),
  })) satisfies HeaderItem[];
};
