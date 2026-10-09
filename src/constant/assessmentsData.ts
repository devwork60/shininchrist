export const ASSESSMENTS_HERO = {
  titleLines: ["Examination", "Preparation"],
  taglineLines: ["Be Prepared.", "Be Confident.", "Go Further."],
  image: "/images/assessments-hero.webp",
};

export interface ExamData {
  id: string;
  /** Short code shown on the badge, e.g. "WAEC" */
  code: string;
  /** Text inside the round badge */
  badge: string;
  name: string;
  /** CSS variable holding the badge colour (see globals.css) */
  accent: string;
}

// Examination families named in the client's Academy guide.
export const EXAMS: ExamData[] = [
  {
    id: "waec",
    code: "WAEC",
    badge: "WAEC",
    name: "West African Examinations Council",
    accent: "var(--exam-waec)",
  },
  {
    id: "neco",
    code: "NECO",
    badge: "NECO",
    name: "National Examinations Council",
    accent: "var(--exam-neco)",
  },
  {
    id: "utme",
    code: "UTME / JAMB",
    badge: "JAMB",
    name: "Joint Admissions and Matriculation Board",
    accent: "var(--exam-jamb)",
  },
  {
    id: "gce",
    code: "GCE",
    badge: "GCE",
    name: "General Certificate of Education",
    accent: "var(--exam-gce)",
  },
  {
    id: "cxc",
    code: "CXC / CSEC",
    badge: "CXC",
    name: "Caribbean Examinations Council",
    accent: "var(--exam-cxc)",
  },
  {
    id: "cape",
    code: "CAPE",
    badge: "CAPE",
    name: "Caribbean Advanced Proficiency Examination",
    accent: "var(--exam-cape)",
  },
];

export const ASSESSMENTS_CTA = {
  text: "Explore Assessment Programs",
  url: "/academy/assessments#programs",
};

export const ASSESSMENTS_QUOTE = {
  quote: "“Preparation today opens tomorrow’s doors.”",
  author: "ShininChrist Academy",
};
