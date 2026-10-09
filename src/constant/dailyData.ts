import type { FrameworkIconName } from "@/components/icons/FrameworkIcons";

export const DAILY_HERO = {
  eyebrow: "ShininChrist Daily",
  titleLine1: "Daily Faith Formation",
  titleLine2: "for Christian Living",
  tagline: "Encounter God. Be Transformed. Live It Out.",
  description:
    "A daily multimedia experience with Scripture, worship, practical teaching and prayer — for everyone, everywhere.",
  cta: { text: "Begin Today", url: "/daily/today" },
  quote: "“Your word is a lamp for my feet, a light on my path.”",
  quoteReference: "Psalm 119:105",
  image: "/images/daily-hero-v2.webp",
};

export interface DailyFrameworkItem {
  id: string;
  icon: FrameworkIconName;
  title: string;
  description: string;
}

export const DAILY_FRAMEWORK: DailyFrameworkItem[] = [
  {
    id: "heart",
    icon: "heart",
    title: "In My Heart",
    description: "A transformed life",
  },
  {
    id: "home",
    icon: "home",
    title: "In My Home",
    description: "Christ in my family",
  },
  {
    id: "community",
    icon: "community",
    title: "In My Community",
    description: "Christ among us",
  },
  {
    id: "nation",
    icon: "nation",
    title: "In My Nation",
    description: "A brighter tomorrow",
  },
];

export const FORMATION_HEADER = {
  heading: "Today’s Faith Formation",
  eyebrow: "A simple rhythm. A transformed life.",
  description:
    "Follow the six steps below. Each day is an opportunity to grow in your relationship with Jesus Christ and live His truth in everyday life.",
  verseLabel: "Daily Verse",
  verse: "Be still and know that I am God.”",
  verseReference: "Psalm 46:10 (NIV)",
};

export interface FormationStepData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  /** Show a play button over the image (video / audio steps) */
  hasPlay?: boolean;
  body: string;
  /** Optional quote shown instead of plain body text */
  quote?: string;
  quoteReference?: string;
  /** Optional "Our Motto" box (final step) */
  motto?: string;
  button: {
    text: string;
    url: string;
    icon: "play" | "book" | "doc" | "headphones" | "arrow";
  };
}

export const FORMATION_STEPS: FormationStepData[] = [
  {
    id: "worship",
    number: 1,
    title: "Worship",
    subtitle: "Turn your heart to Elohim.",
    image: "/images/daily/step-worship-v2.webp",
    imageAlt: "A person with raised arms worshipping at sunset",
    hasPlay: true,
    body: "Worship prepares our hearts to receive His Word.",
    button: { text: "Play Worship", url: "#worship", icon: "play" },
  },
  {
    id: "word",
    number: 2,
    title: "The Word",
    subtitle: "Read today’s Scripture.",
    image: "/images/daily/step-word-v2.webp",
    imageAlt: "An open Bible",
    body: "",
    quote: "“Therefore, as God’s chosen people…”",
    quoteReference: "Colossians 3:12 (NIV)",
    button: { text: "Read Scripture", url: "#the-word", icon: "book" },
  },
  {
    id: "explore",
    number: 3,
    title: "Explore the Word",
    subtitle: "Understand what it means.",
    image: "/images/daily/step-explore-v2.webp",
    imageAlt: "A Bible and notebook ready for study",
    hasPlay: true,
    body: "A deeper look at today’s Scripture and what it teaches us.",
    button: { text: "Watch Teaching", url: "#explore", icon: "play" },
  },
  {
    id: "live",
    number: 4,
    title: "Live the Word",
    subtitle: "Apply it to your life.",
    image: "/images/daily/step-live-v2.webp",
    imageAlt: "A notebook reading: Do what it says. Live it today.",
    body: "Practical steps to live out today’s Scripture in your heart, home, community and nation.",
    button: { text: "View Reflection", url: "#live", icon: "doc" },
  },
  {
    id: "prayer",
    number: 5,
    title: "Prayer",
    subtitle: "From the heart outward.",
    image: "/images/daily/step-prayer-v2.webp",
    imageAlt: "Hands clasped in prayer",
    body: "Let us pray — for forgiveness, for others, for mercy, for our needs, our families, our churches and community leaders, and the leaders of our nations.",
    button: { text: "Pray With Us", url: "#prayer", icon: "headphones" },
  },
  {
    id: "shine",
    number: 6,
    title: "Go & Shine",
    subtitle: "Live it out today.",
    image: "/images/daily/step-shine-v2.webp",
    imageAlt: "A person standing on a hill at sunrise",
    body: "Be a light today in your sphere of influence.",
    motto: "“Shining Christ in our Hearts, Homes, Communities, and Nations.”",
    button: { text: "Be Encouraged", url: "#shine", icon: "arrow" },
  },
];

export const DAILY_BANNER = {
  title: "A New Day. A Greater Purpose.",
  description:
    "Let today’s Word shape your thoughts, your actions, and your testimony.",
  cta: { text: "Come Tomorrow", url: "/daily/today" },
  quote: "“His mercies are new every morning; great is your faithfulness.”",
  quoteReference: "Lamentations 3:23 (NIV)",
  image: "/images/daily/banner-bg-v2.webp",
};

export const TODAY_PAGE = {
  title: "Today’s Faith Formation",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Daily", href: "/daily" },
    { label: "Today", href: "/daily/today" },
  ],
  verseLabel: "Today’s Verse",
  verse: "Be still and know that I am God.",
  verseReference: "Psalm 46:10 (NIV)",
  actions: [
    {
      id: "youtube",
      text: "Watch on YouTube",
      url: "#youtube",
      tone: "green",
      icon: "play",
    },
    {
      id: "audio",
      text: "Listen to Audio Only",
      url: "#audio",
      tone: "gold",
      icon: "headphones",
    },
    {
      id: "share",
      text: "Share This Daily",
      url: "#share",
      tone: "grey",
      icon: "share",
    },
    {
      id: "join",
      text: "Join ShininChrist",
      url: "/join",
      tone: "mint",
      icon: "shield",
    },
  ] as const,
};
