export const FEATURED_HEADING = "4. Featured Resources";
export const FEATURED_DESCRIPTION =
  "Fresh resources to inspire, equip, and empower you.";

export interface FeaturedResourceData {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  linkText: string;
  url: string;
  /** CSS variable holding the accent colour (see globals.css) */
  accent: string;
}

export const FEATURED_RESOURCES: FeaturedResourceData[] = [
  {
    id: "book",
    tag: "New Book",
    title: "ShininWisdom: Making Wise Decisions",
    description: "A practical guide to help you make Godly decisions daily.",
    image: "/images/library/featured-book.webp",
    imageAlt: "A book titled Making Wise Decisions",
    linkText: "View",
    url: "/library/wisdom",
    accent: "var(--collection-purpose)",
  },
  {
    id: "video",
    tag: "New Video",
    title: "Faith That Moves Mountains",
    description: "A powerful teaching on building unshakable faith.",
    image: "/images/library/featured-video.webp",
    imageAlt: "Video thumbnail: Faith That Moves Mountains",
    linkText: "Watch Now",
    url: "/library/watch",
    accent: "var(--collection-faith)",
  },
  {
    id: "testimony",
    tag: "Testimony",
    title: "He Restored My Life",
    description:
      "An inspiring testimony of hope, restoration and God’s faithfulness.",
    image: "/images/library/featured-testimony.webp",
    imageAlt: "A person with raised arms at sunrise",
    linkText: "Watch Now",
    url: "/library/watch",
    accent: "var(--collection-hope)",
  },
  {
    id: "academy",
    tag: "Academy Resource",
    title: "WAEC English Language Study Guide",
    description: "Comprehensive guide with practice questions.",
    image: "/images/library/featured-academy.webp",
    imageAlt: "A WAEC English study guide and notebook",
    linkText: "Download Now",
    url: "/library/download",
    accent: "var(--collection-life)",
  },
  {
    id: "release",
    tag: "New Release",
    title: "Still God (EP)",
    description: "A new EP to worship, declare and celebrate His goodness.",
    image: "/images/library/featured-release.webp",
    imageAlt: "A singer performing on stage",
    linkText: "Listen Now",
    url: "/library/music",
    accent: "var(--collection-music)",
  },
];
