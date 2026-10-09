import type { AboutIconName } from "@/components/icons/AboutIcons";

export const FOUNDER_HERO = {
  titleTop: "About Our",
  titleAccent: "Founder",
  roles: [
    "Missionary • Evangelist • Author • Educator",
    "U.S. Army Veteran • Founder, ShininChrist",
  ],
  image: "/images/about/founder-banner-v2.webp",
};

export const FOUNDER_PROFILE = {
  name: "Georgia “Mercy” Morris",
  subtitle:
    "Missionary. Evangelist. Author. Educator. U.S. Army Veteran. Founder, ShininChrist.",
  portrait: "/images/about/founder-jacket.webp",
  portraitAlt: "Georgia “Mercy” Morris",
  paragraphs: [
    "Georgia “Mercy” Morris, known as Evangelist Mercy, is a Jamaican-born missionary, evangelist, author, educator, and U.S. Army veteran. She is the Founder of ShininChrist, a global digital ministry and academy created to advance spiritual, educational, and cultural literacy through interdisciplinary learning, Christian community, and compassionate service.",
    "Her life and work bring together faith, education, service, missions, writing, and media — reflecting the interdisciplinary foundation upon which ShininChrist is being built.",
  ],
  quote:
    "My life and work bring together faith, education, service, missions, writing, and media — reflecting the interdisciplinary foundation upon which ShininChrist is being built.",
  quoteBy: "— Mercy",
  inviteCta: { text: "Invite Mercy to Speak", url: "/about/invite-mercy" },
};

export interface EducationSegment {
  text: string;
  bold?: boolean;
}

export const FOUNDER_EDUCATION = {
  title: "Education & Service",
  segments: [
    {
      text: "Mercy began her professional journey as an educator. She earned her ",
    },
    { text: "Diploma in Teaching", bold: true },
    { text: " from " },
    { text: "The Mico University College", bold: true },
    {
      text: ", one of Jamaica’s historic and prestigious institutions for teacher education. She later earned her ",
    },
    { text: "Bachelor’s degree", bold: true },
    { text: " from " },
    {
      text: "Edinboro University, a renowned teacher-training university",
      bold: true,
    },
    {
      text: " in the United States with a distinguished history in teacher preparation and education. She also holds a ",
    },
    { text: "Master of Education", bold: true },
    { text: " from " },
    { text: "Walden University", bold: true },
    { text: " and a " },
    { text: "Master of Theology", bold: true },
    { text: " from " },
    { text: "Liberty University", bold: true },
    {
      text: ", a prominent Christian university with a strong tradition of theological and ministry education.",
    },
  ] as EducationSegment[],
  closing:
    "Mercy also served honorably in the United States Army, adding military service to a life shaped by education, ministry, leadership, and service.",
  universities: [
    {
      id: "mico",
      name: "The Mico University College",
      note: "",
      degree: "Diploma in Teaching",
      logo: "/images/about/logo-mico.webp",
    },
    {
      id: "edinboro",
      name: "Edinboro University",
      note: "(Renowned Teacher-Training University)",
      degree: "Bachelor’s Degree",
      logo: "/images/about/logo-edinboro.webp",
    },
    {
      id: "walden",
      name: "Walden University",
      note: "",
      degree: "Master of Education",
      logo: "/images/about/logo-walden.webp",
    },
    {
      id: "liberty",
      name: "Liberty University",
      note: "",
      degree: "Master of Theology",
      logo: "/images/about/logo-liberty.webp",
    },
    {
      id: "army",
      name: "U.S. Army",
      note: "",
      degree: "Honorable Service (Veteran)",
      logo: "/images/about/logo-us-army.webp",
    },
  ],
};

export interface FounderPillar {
  id: string;
  icon: AboutIconName;
  title: string;
  text: string;
}

export const FOUNDER_PILLARS: FounderPillar[] = [
  {
    id: "anointing",
    icon: "dove",
    title: "Apostolic Anointing",
    text: "Mercy carries an apostolic and prophetic anointing with a calling to the nations. Her ministry is centered on advancing the gospel of Jesus Christ beyond the walls of the church, discipling people, strengthening communities, and helping build Christ-centered works that serve God’s Kingdom.",
  },
  {
    id: "mission",
    icon: "globe",
    title: "From Jamaica to a Global Mission",
    text: "Born in Jamaica, Mercy’s journey has extended beyond the country of her birth and into international Christian ministry and missions. Her experiences across different countries, cultures, education systems, and communities helped shape her conviction that Christian ministry can address the whole person - spiritually, educationally, culturally, and practically. That conviction became part of the foundation for ShininChrist.",
  },
  {
    id: "why",
    icon: "cross",
    title: "Why ShininChrist",
    text: "ShininChrist was founded to help take the gospel of Jesus Christ beyond the walls of the church and into everyday life. Through its Chapters, Academy, Daily content, Library, media, compassionate service, and developing community initiatives, ShininChrist seeks to help people know Christ, continue learning, grow in Christian community, serve others, and make an impact: In My Heart. In My Home. In My Community. In My Nation.",
  },
];

export const FOUNDER_IMPACT = {
  title: "Our Impact",
  text: "Every heart transformed. Every home strengthened. Every community blessed. Every nation reached.",
  labels: ["In My Heart", "In My Home", "In My Community", "In My Nation"],
};

export const FOUNDER_VERSE = {
  text: "“Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.”",
  ref: "Matthew 5:16 (KJV)",
};

export const FOUNDER_VIDEO = {
  id: "founder-video",
  title: "Meet the Founder",
  text: "Hear Mercy share her testimony, journey, calling, and vision in her own voice.",
  cta: "Watch Evangelist Mercy’s Story",
  /** Temporary ShininChrist intro video supplied by the client; replace with Mercy's founder story later. */
  src: "/videos/shininchrist-intro.mp4",
};
