export const COURSES_HERO = {
  titleLines: ["Our", "Courses"],
  taglineLines: ["Explore. Learn. Grow.", "Make an Impact."],
  image: "/images/courses-hero.webp",
};

export const COURSES_BROWSE = {
  searchPlaceholder: "Search for a course…",
  searchLabel: "Search courses",
  heading: "Browse by Field of Learning",
  cta: { text: "View All Courses", url: "/academy/courses#all-courses" },
};

export const COURSES_QUOTE = {
  quote: "“Every learner has a purpose. Every course is a step toward it.”",
  author: "ShininChrist Academy",
};

export interface CourseSubject {
  id: string;
  title: string;
  /** Matches a field id in academyData FIELDS */
  field: string;
  fieldLabel: string;
}

// Subjects named in the client's Academy guide. They are listed as "Coming soon"
// until ShininChrist confirms which courses are actually available.
const subjects = (
  field: string,
  fieldLabel: string,
  titles: string[],
): CourseSubject[] =>
  titles.map((title) => ({
    id: `${field}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title,
    field,
    fieldLabel,
  }));

export const COURSE_SUBJECTS: CourseSubject[] = [
  ...subjects("theology", "Scripture & Theology", [
    "Bible Studies",
    "Christian Religious Studies",
    "Christian Theology",
    "Christian Living",
  ]),
  ...subjects("arts", "Arts & Humanities", [
    "English Language",
    "Literature in English",
    "History",
    "Geography",
  ]),
  ...subjects("science", "Mathematics & Sciences", [
    "Mathematics",
    "Further/Additional Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
    "General/Integrated Science",
  ]),
  ...subjects("social", "Social Sciences & Business", [
    "Social Studies",
    "Government/Civics",
    "Economics",
    "Business Studies",
    "Accounting",
  ]),
  ...subjects("tech", "Information & Digital Technology", [
    "Information Technology",
    "Computer Studies",
    "Digital Technologies",
    "Computer Science",
  ]),
  ...subjects("life", "Life Skills & Practical Skills", [
    "Financial Literacy",
    "Entrepreneurship",
    "Communication",
    "Leadership",
  ]),
];

export const COURSES_RESULTS = {
  heading: "Search Results",
  empty: "No courses match your search. Try another word or browse by field.",
  badge: "Coming soon",
};
