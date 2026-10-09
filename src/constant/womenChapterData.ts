import type { DailyConnectData } from "@/constant/chapterDailyTypes";
import type { FocusSectionData } from "@/constant/chapterFocusTypes";

export const WOMEN_HERO = {
  titleLine1: "Women’s",
  titleLine2: "Chapter",
  tagline: "Faith. Sisterhood. Growth. Influence.",
  quote:
    "“She is clothed with strength and dignity; she can laugh at the days to come.”",
  quoteReference: "Proverbs 31:25",
  primaryCta: { text: "Join the Women’s Chapter", url: "/join" },
  videoCta: { text: "Watch Video", url: "#chapter-video" },
  image: "/images/chapters/women-hero.jpg",
  imageAlt:
    "A smiling woman filled with joy looking towards a warm golden sunset",
};

export const WOMEN_FOCUS: FocusSectionData = {
  heading: "What We Focus On",
  accent: "var(--chapter-women, #c96288)",
  leftCount: 5,
  items: [
    {
      id: "faith",
      icon: "cross",
      title: "Faith & Discipleship",
      description: "Grow deeper in your walk with Christ.",
    },
    {
      id: "sisterhood",
      icon: "people",
      title: "Sisterhood & Godly Friendships",
      description: "Build genuine, supportive connections with women of faith.",
    },
    {
      id: "dating",
      icon: "heartCheck",
      title: "Dating, Courtship & Relationships",
      description: "Guidance for healthy, God-honoring relationships.",
    },
    {
      id: "marriage",
      icon: "family",
      title: "Marriage & Motherhood",
      description: "Support for wives, mothers, and home-builders.",
    },
    {
      id: "mentorship",
      icon: "mentor",
      title: "Mentorship & Wisdom",
      description:
        "Pass down faith, grace, and life wisdom across generations.",
    },
    {
      id: "career",
      icon: "briefcase",
      title: "Career, Calling & Purpose",
      description: "Discover your gifts, career path, and God-given calling.",
    },
    {
      id: "leadership",
      icon: "star",
      title: "Leadership & Influence",
      description: "Be a woman of integrity, strength, and positive impact.",
    },
    {
      id: "wellbeing",
      icon: "heartPulse",
      title: "Emotional & Physical Wellbeing",
      description: "Nurture your mental, physical, and spiritual health.",
    },
    {
      id: "care",
      icon: "handsHeart",
      title: "C.A.R.E. & Community Outreach",
      description: "Spread compassion and service in your local community.",
    },
    {
      id: "experiences",
      icon: "sports",
      title: "Retreats, Events & Creative Experiences",
      description: "Gatherings, worship sessions, and enriching fellowship.",
    },
  ],
};

export const WOMEN_DAILY: DailyConnectData = {
  heading: "Connected to ShininChrist Daily",
  badgeTop: "I AM",
  badgeBottom: "EVE",
  description:
    "Explore women’s inspiration, devotionals and resources on I Am Eve.",
  cta: { text: "Visit I Am Eve", url: "/daily" },
  image: "/images/chapters/women-hero.jpg",
  accent: "var(--chapter-women, #c96288)",
};
