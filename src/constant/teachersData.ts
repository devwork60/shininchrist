import type { TeacherIconName } from "@/components/icons/TeacherIcons";

export const TEACHERS_HERO = {
  titleLines: ["Our", "Teachers"],
  taglineLines: ["Experienced. Passionate.", "Committed to Your Growth."],
  image: "/images/teachers-hero-v2.webp",
};

export const TEACHERS_INTRO = {
  heading: "Meet Our Teachers",
  description:
    "Learn from dedicated educators who are committed to your success.",
};

export interface TeacherPointData {
  id: string;
  icon: TeacherIconName;
  title: string;
  description: string;
}

export const TEACHER_POINTS: TeacherPointData[] = [
  {
    id: "profiles",
    icon: "profiles",
    title: "Teacher Profiles",
    description: "View our teachers by subject and field.",
  },
  {
    id: "expertise",
    icon: "expertise",
    title: "Areas of Expertise",
    description: "Discover their teaching and professional experience.",
  },
  {
    id: "mission",
    icon: "mission",
    title: "A Shared Mission",
    description: "Christ-centered education for real impact.",
  },
  {
    id: "join",
    icon: "join",
    title: "Join Our Team",
    description:
      "Interested in teaching with us? See opportunities on our Serve page.",
  },
];

export const TEACHERS_CTA = {
  text: "Meet Our Teachers",
  url: "#teacher-profiles",
};

export const TEACHERS_QUOTE = {
  quote: "“Great teachers help shape greater generations.”",
  author: "ShininChrist Academy",
};
