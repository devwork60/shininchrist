import type { UiIconName } from "@/components/icons/UiIcons";

export interface NavChild {
  label: string;
  href: string;
  /** Rich dropdown row: icon, one-line description and optional lock badge */
  icon?: UiIconName;
  description?: string;
  membersOnly?: boolean;
  /** Highlight the row with a coloured tint */
  highlight?: boolean;
  tone?: "green" | "gold";
}

export interface NavItem {
  label: string;
  href: string;
  /** Dropdown pages shown under this item */
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    children: [
      {
        label: "Home",
        href: "/",
        icon: "home",
        description: "Back to the top",
      },
      {
        label: "Vision & Mission",
        href: "/#vision-mission",
        icon: "eye",
        description: "Who we are and why",
      },
      {
        label: "Statement of Faith",
        href: "/#statement-of-faith",
        icon: "shield",
        description: "What we believe",
        highlight: true,
      },
      {
        label: "About the Founder",
        href: "/about/founder",
        icon: "user",
        description: "Opens a new page",
      },
    ],
  },
  {
    label: "Chapters",
    href: "/chapters",
    children: [
      { label: "Chapters", href: "/chapters" },
      { label: "Men", href: "/chapters/men" },
      { label: "Women", href: "/chapters/women" },
      { label: "Youth", href: "/chapters/youth" },
    ],
  },
  {
    label: "Academy",
    href: "/academy",
    children: [
      { label: "Academy", href: "/academy" },
      { label: "Courses", href: "/academy/courses" },
      { label: "Assessments", href: "/academy/assessments" },
      { label: "Teachers", href: "/academy/teachers" },
      { label: "Learner Support", href: "/academy/learner-support" },
    ],
  },
  {
    label: "Daily",
    href: "/daily",
    children: [
      {
        label: "Today",
        href: "/daily/today",
        icon: "calendarCheck",
        description: "Today’s Faith Formation",
        highlight: true,
      },
      {
        label: "This Week",
        href: "/daily/this-week",
        icon: "calendarWeek",
        description: "This Week’s Daily Entries",
        membersOnly: true,
      },
      {
        label: "Archive",
        href: "/daily/archive",
        icon: "archive",
        description: "Previous Daily Entries",
        membersOnly: true,
      },
    ],
  },
  {
    label: "Library",
    href: "/library",
    children: [
      {
        label: "Library",
        href: "/library",
        icon: "libraryBooks",
        description: "Member Resource Center",
        highlight: true,
      },
      {
        label: "Store",
        href: "/store",
        icon: "store",
        description: "Shop ShininChrist",
        highlight: true,
        tone: "gold",
      },
    ],
  },
  {
    label: "Serve",
    href: "/serve",
    children: [
      {
        label: "Overview",
        href: "/serve",
        icon: "globe",
        description: "Why We Serve",
      },
      {
        label: "Volunteer",
        href: "/serve/volunteer",
        icon: "users",
        description: "Time, Skills & Prayer",
      },
      {
        label: "Partner",
        href: "/serve/partner",
        icon: "handshake",
        description: "Organizations & Churches",
      },
      {
        label: "Donate In-Kind",
        href: "/serve/donate-in-kind",
        icon: "gift",
        description: "Supplies & Equipment",
      },
      {
        label: "Field & Missions",
        href: "/serve/field-missions",
        icon: "globe",
        description: "Local & Global Opportunities",
      },
    ],
  },
  {
    label: "Give",
    href: "/give",
    children: [
      {
        label: "Give",
        href: "/give",
        icon: "heartHands",
        description: "Main Giving Page",
      },
      {
        label: "Give Financially",
        href: "/give/financially",
        icon: "coins",
        description: "One-Time or Monthly",
      },
      {
        label: "Give In-Kind",
        href: "/give/in-kind",
        icon: "packageBox",
        description: "Supplies & Equipment",
      },
      {
        label: "Give Property & Major Assets",
        href: "/give/property-assets",
        icon: "home",
        description: "Land, Buildings, Vehicles, etc.",
      },
    ],
  },
];

export const LOGIN_CTA = { label: "Login", href: "/login" };
export const SEARCH_LINK = { label: "Search", href: "/search" };

export const JOIN_CTA = { label: "Join ShininChrist", href: "/join" };

/** True when the current path is this item or one of its sub-pages. */
export const isNavActive = (href: string, pathname: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
