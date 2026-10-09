export const NON_MEMBER_LIBRARY_DATA = {
  badge: "MEMBER RESOURCE",
  title: "The ShininChrist Library is a Member Resource",
  description:
    "Access teachings, Bible studies, ShininChrist Music, educational materials, media, publications and practical resources from across the ShininChrist community.",
  benefits: [
    "Exclusive member content",
    "Resources from all ShininChrist programs",
    "Teachings, music, media, publications & more",
    "Tools to help you grow and make an impact",
  ],
  primaryCta: { text: "Join ShininChrist →", url: "/join" },
  secondaryCta: { text: "Member Login", url: "/login" },
  quote: "“Seek knowledge, and He will give it to you…”",
  quoteReference: "Proverbs 2:6 (NIV)",
};

export const MEMBER_LIBRARY_HERO = {
  title: "Welcome to the ShininChrist Library",
  tagline: "Learn. Grow. Explore. Be Equipped.",
  searchPlaceholder: "Search the Library...",
  image: "/images/library-hero.webp",
};

export const LIBRARY_TAGS = [
  "All",
  "Faith",
  "Christian Living",
  "Education",
  "Media",
  "Music",
  "Publications",
  "Tools",
];

export interface MemberFeaturedItem {
  id: string;
  category: "TEACHING" | "MUSIC" | "ACADEMY" | "PUBLICATION";
  title: string;
  subtitle: string;
  type: "video" | "audio" | "guide";
  image: string;
  tag: string;
  url: string;
}

export const MEMBER_FEATURED_ITEMS: MemberFeaturedItem[] = [
  {
    id: "faith-works",
    category: "TEACHING",
    title: "Faith That Works",
    subtitle: "Video Teaching ↳",
    type: "video",
    tag: "Faith",
    image: "/images/library/faith-collection.webp",
    url: "/library/teachings/faith-that-works",
  },
  {
    id: "worship-col",
    category: "MUSIC",
    title: "ShininChrist Worship Collection",
    subtitle: "Audio Playlist ↳",
    type: "audio",
    tag: "Music",
    image: "/images/library/music-collection.webp",
    url: "/library/music/worship-collection",
  },
  {
    id: "waec-tips",
    category: "ACADEMY",
    title: "WAEC Study Tips",
    subtitle: "Study Guide ↳",
    type: "guide",
    tag: "Education",
    image: "/images/library/featured-academy.webp",
    url: "/library/academy/waec-study-tips",
  },
];

export interface MemberCollectionItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  url: string;
}

export const MEMBER_COLLECTIONS: MemberCollectionItem[] = [
  {
    id: "purpose",
    title: "ShininPurpose",
    description: "Discover Your God-Given Purpose",
    image: "/images/library/purpose-collection.webp",
    tag: "Faith",
    url: "/library/purpose",
  },
  {
    id: "faith",
    title: "ShininFaith",
    description: "Grow in Your Faith",
    image: "/images/library/faith-collection.webp",
    tag: "Faith",
    url: "/library/faith",
  },
  {
    id: "daily",
    title: "ShininDaily",
    description: "Deepen Your Daily Walk",
    image: "/images/library/hope-collection.webp",
    tag: "Christian Living",
    url: "/daily",
  },
  {
    id: "life",
    title: "ShininLife",
    description: "Practical Life for Real People",
    image: "/images/library/life-collection.webp",
    tag: "Christian Living",
    url: "/library/life",
  },
  {
    id: "wisdom",
    title: "ShininWisdom",
    description: "Tools for Wiser Living",
    image: "/images/library/wisdom-collection.webp",
    tag: "Tools",
    url: "/library/wisdom",
  },
  {
    id: "hope",
    title: "ShininHope",
    description: "Hope for Today and Tomorrow",
    image: "/images/library/hope-collection.webp",
    tag: "Faith",
    url: "/library/hope",
  },
  {
    id: "music",
    title: "ShininChrist Music",
    description: "Original Songs for His Glory",
    image: "/images/library/music-collection.webp",
    tag: "Music",
    url: "/library/music",
  },
];
