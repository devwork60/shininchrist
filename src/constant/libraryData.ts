import type { CollectionIconName } from "@/components/icons/CollectionIcons";

export const LIBRARY_HERO = {
  titleLine1: "ShininChrist",
  titleLine2: "Library",
  tagline: "Resources for Life.",
  description:
    "Explore a rich collection of Christ-centered resources to help you grow in purpose, deepen your faith, make wise choices, find hope, and live well every day.",
  cta: { text: "Explore the Library", url: "#collections" },
  image: "/images/library-hero.webp",
  imageAlt:
    "A laptop, stacked books, an open Bible and a journal on a wooden desk",
};

export const COLLECTIONS_HEADING = "1. Explore by Collection";
export const COLLECTIONS_DESCRIPTION =
  "Browse our signature collections—designed to strengthen every area of your life.";

export interface CollectionData {
  id: string;
  icon: CollectionIconName;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** CSS variable holding the accent colour (see globals.css) */
  accent: string;
  url: string;
}

export const COLLECTIONS: CollectionData[] = [
  {
    id: "purpose",
    icon: "compass",
    title: "ShininPurpose",
    description:
      "Discover God’s purpose, your calling, identity, gifts, and direction.",
    image: "/images/library/purpose-collection.webp",
    imageAlt: "A winding path through green hills",
    accent: "var(--collection-purpose)",
    url: "/library/purpose",
  },
  {
    id: "faith",
    icon: "cross",
    title: "ShininFaith",
    description:
      "Grow in your knowledge of God and deepen your faith through His Word.",
    image: "/images/library/faith-collection.webp",
    imageAlt: "An open Bible",
    accent: "var(--collection-faith)",
    url: "/library/faith",
  },
  {
    id: "wisdom",
    icon: "bulb",
    title: "ShininWisdom",
    description:
      "Gain biblical wisdom, discernment, and understanding to make wise choices.",
    image: "/images/library/wisdom-collection.webp",
    imageAlt: "A compass resting on an old book",
    accent: "var(--collection-wisdom)",
    url: "/library/wisdom",
  },
  {
    id: "hope",
    icon: "heart",
    title: "ShininHope",
    description:
      "Find encouragement, restoration, and hope through every season of life.",
    image: "/images/library/hope-collection.webp",
    imageAlt: "A seedling growing from soil",
    accent: "var(--collection-hope)",
    url: "/library/hope",
  },
  {
    id: "life",
    icon: "people",
    title: "ShininLife",
    description:
      "Apply faith to everyday life, relationships, work, family, and practical living.",
    image: "/images/library/life-collection.webp",
    imageAlt: "A family walking together at sunset",
    accent: "var(--collection-life)",
    url: "/library/life",
  },
  {
    id: "music",
    icon: "music",
    title: "ShininChrist Music",
    description:
      "Experience uplifting music, worship, albums, and performances.",
    image: "/images/library/music-collection.webp",
    imageAlt: "A worship concert with stage lights",
    accent: "var(--collection-music)",
    url: "/library/music",
  },
];
