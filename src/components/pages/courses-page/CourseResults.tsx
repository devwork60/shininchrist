import BlockHeading from "@/components/pages/typography/BlockHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import { COURSES_RESULTS, COURSE_SUBJECTS } from "@/constant/coursesData";

/** Case-insensitive match on course title or field name. */
export const searchCourses = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return COURSE_SUBJECTS.filter((course) =>
    `${course.title} ${course.fieldLabel}`.toLowerCase().includes(q),
  );
};

const CourseResults = ({ query }: { query: string }) => {
  const results = searchCourses(query);

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
              <li
                key={course.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div>
                  <CardTitleSm className="!text-primary-green">
                    {course.title}
                  </CardTitleSm>
                  <CardDescSm>{course.fieldLabel}</CardDescSm>
                </div>
                <span className="shrink-0 rounded-full bg-primary-gold/15 px-3 py-1 text-xs font-semibold text-primary-gold">
                  {COURSES_RESULTS.badge}
                </span>
              </li>
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
