export const WEEK_PAGE = {
  title: "This Week at ShininChrist Daily",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Daily", href: "/daily" },
    { label: "This Week", href: "/daily/this-week" },
  ],
  description: "Catch up or revisit this week’s Daily Faith Formation entries.",
  notice: "This content is for active ShininChrist members only.",
  cta: { text: "Join ShininChrist", url: "/join" },
};

export interface WeekEntryData {
  id: string;
  /** 0 = Monday … 6 = Sunday */
  dayIndex: number;
  title: string;
  image: string;
  imageAlt: string;
}

export const WEEK_ENTRIES: WeekEntryData[] = [
  {
    id: "mon",
    dayIndex: 0,
    title: "Walking in Faith",
    image: "/images/daily/week/mon.webp",
    imageAlt: "A path winding into the distance",
  },
  {
    id: "tue",
    dayIndex: 1,
    title: "Mercy Over Judgment",
    image: "/images/daily/week/tue.webp",
    imageAlt: "Hands in prayer",
  },
  {
    id: "wed",
    dayIndex: 2,
    title: "A Heart of Gratitude",
    image: "/images/daily/week/wed.webp",
    imageAlt: "A path winding into the distance",
  },
  {
    id: "thu",
    dayIndex: 3,
    title: "Wisdom for Everyday Life",
    image: "/images/daily/week/thu.webp",
    imageAlt: "An open Bible in warm light",
  },
  {
    id: "fri",
    dayIndex: 4,
    title: "Love in Action",
    image: "/images/daily/week/fri.webp",
    imageAlt: "Two people sitting together",
  },
  {
    id: "sat",
    dayIndex: 5,
    title: "Peace in Uncertain Times",
    image: "/images/daily/week/sat.webp",
    imageAlt: "Two people sitting together at sunset",
  },
  {
    id: "sun",
    dayIndex: 6,
    title: "Be Still and Know",
    image: "/images/daily/week/sun.webp",
    imageAlt: "A mountain view at sunrise",
  },
];
