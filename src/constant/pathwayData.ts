import type { PathwayIconName } from "@/components/icons/PathwayIcons";

export interface PathwayCardData {
  id: string;
  icon: PathwayIconName;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  buttonText: string;
  url: string;
  /** Card body colour: brand green or brand gold */
  tone: "green" | "gold";
}

export const PATHWAY_CARDS: PathwayCardData[] = [
  {
    id: "chapters",
    icon: "chapters",
    title: "Join a Chapter",
    description: "Men, Women or Youth, there’s a place for you.",
    image: "/images/pathways/chapters-card2.webp",
    imageAlt: "People gathered together on a hillside",
    buttonText: "Explore Chapters",
    url: "/chapters",
    tone: "green",
  },
  {
    id: "academy",
    icon: "academy",
    title: "Explore the Academy",
    description:
      "Quality learning materials for all ages. Grow in knowledge and purpose.",
    image: "/images/pathways/academy-card2.webp",
    imageAlt: "Books and an open Bible on a desk",
    buttonText: "Explore Academy",
    url: "/academy",
    tone: "gold",
  },
  {
    id: "serve",
    icon: "serve",
    title: "Serve With Us",
    description: "Use your gifts to make an impact.",
    image: "/images/pathways/serve-card2.webp",
    imageAlt: "Hands joined together in service",
    buttonText: "Get Involved",
    url: "/serve",
    tone: "green",
  },
  {
    id: "give",
    icon: "give",
    title: "Give Generously",
    description: "Use your resources to support the mission and improve lives.",
    image: "/images/pathways/give-card2.webp",
    imageAlt: "A seedling growing from soil",
    buttonText: "Give Today",
    url: "/give",
    tone: "gold",
  },
];
