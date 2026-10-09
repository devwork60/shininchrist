import type { FrameworkIconName } from "@/components/icons/FrameworkIcons";

export interface FrameworkCardData {
  id: string;
  icon: FrameworkIconName;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const FRAMEWORK_HEADING = "Our Framework";
export const FRAMEWORK_DESCRIPTION =
  "In My Heart. In My Home. In My Community. In My Nation";

export const FRAMEWORK_CARDS: FrameworkCardData[] = [
  {
    id: "heart",
    icon: "heart",
    title: "In My Heart",
    description:
      "We grow spiritually through God’s Word, prayer, fellowship, and the guidance of the Holy Spirit.",
    image: "/images/framework/heart-card.webp",
    imageAlt: "An open Bible on a table in warm light",
  },
  {
    id: "home",
    icon: "home",
    title: "In My Home",
    description:
      "We build Christ-centered homes, rooted in love, respect, and biblical values.",
    image: "/images/framework/home-card.webp",
    imageAlt: "A warm, welcoming family living room",
  },
  {
    id: "community",
    icon: "community",
    title: "In My Community",
    description:
      "We serve others with compassion, build strong relationships, and bring hope.",
    image: "/images/framework/community-card.webp",
    imageAlt: "A neighbourhood community at sunset",
  },
  {
    id: "nation",
    icon: "nation",
    title: "In My Nation",
    description:
      "We influence our nations for God by promoting love, righteousness, justice, and transformation.",
    image: "/images/framework/nation-card.webp",
    imageAlt: "A city skyline at sunrise",
  },
];
