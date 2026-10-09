import type { AboutIconName } from "@/components/icons/AboutIcons";

export const VISION_MISSION = {
  id: "vision-mission",
  title: "Our Vision & Mission",
  vision: {
    icon: "eye" as AboutIconName,
    title: "Our Vision",
    text: "To see individuals, families, communities, and nations transformed through the life, teachings, and blood of Jesus Christ.",
  },
  mission: {
    icon: "target" as AboutIconName,
    title: "Our Mission",
    text: "To advance the gospel of Jesus Christ beyond the walls of the church through spiritual, educational, and cultural literacy; Christian community; compassionate service; media; and practical resources that equip people to grow in Christ and positively impact their homes, communities, and nations.",
  },
};

export interface FaithPillar {
  id: string;
  icon: AboutIconName;
  title: string;
  subtitle: string;
  text: string;
  reference: string;
}

/** Wording from "Statement of Faith Text Instructions" (client PDF). */
export const STATEMENT_OF_FAITH = {
  id: "statement-of-faith",
  title: "Statement of Faith",
  pillars: [
    {
      id: "bible",
      icon: "bible",
      title: "The Bible",
      subtitle: "",
      text: "We believe the Bible is the inspired Word of God, inerrant in the original manuscripts, and the final authority in all matters of faith and life.",
      reference: "",
    },
    {
      id: "elohim",
      icon: "trinity",
      title: "Elohim",
      subtitle: "God",
      text: "We believe in one God, Elohim, eternally existing in three Persons: God the Father, God the Son, and God the Holy Spirit. Elohim is Yahweh, Adonai, and Jehovah.",
      reference: "Matthew 28:19",
    },
    {
      id: "son",
      icon: "cross",
      title: "God the Son",
      subtitle: "Emmanuel, Jesus Christ",
      text: "We believe in the deity of Emmanuel, Jesus Christ, God the Son; His virgin birth, His sinless life, His death on the cross for our sins, His resurrection, and His ascension.",
      reference: "John 3:16; 1 Corinthians 15:3-4",
    },
    {
      id: "spirit",
      icon: "dove",
      title: "God the Holy Spirit",
      subtitle: "",
      text: "We believe the Holy Spirit dwells in believers, empowering them to live a Christ-centered life and to fulfill God’s purpose.",
      reference: "Acts 1:8",
    },
    {
      id: "salvation",
      icon: "crown",
      title: "Salvation",
      subtitle: "",
      text: "We believe salvation is by grace through faith in Jesus Christ alone, not by works, and is a gift from God.",
      reference: "Ephesians 2:8-9",
    },
    {
      id: "church",
      icon: "globe",
      title: "The Church",
      subtitle: "",
      text: "We believe in the unity of all believers, the importance of fellowship, worship, discipleship, and extending the Gospel to all nations.",
      reference: "Matthew 28:18-20",
    },
  ] as FaithPillar[],
};
