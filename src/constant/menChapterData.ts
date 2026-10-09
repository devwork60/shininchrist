import type { DailyConnectData } from "@/constant/chapterDailyTypes";
import type { FocusSectionData } from "@/constant/chapterFocusTypes";

export const MEN_HERO = {
  titleLine1: "Men’s",
  titleLine2: "Chapter",
  tagline: "Faith. Brotherhood. Responsibility. Purpose.",
  quote:
    "“Be on your guard; stand firm in the faith; be courageous; be strong.”",
  quoteReference: "1 Corinthians 16:13",
  primaryCta: { text: "Join the Men’s Chapter", url: "/join" },
  videoCta: { text: "Watch Video", url: "#chapter-video" },
  image: "/images/chapters/men-hero-v4.webp",
  imageAlt: "A smiling man looking into the distance over rolling hills",
};

export const MEN_FOCUS: FocusSectionData = {
  heading: "What We Focus On",
  accent: "var(--chapter-men)",
  leftCount: 6,
  items: [
    {
      id: "faith",
      icon: "cross",
      title: "Faith & Discipleship",
      description: "Grow deeper in your relationship with Christ.",
    },
    {
      id: "brotherhood",
      icon: "people",
      title: "Brotherhood & Friendship",
      description: "Build strong, positive connections.",
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
      title: "Marriage & Fatherhood",
      description: "Support for building strong families.",
    },
    {
      id: "mentorship",
      icon: "mentor",
      title: "Mentorship",
      description: "Learn from and invest in others.",
    },
    {
      id: "work",
      icon: "briefcase",
      title: "Work, Career & Finances",
      description: "Develop skills for purpose and provision.",
    },
    {
      id: "leadership",
      icon: "star",
      title: "Leadership & Responsibility",
      description: "Be a man of integrity and influence.",
    },
    {
      id: "health",
      icon: "heartPulse",
      title: "Health & Wellbeing",
      description: "Care for your mind, body and spirit.",
    },
    {
      id: "care",
      icon: "handsHeart",
      title: "C.A.R.E. & Community Service",
      description: "Make a difference in your community.",
    },
    {
      id: "sports",
      icon: "sports",
      title: "Sports, Games, Trips & Experiences",
      description: "Fellowship, recreation and life-enriching activities.",
    },
  ],
};

export const MEN_DAILY: DailyConnectData = {
  heading: "Connected to ShininChrist Daily",
  badgeTop: "I AM",
  badgeBottom: "ADAM",
  description: "Explore men’s inspiration, stories and resources on I Am Adam.",
  cta: { text: "Visit I Am Adam", url: "/daily" },
  image: "/images/chapters/men-daily-bg.webp",
  accent: "var(--chapter-men)",
};
