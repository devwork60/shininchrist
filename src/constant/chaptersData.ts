import type { ChapterPillarIconName } from "@/components/icons/ChapterPillarIcons";
import type { ExperienceIconName } from "@/components/icons/ExperienceIcons";

export const CHAPTERS_HERO = {
  title: "Chapters",
  taglineMain: "Learn Together. Grow Together. Serve Together.",
  taglineSub: "Different Journeys. One Purpose.",
  quote:
    "“For just as each of us has one body with many members, and these members do not all have the same function, so in Christ we, though many, form one body.”",
  quoteReference: "Romans 12:4-5",
  image: "/images/chapters-hero-clean.jpg",
  imageAlt:
    "Five friends with their arms around each other, watching the sunset",
};

export const CHAPTERS_ABOUT = {
  heading: "What Are ShininChrist Chapters?",
  description:
    "ShininChrist Chapters are places where people connect, encourage one another, grow in faith, develop life skills, serve their communities, and enjoy meaningful experiences together.",
  primaryCta: { text: "Join a Chapter", url: "/join" },
  videoCta: { text: "Watch Chapter Video", url: "#chapter-video" },
  scriptLines: ["One Family.", "Many Chapters.", "A Brighter Tomorrow."],
};

export interface ChapterPillarData {
  id: string;
  icon: ChapterPillarIconName;
  title: string;
  description: string;
}

export const CHAPTER_PILLARS: ChapterPillarData[] = [
  {
    id: "faith",
    icon: "cross",
    title: "Faith",
    description: "Grow deeper in Christ.",
  },
  {
    id: "fellowship",
    icon: "people",
    title: "Fellowship",
    description: "Build meaningful relationships.",
  },
  {
    id: "growth",
    icon: "book",
    title: "Growth",
    description: "Develop life skills and discover your purpose.",
  },
  {
    id: "care",
    icon: "care",
    title: "C.A.R.E. & Service",
    description: "Make a difference in your community.",
  },
];

export interface ExperienceItemData {
  id: string;
  icon: ExperienceIconName;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const EXPERIENCE_ITEMS: ExperienceItemData[] = [
  {
    id: "spiritual",
    icon: "cross",
    title: "Spiritual Growth",
    description: "Grow deeper in your walk with Christ.",
    image: "/images/chapters/spiritual.webp",
    imageAlt: "A young woman praying over an open Bible",
  },
  {
    id: "sisterhood",
    icon: "target",
    title: "Sisterhood & Brotherhood",
    description: "Meet new people and build lasting Godly relationships.",
    image: "/images/chapters/sisterhood.webp",
    imageAlt: "Three friends smiling together in ShininChrist shirts",
  },
  {
    id: "education",
    icon: "square",
    title: "Supplemental Education & Life Skills",
    description: "Learn. Develop. Excel.",
    image: "/images/chapters/education.webp",
    imageAlt: "A student writing notes next to a laptop",
  },
  {
    id: "care",
    icon: "heart",
    title: "C. A. R. E., & Service",
    description: "Compassion in action. Bring change to your community.",
    image: "/images/chapters/care.webp",
    imageAlt: "Volunteers packing a box of food together",
  },
  {
    id: "fellowship",
    icon: "dot",
    title: "Fellowship & Engagement",
    description: "Activities, events, support, and fun with purpose.",
    image: "/images/chapters/fellowship.webp",
    imageAlt: "A group of young people celebrating together",
  },
];

export const CHAPTERS_CTA = {
  title: "All Ages Welcome",
  subtitle: "(Children’s Chapter coming soon).",
  tagline: "Every Nation. One Family in Christ.",
  primaryCta: { text: "Join a Chapter", url: "/join" },
  videoCta: { text: "Watch Chapter Video", url: "#chapter-video" },
  leftImage: "/images/chapters/cta-left.webp",
  leftImageAlt:
    "A grandfather, grandmother and granddaughter in ShininChrist shirts",
  rightImage: "/images/chapters/cta-right.webp",
  rightImageAlt: "Four smiling young adults in ShininChrist shirts",
};
