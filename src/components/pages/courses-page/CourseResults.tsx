import Link from "next/link";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import { FIELDS } from "@/constant/academyData";
import { COURSES_RESULTS } from "@/constant/coursesData";
import { getAcademyCourses } from "@/lib/site-content";
import type { AcademyCourse } from "@/lib/site-content-schema";

/** Courses an admin has not hidden as drafts. */
export const listedCourses = (courses: AcademyCourse[]) =>
  courses.filter((course) => course.status !== "draft");

export const fieldTitle = (id: string) =>
  FIELDS.find((field) => field.id === id)?.title ?? "";

/** Case-insensitive match on course title or field name. */
export const searchCourses = (courses: AcademyCourse[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return listedCourses(courses).filter((course) =>
    `${course.title} ${fieldTitle(course.field)}`.toLowerCase().includes(q),
  );
};

/** One course row: a link when the course is open, a "Coming soon" tag when it is not. */
export const CourseRow = ({ course }: { course: AcademyCourse }) => {
  const open = course.status === "published";
  const body = (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div>
        <CardTitleSm className="!text-primary-green">{course.title}</CardTitleSm>
        <CardDescSm>{fieldTitle(course.field)}</CardDescSm>
      </div>
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
          open ? "bg-primary-green text-white-color" : "bg-primary-gold/15 text-primary-gold"
        }`}
      >
        {open ? "View course" : COURSES_RESULTS.badge}
      </span>
    </div>
  );
  return (
    <li>
      {open ? (
        <Link href={`/academy/courses/${course.id}`} className="block hover:bg-cream/60">
          {body}
        </Link>
      ) : (
        body
      )}
    </li>
  );
};

const CourseResults = async ({ query }: { query: string }) => {
  const results = searchCourses(await getAcademyCourses(), query);

  return (
    <section aria-live="polite" className="bg-cream pt-10 lg:pt-12">
      <div className="wrapper-narrow">
        <BlockHeading className="!text-primary-green-deep">
          {COURSES_RESULTS.heading}
        </BlockHeading>
        <CardDescSm className="mt-2 !text-text-dark">
          {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
        </CardDescSm>

        {results.length > 0 ? (
          <ul className="mt-5 divide-y divide-primary-green/10 rounded-xl border border-primary-green/10 bg-white-color">
            {results.map((course) => (
              <CourseRow key={course.id} course={course} />
            ))}
          </ul>
        ) : (
          <CardDescSm className="mt-6 !text-text-dark">
            {COURSES_RESULTS.empty}
          </CardDescSm>
        )}
      </div>
    </section>
  );
};

export default CourseResults;
