import { CONTACT } from "@/constant/contactInfo";
import {
  FOOTER_EXPLORE,
  FOOTER_INVOLVED,
  FOOTER_LEGAL,
  FOOTER_SUPPORT,
  SOCIAL_LINKS,
  type FooterLink,
} from "@/constant/footerData";
import { INVITE_HERO } from "@/constant/inviteMercyData";
import { NAV_ITEMS } from "@/constant/navData";
import {
  HERO_DESCRIPTION,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  HERO_TAGLINE,
  HERO_TITLE,
} from "@/constant/homeData";
import { FAQ_ITEMS } from "@/constant/faqData";
import { ARCHIVE_ENTRIES } from "@/constant/dailyArchiveData";
import { FORMATION_STEPS, TODAY_PAGE } from "@/constant/dailyData";
import { JoinInputError } from "@/lib/join";

/**
 * What an admin can edit on the public site, with the defaults taken from the constant files (so the site looks
 * the same before anything is saved) and strict checks for everything an admin types.
 */

export const CONTENT_KEYS = [
  "invite_mercy",
  "footer",
  "header",
  "home_hero",
  "faqs",
  "daily_today",
  "daily_entries",
] as const;
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

export interface HomeHeroContent {
  title: string;
  tagline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  videoText: string;
  videoUrl: string;
  announcementEnabled: boolean;
  announcementText: string;
  announcementUrl: string;
}

export interface FaqItemContent {
  id: string;
  category: string;
  question: string;
  answer: string;
  scriptures?: string[];
  keyPoints?: string[];
}

export type DailyIcon = "play" | "book" | "doc" | "headphones" | "arrow";

/** One of the Daily activities (Worship, The Word, ...). The order of the list is the order shown. */
export interface DailyStep {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  /** Devotional or reflection text. A blank line starts a new paragraph. */
  body: string;
  quote: string;
  quoteReference: string;
  motto: string;
  /** Optional video address (YouTube plays on the page; other sites open as a link). */
  videoUrl: string;
  buttonText: string;
  buttonUrl: string;
  icon: DailyIcon;
}

export const VIEW_OPTION_IDS = ["youtube", "facebook", "instagram", "tiktok", "audio"] as const;
export type ViewOptionId = (typeof VIEW_OPTION_IDS)[number];

/** The "watch / listen" buttons in the right-hand column of the Today page. */
export interface DailyViewOption {
  id: ViewOptionId;
  label: string;
  url: string;
  enabled: boolean;
}

export interface DailyTodayContent {
  title: string;
  verse: string;
  verseReference: string;
  steps: DailyStep[];
  viewOptions: DailyViewOption[];
}

/** One dated Daily entry. It appears under This Week or the Archive depending on its date. */
export interface DailyEntry {
  id: string;
  /** yyyy-mm-dd. A future date keeps the entry hidden until that day. */
  date: string;
  title: string;
  scripture: string;
  book: string;
  topic: string;
  summary: string;
  reflection: string;
  assignment: string;
  image: string;
  imageAlt: string;
  videoUrl: string;
  linkText: string;
  linkUrl: string;
}

const simpleLink = ({ label, href }: FooterLink): FooterLink => ({ label, href });

export const DEFAULTS: {
  invite_mercy: InviteContent;
  footer: FooterContent;
  header: HeaderItem[];
  home_hero: HomeHeroContent;
  faqs: FaqItemContent[];
  daily_today: DailyTodayContent;
  daily_entries: DailyEntry[];
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
    email: CONTACT.email,
    whatsapp: CONTACT.whatsappNumber,
    social: SOCIAL_LINKS.map(({ id, url, enabled }) => ({ id, url, enabled })),
  },
  header: NAV_ITEMS.map((item) => ({
    label: item.label,
    href: item.href,
    children: (item.children ?? []).map(({ label, href }) => ({ label, href })),
  })),
  home_hero: {
    title: HERO_TITLE,
    tagline: HERO_TAGLINE,
    description: HERO_DESCRIPTION,
    primaryCtaText: HERO_PRIMARY_CTA.text,
    primaryCtaUrl: HERO_PRIMARY_CTA.url,
    videoText: HERO_SECONDARY_CTA.text,
    videoUrl: HERO_SECONDARY_CTA.video,
    announcementEnabled: false,
    announcementText:
      "Welcome to ShininChrist — Shining Christ in our Hearts, Homes, Communities, and Nations",
    announcementUrl: "/join",
  },
  faqs: FAQ_ITEMS.map((item) => ({
    id: item.id,
    category: item.category,
    question: item.question,
    answer: item.answer,
  })),
  daily_today: {
    title: TODAY_PAGE.title,
    verse: TODAY_PAGE.verse,
    verseReference: TODAY_PAGE.verseReference,
    steps: FORMATION_STEPS.map((step) => ({
      id: step.id,
      title: step.title,
      subtitle: step.subtitle,
      image: step.image,
      imageAlt: step.imageAlt,
      body: step.body,
      quote: step.quote ?? "",
      quoteReference: step.quoteReference ?? "",
      motto: step.motto ?? "",
      videoUrl: "",
      buttonText: step.button.text,
      buttonUrl: step.button.url,
      icon: step.button.icon,
    })),
    viewOptions: [
      { id: "youtube", label: "Watch on YouTube", url: "https://youtube.com/@shininchrist", enabled: true },
      { id: "facebook", label: "Watch on Facebook", url: "https://www.facebook.com/share/1GZbPA9QNH/", enabled: true },
      { id: "instagram", label: "Watch on Instagram", url: CONTACT.instagramUrl, enabled: true },
      // Hidden until the TikTok account is confirmed as the official one.
      { id: "tiktok", label: "Watch on TikTok", url: CONTACT.tiktokUrl, enabled: false },
      // Hidden until an audio address is added.
      { id: "audio", label: "Listen to Audio Only", url: "", enabled: false },
    ],
  },
  daily_entries: ARCHIVE_ENTRIES.map((entry) => ({
    id: entry.id,
    date: entry.date,
    title: entry.title,
    scripture: entry.scripture,
    book: entry.book,
    topic: entry.topic,
    summary: "",
    reflection: "",
    assignment: "",
    image: entry.image,
    imageAlt: entry.imageAlt,
    videoUrl: "",
    linkText: "",
    linkUrl: "",
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
  if (href === "#" || /^#[A-Za-z0-9_-]+$/.test(href)) return href;
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

/** Like image(), but an empty value is allowed (the page shows a plain block instead). */
const optionalImage = (value: unknown) =>
  String(value ?? "").trim() ? image(value) : "";

/** A full web address (https://...) or nothing. Used for videos and external links. */
const webUrl = (value: unknown, label: string) => {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  if (raw.length > 400 || !/^https?:\/\/[^\s]+$/i.test(raw))
    return fail(label + ": use a full web address starting with https://");
  try {
    new URL(raw);
  } catch {
    return fail(label + ": that web address is not valid.");
  }
  return raw;
};

const slug = (value: unknown, fallback: string) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || fallback;

const DAILY_ICONS: DailyIcon[] = ["play", "book", "doc", "headphones", "arrow"];

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
  if (key === "home_hero") {
    return {
      title: text(v.title, "Hero title", 100),
      tagline: text(v.tagline, "Hero tagline", 160),
      description: text(v.description, "Hero description", 600),
      primaryCtaText: text(v.primaryCtaText, "Primary button label", 40),
      primaryCtaUrl: link(v.primaryCtaUrl, "Primary button"),
      videoText: text(v.videoText, "Video button label", 40),
      videoUrl: text(v.videoUrl, "Video URL", 400),
      announcementEnabled: Boolean(v.announcementEnabled),
      announcementText: text(v.announcementText, "Announcement text", 200, false),
      announcementUrl: v.announcementUrl ? link(v.announcementUrl, "Announcement") : "/join",
    } satisfies HomeHeroContent;
  }
  if (key === "faqs") {
    const items = Array.isArray(v.items)
      ? v.items
      : Array.isArray(v)
        ? (v as unknown[])
        : fail("FAQ items must be a list.");
    if (items.length > 100) fail("Cannot exceed 100 FAQ items.");
    return items.map((item: unknown, idx: number) => {
      const row = (item ?? {}) as Record<string, unknown>;
      return {
        id: text(row.id || `faq-${idx + 1}`, "FAQ ID", 60),
        category: text(row.category || "General", "FAQ Category", 60),
        question: text(row.question, "Question", 300),
        answer: text(row.answer, "Answer", 3000),
      };
    }) satisfies FaqItemContent[];
  }
  if (key === "daily_today") {
    const steps = Array.isArray(v.steps) ? v.steps : fail("The activities must be a list.");
    if (steps.length < 1 || steps.length > 12)
      fail("Daily needs between 1 and 12 activities.");
    const seen = new Set<string>();
    const cleanSteps = steps.map((item: unknown, idx: number) => {
      const row = (item ?? {}) as Record<string, unknown>;
      const n = idx + 1;
      let id = slug(row.id, "step-" + n);
      while (seen.has(id)) id = id + "-" + n;
      seen.add(id);
      const icon = String(row.icon ?? "arrow") as DailyIcon;
      return {
        id,
        title: text(row.title, "Activity " + n + " title", 60),
        subtitle: text(row.subtitle, "Activity " + n + " subtitle", 120, false),
        image: image(row.image),
        imageAlt: text(row.imageAlt, "Activity " + n + " photo description", 160, false),
        body: text(row.body, "Activity " + n + " text", 6000, false),
        quote: text(row.quote, "Activity " + n + " quote", 600, false),
        quoteReference: text(row.quoteReference, "Activity " + n + " quote reference", 120, false),
        motto: text(row.motto, "Activity " + n + " motto", 240, false),
        videoUrl: webUrl(row.videoUrl, "Activity " + n + " video"),
        buttonText: text(row.buttonText, "Activity " + n + " button label", 40),
        buttonUrl: row.buttonUrl ? link(row.buttonUrl, "Activity " + n + " button") : "#",
        icon: DAILY_ICONS.includes(icon) ? icon : "arrow",
      };
    });
    const options = Array.isArray(v.viewOptions) ? v.viewOptions : [];
    return {
      title: text(v.title, "Page title", 80),
      verse: text(v.verse, "Verse", 400),
      verseReference: text(v.verseReference, "Verse reference", 80, false),
      steps: cleanSteps,
      viewOptions: DEFAULTS.daily_today.viewOptions.map((base) => {
        const row = (options.find((o: { id?: string }) => o?.id === base.id) ?? base) as Record<string, unknown>;
        const enabled = row.enabled === true;
        const url = webUrl(row.url, base.id + " address");
        if (enabled && !url) fail("Add an address for " + base.id + ", or switch it off.");
        return {
          id: base.id,
          label: text(row.label, base.id + " button label", 40),
          url,
          enabled,
        };
      }),
    } satisfies DailyTodayContent;
  }
  if (key === "daily_entries") {
    const items = Array.isArray(v.items) ? v.items : Array.isArray(v) ? (v as unknown[]) : fail("The entries must be a list.");
    if (items.length > 400) fail("Daily can have at most 400 entries.");
    const seen = new Set<string>();
    return items.map((item: unknown, idx: number) => {
      const row = (item ?? {}) as Record<string, unknown>;
      const n = idx + 1;
      let id = slug(row.id, "entry-" + n);
      while (seen.has(id)) id = id + "-" + n;
      seen.add(id);
      const date = text(row.date, "Entry " + n + " date", 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date + "T00:00:00Z")))
        fail("Entry " + n + ": the date must look like 2026-11-05.");
      return {
        id,
        date,
        title: text(row.title, "Entry " + n + " title", 120),
        scripture: text(row.scripture, "Entry " + n + " scripture", 120, false),
        book: text(row.book, "Entry " + n + " Bible book", 60, false),
        topic: text(row.topic, "Entry " + n + " topic", 60, false),
        summary: text(row.summary, "Entry " + n + " devotional", 8000, false),
        reflection: text(row.reflection, "Entry " + n + " reflection", 4000, false),
        assignment: text(row.assignment, "Entry " + n + " assignment", 4000, false),
        image: optionalImage(row.image),
        imageAlt: text(row.imageAlt, "Entry " + n + " photo description", 160, false),
        videoUrl: webUrl(row.videoUrl, "Entry " + n + " video"),
        linkText: text(row.linkText, "Entry " + n + " link label", 60, false),
        linkUrl: webUrl(row.linkUrl, "Entry " + n + " link"),
      };
    }) satisfies DailyEntry[];
  }
  const items = Array.isArray(v.items) ? v.items : fail("The menu is invalid.");
  if (items.length < 1 || items.length > 12) fail("The menu needs between 1 and 12 items.");
  return items.map((row: Record<string, unknown>) => ({
    label: text(row.label, "Menu label", 40),
    href: link(row.href, "Menu"),
    children: links(row.children ?? [], "Dropdown", 14),
  })) satisfies HeaderItem[];
};
