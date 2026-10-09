import type { FaithIconName } from "@/components/icons/FaithIcons";

export const FOUNDER_HEADING = "About Our Founder";
export const FOUNDER_PARAGRAPHS = [
  "Evangelist Mercy, named Georgia Melecia Morris at birth, is a Jamaican-born educator, missionary, and U.S. Army veteran, with a passion to see lives transformed through the life, teachings and blood of Jesus Christ.",
  "Through ShininChrist, she hopes to advance the gospel of Jesus Christ beyond the walls of the church.",
];
export const FOUNDER_PRIMARY_CTA = {
  text: "Learn More About Our Founder",
  url: "/about/founder",
};
export const FOUNDER_STORY_CTA = {
  text: "Watch Founder Story",
  url: "/about/founder#founder-video",
};

export const FAITH_HEADING = "Statement of Faith";

export interface FaithItemData {
  id: string;
  icon: FaithIconName;
  text: string;
}

export const FAITH_ITEMS: FaithItemData[] = [
  {
    id: "elohim",
    icon: "trinity",
    text: "We believe Elohim is God the Father (Yahweh, Adonai, Jehovah), God the Son (Emmanuel, Jesus Christ) and God the Holy Spirit (Genesis 1:1).",
  },
  {
    id: "bible",
    icon: "bible",
    text: "We believe the Bible is the inspired Word of God and our authority for faith and life.",
  },
  {
    id: "salvation",
    icon: "cross",
    text: "We believe in Salvation through Jesus Christ, the power of fasting, prayer, the fellowship of believers, and the Great Commission.",
  },
];
export const FAITH_CTA = {
  text: "Read Full Statement of Faith",
  url: "#statement-of-faith",
};
