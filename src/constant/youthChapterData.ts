import type { DailyConnectData } from "@/constant/chapterDailyTypes";
import type { FocusSectionData } from "@/constant/chapterFocusTypes";

export const YOUTH_HERO = {
  titleLine1: "Youth",
  titleLine2: "Chapter",
  tagline: "Faith. Identity. Friendship. Future.",
  quote:
    "“Let no one look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.”",
  quoteReference: "1 Timothy 4:12",
  primaryCta: { text: "Join the Youth Chapter", url: "/join" },
  videoCta: { text: "Watch Video", url: "#chapter-video" },
  image: "/images/chapters/youth-hero.jpg",
  imageAlt: "A group of happy, diverse young friends smiling together outdoors",
};

export const YOUTH_FOCUS: FocusSectionData = {
  heading: "What We Focus On",
  accent: "var(--chapter-youth, #1d6b63)",
  leftCount: 5,
  items: [
    {
      id: "faith",
      icon: "cross",
      title: "Faith, Identity & Purpose",
      description: "Discover who you are in Christ.",
    },
    {
      id: "friendships",
      icon: "people",
      title: "Friendships & Community",
      description: "Build positive, lasting relationships.",
    },
    {
      id: "dating",
      icon: "heartCheck",
      title: "Dating, Courtship & Healthy Relationships",
      description: "Age-appropriate guidance for every stage.",
    },
    {
      id: "adulthood",
      icon: "family",
      title: "Preparing for Adulthood",
      description: "Life skills, decision-making and future readiness.",
    },
    {
      id: "mentorship",
      icon: "mentor",
      title: "Mentorship",
      description: "Learn from and be encouraged by positive role models.",
    },
    {
      id: "education",
      icon: "briefcase",
      title: "Education & Career Exploration",
      description: "Find and develop your gifts and talents.",
    },
    {
      id: "lifeskills",
      icon: "briefcase",
      title: "Life Skills & Personal Development",
      description: "Build confidence and independence.",
    },
    {
      id: "health",
      icon: "heartPulse",
      title: "Health & Wellbeing",
      description: "Make healthy choices for a bright future.",
    },
    {
      id: "care",
      icon: "handsHeart",
      title: "C.A.R.E. & Community Service",
      description: "Be the change in your community.",
    },
    {
      id: "recreation",
      icon: "sports",
      title: "Games, Movies, Sports & Trips",
      description: "Have fun, make memories and grow together.",
    },
    {
      id: "camps",
      icon: "star",
      title: "Camps, Competitions & Creative Experiences",
      description:
        "Develop talents, showcase skills and build lasting memories.",
    },
  ],
};

export const YOUTH_DAILY: DailyConnectData = {
  heading: "Connected to ShininChrist Daily",
  badgeTop: "I AM",
  badgeBottom: "CALLED",
  description:
    "Explore youth inspiration, stories and resources on I Am Called.",
  cta: { text: "Visit I Am Called", url: "/daily" },
  image: "/images/chapters/youth-hero.jpg",
  accent: "var(--chapter-youth, #1d6b63)",
};
