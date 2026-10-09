import type { ServeIconName } from "@/components/icons/ServeIcons";

export const SERVE_HERO = {
  eyebrow: "Serve With ShininChrist",
  titleLines: ["Many Ways to Serve.", "One Greater Purpose."],
  description:
    "Use your time, skills, resources and compassion to help advance the gospel and transform lives.",
  verse:
    "“Each of you should use whatever gift you have received to serve others, as faithful stewards of God’s grace.”",
  verseRef: "1 PETER 4:10 (NIV)",
  quote: [
    "“Not everyone can",
    "do everything,",
    "but everyone",
    "can do something.”",
  ],
  quoteSign: "Shining Christ through people like you.",
  image: "/images/serve/v4-hero.webp",
  primary: { text: "Become a Volunteer", url: "/serve/volunteer" },
  secondary: { text: "Learn More", url: "#ways-to-serve" },
};

export interface ServePillar {
  icon: ServeIconName;
  title: string;
  text: string;
}

export const SERVE_PILLARS: ServePillar[] = [
  { icon: "heart", title: "In My Heart", text: "A willing heart" },
  { icon: "home", title: "In My Home", text: "A helping hand" },
  { icon: "community", title: "In My Community", text: "A real difference" },
  { icon: "globe", title: "In My Nation", text: "A lasting impact" },
];

export const SERVE_TODAY = {
  title: "Serve Today",
  tagline: "Your Time. Your Skills. His Kingdom.",
  description:
    "At ShininChrist, we believe everyone has something to give — time, skills, resources, prayer or presence. Serving is a powerful way to shine Christ, meet real needs and make a lasting impact in our communities and nations.",
  image: "/images/serve/v2-serve-today.webp",
  primary: { text: "Become a Volunteer", url: "/serve/volunteer" },
  secondary: { text: "Explore Opportunities", url: "#ways-to-serve" },
};

export const SERVE_MOTTO = {
  label: "Our Serve Motto",
  text: "“Compassion in Action. Christ Through Us.”",
  note: "Serve one another humbly in love.",
  verse: "Galatians 5:13 (NIV)",
};

export interface WayToServe {
  id: string;
  icon: ServeIconName;
  title: string;
  description: string;
  image: string;
  cta: { text: string; url: string };
}

export const WAYS_HEADER = {
  title: "Ways You Can Serve",
  script: "Different gifts. One mission. A brighter tomorrow.",
};

export const WAYS_TO_SERVE: WayToServe[] = [
  {
    id: "time",
    icon: "volunteer",
    title: "Volunteer Your Time",
    description:
      "Serve on-site or remotely in media, administration, education, events, outreach and more.",
    image: "/images/serve/v2-way-time.webp",
    cta: { text: "View Opportunities", url: "/serve/volunteer" },
  },
  {
    id: "skills",
    icon: "skills",
    title: "Share Your Skills",
    description:
      "Use your professional or creative skills — e.g. IT, media, graphics, teaching, healthcare, counseling, translation, legal support and more.",
    image: "/images/serve/v2-way-skills.webp",
    cta: { text: "Offer Your Skills", url: "/serve/skills" },
  },
  {
    id: "in-kind",
    icon: "gift",
    title: "Give In-Kind",
    description:
      "Donate goods and supplies such as computers, vehicles, Bibles, books, school supplies, medical equipment, sealed medications and more.",
    image: "/images/serve/v2-way-inkind.webp",
    cta: { text: "See What’s Needed", url: "/serve/donate-in-kind" },
  },
  {
    id: "prayer",
    icon: "pray",
    title: "Serve in Prayer",
    description:
      "Commit to pray for ShininChrist, our members, communities and global mission work.",
    image: "/images/serve/v2-way-prayer.webp",
    cta: { text: "Join the Prayer Team", url: "/serve/prayer" },
  },
  {
    id: "field",
    icon: "field",
    title: "Serve in the Field",
    description:
      "Support local and global outreach, including missions, community service, evangelism, prison ministry and future children’s home initiatives.",
    image: "/images/serve/v2-way-field.webp",
    cta: { text: "Learn More", url: "/serve/field-missions" },
  },
];

export const SERVE_CTA = {
  scripture: "“Here am I. Send me.”",
  scriptureRef: "ISAIAH 6:8 (NIV)",
  image: "/images/serve/v3-sunrise.webp",
  title: "Ready to Make an Impact?",
  description:
    "Whether you can give a few hours, a special skill, needed supplies or ongoing support, there is a place for you at ShininChrist.",
  primary: { text: "Become a Volunteer", url: "/serve/volunteer" },
  secondary: { text: "Contact Our Serve Team", url: "/contact" },
  qrUrl: "https://shininchrist.org/serve/volunteer",
  qrTitle: "Scan to Volunteer",
  qrText: "Join. Serve. Shine.",
};
