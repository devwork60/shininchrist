export const ARCHIVE_PAGE = {
  title: "ShininChrist Daily Archive",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Daily", href: "/daily" },
    { label: "Archive", href: "/daily/archive" },
  ],
  description: "Explore previous Daily Faith Formation entries.",
  searchPlaceholder: "Search by keyword, scripture or topic…",
  notice: "This content is for active ShininChrist members only.",
  cta: { text: "Join ShininChrist", url: "/join" },
};

export interface ArchiveEntryData {
  id: string;
  title: string;
  /** Scripture reference shown under the title */
  scripture: string;
  /** Bible book, used by the scripture filter */
  book: string;
  topic: string;
  /** ISO date (yyyy-mm-dd) */
  date: string;
  image: string;
  imageAlt: string;
}

export const ARCHIVE_ENTRIES: ArchiveEntryData[] = [
  {
    id: "stillness",
    title: "Be Still and Know",
    scripture: "Psalm 46:10",
    book: "Psalms",
    topic: "Peace",
    date: "2025-04-13",
    image: "/images/daily/archive/stillness.webp",
    imageAlt: "A person standing on a hill at sunrise",
  },
  {
    id: "love",
    title: "Love in Action",
    scripture: "1 John 3:18",
    book: "1 John",
    topic: "Love",
    date: "2025-04-12",
    image: "/images/daily/archive/love.webp",
    imageAlt: "Hands held in prayer in warm light",
  },
  {
    id: "wisdom",
    title: "Wisdom for Everyday Life",
    scripture: "James 1:5",
    book: "James",
    topic: "Wisdom",
    date: "2025-04-11",
    image: "/images/daily/archive/wisdom.webp",
    imageAlt: "An open Bible on a table",
  },
  {
    id: "gratitude",
    title: "A Heart of Gratitude",
    scripture: "1 Thessalonians 5:18",
    book: "1 Thessalonians",
    topic: "Gratitude",
    date: "2025-04-10",
    image: "/images/daily/archive/gratitude.webp",
    imageAlt: "A person walking along a sunlit path",
  },
];
