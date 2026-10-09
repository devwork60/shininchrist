import type { SupportIconName } from "@/components/icons/SupportIcons";

export const LEARNER_SUPPORT_HERO = {
  titleLines: ["Learner", "Support"],
  taglineLines: ["Guidance. Resources.", "Encouragement. Always."],
  image: "/images/learner-support-hero.webp",
};

export interface SupportServiceData {
  id: string;
  icon: SupportIconName;
  title: string;
  description: string;
  /** CSS variable holding the badge colour (see globals.css) */
  accent: string;
}

export const SUPPORT_SERVICES: SupportServiceData[] = [
  {
    id: "academic",
    icon: "academic",
    title: "Academic Support",
    description: "Get help with your studies.",
    accent: "var(--academy-navy)",
  },
  {
    id: "mentorship",
    icon: "mentorship",
    title: "Mentorship",
    description: "Receive guidance and encouragement.",
    accent: "var(--academy-navy)",
  },
  {
    id: "resources",
    icon: "resources",
    title: "Study Resources",
    description: "Access tools, tips and learning materials.",
    accent: "var(--field-tech)",
  },
  {
    id: "community",
    icon: "community",
    title: "Learning Community",
    description: "Connect with other learners.",
    accent: "var(--field-tech)",
  },
  {
    id: "career",
    icon: "career",
    title: "Career & Life Skills Guidance",
    description: "Prepare for your future.",
    accent: "var(--academy-navy)",
  },
  {
    id: "future",
    icon: "future",
    title: "Future Support Services",
    description: "Additional academic and mentorship services (Phase 2).",
    accent: "var(--academy-navy)",
  },
];

export const LEARNER_SUPPORT_CTA = {
  text: "Get Learner Support",
  url: "/contact",
};

export const LEARNER_SUPPORT_QUOTE = {
  quote: "“You are not alone. We learn, grow and succeed together.”",
  author: "ShininChrist Academy",
};
