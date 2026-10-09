export const STORE_HERO = {
  badge: "STORE (PUBLIC)",
  subbadge: "(Open to Everyone)",
  title: "ShininChrist Store",
  tagline: "Books. Music. Merchandise. Resources. Shop with Purpose.",
  searchPlaceholder: "Search products...",
  image: "/images/library-hero.webp",
};

export type StoreCategory =
  "Books" | "Music" | "Merchandise" | "Study Materials" | "Digital Products";

export const STORE_TAGS: ("All" | StoreCategory)[] = [
  "All",
  "Books",
  "Music",
  "Merchandise",
  "Study Materials",
  "Digital Products",
];

/**
 * Sub-sections inside each category, in display order. Groups with no product yet still show as
 * "coming soon" so ShininChrist can see where new items go (client edit list, items 4-9).
 * Adding a product = adding one entry to STORE_PRODUCTS (later: from the admin panel).
 */
export const STORE_GROUPS: Partial<Record<StoreCategory, string[]>> = {
  Music: ["Album", "Singles"],
  "Study Materials": [
    "WAEC",
    "UTME/JAMB",
    "NECO",
    "GCE",
    "CXC/CSEC",
    "CAPE",
    "HEART/NSTA",
  ],
  "Digital Products": [
    "Christian Books & Spiritual Resources",
    "Educational Resources",
    "Children’s Digital Products",
    "Audio, Video & Creative Products",
  ],
};

export interface StoreProduct {
  slug: string;
  title: string;
  subtitle: string;
  category: StoreCategory;
  group?: string;
  type: string;
  /** Shown as written, e.g. "$19.99". Leave out until ShininChrist confirms the price. */
  price?: string;
  /** First image is the card image; extra images appear on the product page. */
  images: string[];
  description: string;
  /** Link to a playable preview (music only). Empty until ShininChrist supplies it. */
  previewUrl?: string;
}

/** Where music can be streamed or bought. URLs come from ShininChrist; empty ones show "coming soon". */
export const STREAMING_LINKS = [
  { label: "Amazon Music", url: "" },
  { label: "YouTube", url: "" },
  { label: "YouTube Music", url: "" },
  { label: "Spotify", url: "" },
  { label: "Apple Music", url: "" },
];

const SINGLE_PRICE = "$1.49";
const album = "Mercy, Amen";

const single = (slug: string, title: string, image: string): StoreProduct => ({
  slug,
  title,
  subtitle: `Single from the album “${album}”`,
  category: "Music",
  group: "Singles",
  type: "Digital Single",
  price: SINGLE_PRICE,
  images: [`/images/store/${image}.webp`],
  description: `“${title}”, a single from Georgia “Mercy” Morris’ album “${album}”. Original gospel music.`,
  previewUrl: "",
});

export const STORE_PRODUCTS: StoreProduct[] = [
  // Books
  {
    slug: "nkjv-bible",
    title: "NKJV Bible",
    subtitle: "New King James Version · Black and Brown",
    category: "Books",
    type: "Book (Print)",
    price: "$15",
    images: ["/images/store/book-nkjv-bible.webp"],
    description:
      "The New King James Version Bible, available in black and brown.",
  },
  {
    slug: "outside-the-garden",
    title: "Outside the Garden",
    subtitle: "Life Beyond Eden and the Longing for Home",
    category: "Books",
    type: "Book",
    price: "$19.99",
    images: ["/images/store/book-outside-the-garden.webp"],
    description:
      "“Outside the Garden: Life Beyond Eden and the Longing for Home” by Georgia “Mercy” Morris, M.Ed., M.Ts.",
  },
  {
    slug: "shininchrist-tracts",
    title: "ShininChrist Tracts",
    subtitle: "What It Means to Shine Christ",
    category: "Books",
    type: "Written Material",
    price: "$10",
    images: ["/images/store/book-tracts.webp"],
    description:
      "ShininChrist tracts that share what it means to shine Christ in our hearts, homes, communities, and nations.",
  },

  // Music: album
  {
    slug: "mercy-amen",
    title: "Mercy, Amen",
    subtitle: "Original Gospel Music · Full Album",
    category: "Music",
    group: "Album",
    type: "Digital Album",
    price: "$14.99",
    images: ["/images/store/album-mercy-amen.webp"],
    description:
      "The album “Mercy, Amen” by Georgia “Mercy” Morris. Original gospel music with ten songs.",
    previewUrl: "",
  },
  // Music: singles (in the client's order)
  single("i-came-back", "I Came Back", "single-i-came-back"),
  single("still-god", "Still God", "single-still-god"),
  single(
    "beyond-the-ordinary",
    "Beyond the Ordinary",
    "single-beyond-the-ordinary",
  ),
  single("step-into-my-boat", "Step Into My Boat", "single-step-into-my-boat"),
  single(
    "from-nothing-to-something",
    "From Nothing to Something",
    "single-from-nothing-to-something",
  ),
  single(
    "lets-life-in-jesus",
    "Let’s “Life” in Jesus",
    "single-lets-life-in-jesus",
  ),
  single("cry-unto-the-lord", "Cry Unto the Lord", "single-cry-unto-the-lord"),
  single("whoop-de-doo", "Whoop-de-doo! Did You Know?", "single-whoop-de-doo"),
  single(
    "do-you-really-know",
    "Do You Really Know?",
    "single-do-you-really-know",
  ),
  single(
    "you-found-me-there",
    "You Found Me There",
    "single-you-found-me-there",
  ),

  // Merchandise
  {
    slug: "shininchrist-tshirts",
    title: "ShininChrist T-Shirts",
    subtitle: "Available in black, white and green",
    category: "Merchandise",
    type: "Apparel",
    price: "$20",
    images: [
      "/images/store/tshirts-green.webp",
      "/images/store/tshirts-black-white.webp",
    ],
    description: "ShininChrist T-shirts in black, white and green.",
  },
  {
    slug: "shininchrist-wristbands",
    title: "ShininChrist Wristbands",
    subtitle: "Green, white and black",
    category: "Merchandise",
    type: "Accessory",
    price: "$5",
    images: ["/images/store/wristbands.webp"],
    description: "ShininChrist wristbands.",
  },
  {
    slug: "shininchrist-cups",
    title: "ShininChrist Cups",
    subtitle: "White and black mugs",
    category: "Merchandise",
    type: "Drinkware",
    price: "$10",
    images: ["/images/store/mugs.webp"],
    description: "ShininChrist cups.",
  },
  {
    slug: "shininchrist-journals",
    title: "ShininChrist Journals",
    subtitle: "Black, green and yellow",
    category: "Merchandise",
    type: "Stationery",
    price: "$15",
    images: ["/images/store/journals.webp"],
    description: "ShininChrist journals.",
  },

  // Study Materials (prices to be confirmed by ShininChrist)
  {
    slug: "waec-workbook",
    title: "WAEC Workbook",
    subtitle: "Prepare. Practice. Excel. Go Further.",
    category: "Study Materials",
    group: "WAEC",
    type: "Workbook",
    images: ["/images/store/workbook-waec.webp"],
    description:
      "ShininChrist WAEC workbook with past questions, subject tutorials, exam strategies and mentorship support.",
  },
  {
    slug: "jamb-utme-workbook",
    title: "JAMB/UTME Workbook",
    subtitle: "Prepare. Practice. Excel. Go Further.",
    category: "Study Materials",
    group: "UTME/JAMB",
    type: "Workbook",
    images: ["/images/store/workbook-jamb-utme.webp"],
    description:
      "ShininChrist JAMB/UTME workbook with past questions, subject tutorials, exam strategies and mentorship support.",
  },
  {
    slug: "neco-workbook",
    title: "NECO Workbook",
    subtitle: "Prepare. Practice. Excel. Go Further.",
    category: "Study Materials",
    group: "NECO",
    type: "Workbook",
    images: ["/images/store/workbook-neco.webp"],
    description:
      "ShininChrist NECO workbook with past questions, subject tutorials, exam strategies and mentorship support.",
  },
  {
    slug: "cxc-workbook",
    title: "CXC/CSEC Workbook",
    subtitle: "Prepare. Practice. Excel. Go Further.",
    category: "Study Materials",
    group: "CXC/CSEC",
    type: "Workbook",
    images: ["/images/store/workbook-cxc.webp"],
    description:
      "ShininChrist CXC/CSEC workbook with past questions, subject tutorials, exam strategies and mentorship support.",
  },

  // Digital Products (one starter item per category; more are added later)
  {
    slug: "christian-ebooks",
    title: "Christian eBooks & Spiritual Resources",
    subtitle: "Books, devotionals and study guides",
    category: "Digital Products",
    group: "Christian Books & Spiritual Resources",
    type: "Digital Download",
    images: ["/images/store/christian-books.webp"],
    description:
      "Christian eBooks, devotionals, Bible study guides and other spiritual resources. More titles will be added.",
  },
  {
    slug: "waec-study-guides",
    title: "WAEC Study Guides",
    subtitle: "Digital study guide",
    category: "Digital Products",
    group: "Educational Resources",
    type: "Digital Download",
    images: ["/images/store/workbook-waec.webp"],
    description:
      "WAEC study guides in digital form. NECO, JAMB/UTME, CXC and CAPE guides will be added.",
  },
  {
    slug: "jesus-and-me-devotionals",
    title: "Jesus & Me Devotionals",
    subtitle: "Devotionals for children",
    category: "Digital Products",
    group: "Children’s Digital Products",
    type: "Digital Download",
    images: [],
    description:
      "Jesus & Me devotionals for children. Illustrated Bible storybooks, Bible puzzles and games will be added.",
  },
  {
    slug: "gospel-music-downloads",
    title: "Gospel Music Downloads",
    subtitle: "“Mercy, Amen” and its singles",
    category: "Digital Products",
    group: "Audio, Video & Creative Products",
    type: "Digital Download",
    images: ["/images/store/album-mercy-amen.webp"],
    description:
      "Gospel music downloads, including the album “Mercy, Amen” and its singles.",
  },
  {
    slug: "audio-devotionals",
    title: "Audio Devotionals",
    subtitle: "Listen and be strengthened",
    category: "Digital Products",
    group: "Audio, Video & Creative Products",
    type: "Digital Download",
    images: [],
    description: "Audio devotionals from ShininChrist.",
  },
];

export const findProduct = (slug: string) =>
  STORE_PRODUCTS.find((product) => product.slug === slug);

export const STORE_IMPACT_BANNER = {
  heading: "Every Purchase Supports Shining Christ in Our Communities.",
  subheading: "Shop. Support. Make an Impact.",
};
