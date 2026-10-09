import type { GiveIconName } from "@/components/icons/GiveIcons";

export const GIVE_HERO = {
  eyebrow: "Give to ShininChrist",
  titleLines: ["Sow Today.", "Change Lives Tomorrow."],
  description:
    "Your generosity helps advance the gospel, support education, care for communities and reach nations.",
  quote:
    "“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”",
  quoteRef: "2 CORINTHIANS 9:7 (NIV)",
  primary: { text: "Give Now", url: "#ways-to-give" },
  secondary: { text: "Learn More", url: "#ways-to-give" },
  badgeQuote: ["“Together", "we can do", "more.”"],
  badgeTagline: ["ShininChrist", "for a brighter", "tomorrow."],
  image: "/images/give/v2-hero.webp",
};

export interface GiveStripItem {
  id: string;
  icon: GiveIconName;
  lines: [string, string];
}

export const GIVE_STRIP: GiveStripItem[] = [
  { id: "gospel", icon: "heart", lines: ["Advance", "the Gospel"] },
  { id: "education", icon: "book", lines: ["Support", "Education"] },
  {
    id: "communities",
    icon: "community",
    lines: ["C.A.R.E. for", "Communities"],
  },
  { id: "nextgen", icon: "nextgen", lines: ["Reach the", "Next Generation"] },
  { id: "mission", icon: "globe", lines: ["Build", "Global Impact"] },
  { id: "mission", icon: "globe", lines: ["Build", "Global Impact"] },
];

export const WAYS_TO_GIVE_HEADER = {
  title: "Ways to Give",
  tagline: "Different gifts. One mission. A brighter tomorrow.",
  description:
    "At ShininChrist, we welcome your financial gifts, in-kind donations and major assets to help advance the gospel, provide educational support, care for communities and reach nations.",
};

export interface GiveWayCardData {
  id: string;
  icon: GiveIconName;
  title: string;
  headerDesc: string;
  tone: "green" | "gold";
  image: string;
  imageAlt: string;
  cta: { text: string; url: string };
  bullets: string[];
  footerNote?: string;
}

export const WAYS_TO_GIVE_CARDS: GiveWayCardData[] = [
  {
    id: "give-financially",
    icon: "coins",
    title: "Give Financially",
    headerDesc: "Support the mission through a one-time or recurring gift.",
    tone: "green",
    image: "/images/give/v2-financial.webp",
    imageAlt: "Laptop on a desk beside a potted plant",
    cta: { text: "Give Financially", url: "/give/financially" },
    bullets: [
      "One-time gifts",
      "Monthly/recurring giving",
      "Give where it is needed most",
      "Support a specific initiative (when available)",
      "Multiple secure payment options (see below)",
    ],
  },
  {
    id: "give-inkind",
    icon: "box",
    title: "Give In-Kind",
    headerDesc: "Donate goods, supplies and equipment to meet real needs.",
    tone: "gold",
    image: "/images/give/v2-inkind.webp",
    imageAlt: "Cardboard boxes of donated goods",
    cta: { text: "Give In-Kind", url: "/give/in-kind" },
    bullets: [
      "Bibles and ministry materials",
      "Computers and technology",
      "Educational and school supplies",
      "Clothing and personal care items",
      "Food and essentials",
      "Medical equipment and sealed medications",
      "Furniture and operational equipment",
      "Media and ministry equipment",
      "Other needed supplies",
    ],
  },
  {
    id: "give-property",
    icon: "home",
    title: "Give Property & Major Assets",
    headerDesc: "Partner through larger gifts that create lasting impact.",
    tone: "green",
    image: "/images/give/v2-property.webp",
    imageAlt: "Green field with a tree at sunset",
    cta: { text: "Offer a Major Gift", url: "/give/property-assets" },
    bullets: [
      "Land",
      "Buildings / Property",
      "Vehicles",
      "Computers and technology (in bulk)",
      "Major equipment",
      "Other significant assets",
    ],
    footerNote:
      "All major asset gifts are subject to review and acceptance by ShininChrist. Please complete the inquiry form so we can discuss next steps.",
  },
];

export const IMPACT_LIVES_SECTION = {
  title: "Your Gift Helps Impact Lives",
  items: [
    {
      id: "proclaiming",
      title: "Proclaiming the Gospel",
      subtext: "at home and abroad",
      image: "/images/give/v2-impact-gospel.webp",
    },
    {
      id: "expanding",
      title: "Expanding Educational Opportunities",
      subtext: "through ShininChrist Academy",
      image: "/images/give/v2-impact-education.webp",
    },
    {
      id: "caring",
      title: "Caring for Communities",
      subtext: "through C.A.R.E.",
      image: "/images/give/v2-impact-care.webp",
    },
    {
      id: "investing",
      title: "Investing in the Next Generation",
      subtext: "youth & children initiatives",
      image: "/images/give/v2-impact-nextgen.webp",
    },
    {
      id: "advancing",
      title: "Advancing Global Missions",
      subtext: "local and international",
      image: "/images/give/v2-impact-missions.webp",
    },
  ],
  quoteCard: {
    quote: "“For where your treasure is, there your heart will be also.”",
    reference: "MATTHEW 6:21 (NIV)",
    ctaText: "Give Today",
    ctaUrl: "#giving-options",
  },
};

export interface GivingStep {
  icon: GiveIconName;
  lines: [string, string];
}

export const GIVING_PROCESS = {
  title: "Giving Process",
  steps: [
    { icon: "checklist", lines: ["1. Choose", "a Giving Option"] },
    { icon: "pencil", lines: ["2. Complete", "the Form or Payment"] },
    { icon: "search", lines: ["3. Review", "(for in-kind & major gifts)"] },
    { icon: "checkCircle", lines: ["4. Confirmation", "and Next Steps"] },
  ] as GivingStep[],
  infoTitle: "Important Information",
  importantInfo: [
    "All gifts are voluntary and appreciated.",
    "In-kind and major asset donations are subject to review and acceptance by ShininChrist.",
    "Sealed, unexpired medications are accepted only with prior approval.",
    "Please do not send items without confirmation.",
    "We currently do not claim tax deductibility unless legally authorized in your jurisdiction.",
    "For questions, contact our Give Team.",
  ],
  needAssistance: {
    title: "Need Assistance?",
    subtitle: "Our Give Team is here to help.",
    cta: { text: "Contact Our Give Team", url: "mailto:give@shininchrist.org" },
    email: "give@shininchrist.org",
    whatsapp: "+1 (XXX) XXX-XXXX",
    footerText: "Let’s make a greater impact together.",
  },
};

export const PAYMENT_OPTIONS = {
  title: "Secure & Trusted Payment Options",
  subtitle:
    "Choose the option that works best for you. Available methods may vary by country.",
  methods: [
    {
      id: "paystack",
      name: "Paystack",
      role: "Primary for Nigeria",
      detail: "Cards, Bank Transfer, USSD, Mobile Money",
    },
    {
      id: "flutterwave",
      name: "Flutterwave",
      role: "Available in Africa",
      detail: "Cards, Bank Transfer, Mobile Money",
    },
    {
      id: "stripe",
      name: "Stripe",
      role: "Primary for U.S. & International",
      detail: "Cards, Apple Pay, Google Pay and more",
    },
    {
      id: "paypal",
      name: "PayPal",
      role: "Also available",
      detail: "International payments",
    },
    {
      id: "bank",
      name: "Direct Bank Transfer",
      role: "Available where enabled",
      detail: "Manual verification required",
    },
  ],
};

export const GIFT_DIFFERENCE = {
  title: "Your Gift Makes a Difference",
  points: [
    "Real people are helped.",
    "Communities are strengthened.",
    "Education is expanded.",
    "The gospel reaches new nations.",
    "Lives are transformed.",
  ],
  thanks: "Thank you for partnering with us!",
};

export const HOW_IT_WORKS = {
  title: "How It Works",
  steps: [
    { title: "Choose", text: "Select your giving option and amount." },
    { title: "Give", text: "Complete the secure payment or submission form." },
    {
      title: "Confirm",
      text: "Receive an email confirmation from ShininChrist.",
    },
    {
      title: "Impact",
      text: "Your gift helps advance our mission. Thank you!",
    },
  ],
};

export const GIVE_QR = {
  title: "Scan to Give",
  text: "Give. Serve. Shine.",
  // Opens the Give Financially page. Replace with the final live URL once the domain is connected.
  url: "https://shininchrist.org/give/financially",
};
