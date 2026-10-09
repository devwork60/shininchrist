import type { ResourceIconName } from "@/components/icons/ResourceIcons";

export const RESOURCES_HEADING = "2. Explore Resources";
export const RESOURCES_DESCRIPTION =
  "Find resources in the format that works best for you.";

export interface ResourceFormatData {
  id: string;
  icon: ResourceIconName;
  title: string;
  description: string;
  /** CSS variable holding the accent colour (see globals.css) */
  accent: string;
  url: string;
}

export const RESOURCE_FORMATS: ResourceFormatData[] = [
  {
    id: "read",
    icon: "read",
    title: "Read",
    description: "Books, e-books, articles, Bible studies, journals, and more.",
    accent: "var(--collection-purpose)",
    url: "/library/read",
  },
  {
    id: "watch",
    icon: "watch",
    title: "Watch",
    description: "Videos, teachings, programs, interviews, and testimonies.",
    accent: "var(--collection-faith)",
    url: "/library/watch",
  },
  {
    id: "listen",
    icon: "listen",
    title: "Listen",
    description: "Music, teachings, podcasts, audio messages, and spoken word.",
    accent: "var(--collection-hope)",
    url: "/library/listen",
  },
  {
    id: "download",
    icon: "download",
    title: "Download",
    description:
      "Study guides, worksheets, printables, devotionals, and resources.",
    accent: "var(--collection-music)",
    url: "/library/download",
  },
];
