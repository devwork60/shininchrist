import type { BenefitIconName } from "@/components/icons/BenefitIcons";
import type { FieldIconName } from "@/components/icons/FieldIcons";

export const ACADEMY_HERO = {
  titleLine1: "ShininChrist",
  titleLine2: "Academy",
  tagline: "Learn Today. Lead Tomorrow. Shine for Christ.",
  description:
    "ShininChrist Academy provides Christ-centered education for all ages, equipping learners with knowledge, skills and character to make a positive impact in their homes, communities and nations.",
  primaryCta: { text: "Join Academy Today", url: "/join" },
  videoCta: { text: "Watch Academy Video", url: "#academy-video" },
  image: "/images/academy-hero-students-v2.webp",
};

export const FIELDS_HEADER = {
  heading: "Our Fields of Learning",
  lines: [
    "Six fields. Endless possibilities.",
    "A brighter you. A brighter tomorrow.",
  ],
};

export interface FieldData {
  id: string;
  icon: FieldIconName;
  title: string;
  description: string[];
  /** CSS variable holding the accent colour (see globals.css) */
  accent: string;
}

export const FIELDS: FieldData[] = [
  {
    id: "theology",
    icon: "cross",
    title: "Scripture & Theology",
    description: ["Know God.", "Live His Word."],
    accent: "var(--field-theology)",
  },
  {
    id: "arts",
    icon: "book",
    title: "Arts & Humanities",
    description: ["Explore. Create.", "Communicate."],
    accent: "var(--field-arts)",
  },
  {
    id: "science",
    icon: "atom",
    title: "Mathematics & Sciences",
    description: ["Think. Solve.", "Innovate."],
    accent: "var(--field-science)",
  },
  {
    id: "social",
    icon: "people",
    title: "Social Sciences & Business",
    description: ["Understand. Lead.", "Make a Difference."],
    accent: "var(--field-social)",
  },
  {
    id: "tech",
    icon: "laptop",
    title: "Information & Digital Technology",
    description: ["Learn. Create.", "Stay Ahead."],
    accent: "var(--field-tech)",
  },
  {
    id: "life",
    icon: "gears",
    title: "Life Skills & Practical Skills",
    description: ["Prepare. Apply.", "Thrive."],
    accent: "var(--field-life)",
  },
];

export interface BenefitData {
  id: string;
  icon: BenefitIconName;
  title: string;
  description: string;
}

export const BENEFITS: BenefitData[] = [
  {
    id: "ages",
    icon: "people",
    title: "All Ages Welcome",
    description: "Children • Youth • Adults",
  },
  {
    id: "global",
    icon: "globe",
    title: "Global Access",
    description: "Learn from Anywhere",
  },
  {
    id: "christ",
    icon: "cap",
    title: "Christ-Centered",
    description: "Education with Purpose",
  },
  {
    id: "practical",
    icon: "bars",
    title: "Practical & Relevant",
    description: "Skills for Real Life",
  },
  {
    id: "community",
    icon: "heart",
    title: "Supportive Community",
    description: "Learn. Grow. Belong.",
  },
  {
    id: "impact",
    icon: "ribbon",
    title: "Make an Impact",
    description: "In Your Life, Community and Nation.",
  },
];

export const BENEFITS_SCRIPT = [
  "Knowledge.",
  "Character.",
  "Impact",
  "for His Glory.",
];

export const FIELDS_CTA = { text: "Join Academy Today", url: "/join" };

export const ACADEMY_QUOTE = {
  quote:
    "“Education is a tool for transformation when it is rooted in Christ.”",
  author: "ShininChrist",
};
