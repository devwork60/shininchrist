import BlockHeading from "@/components/pages/typography/BlockHeading";
import { FIELDS } from "@/constant/academyData";
import { getAcademyCourses } from "@/lib/site-content";
import { CourseRow, listedCourses } from "./CourseResults";

/** Every course, grouped by field of learning. This is where "View All Courses" lands. */
const CourseCatalogue = async () => {
  const courses = listedCourses(await getAcademyCourses());

  return (
    <section id="all-courses" className="scroll-mt-24 bg-cream pb-12 lg:pb-16">
      <div className="wrapper-narrow">
        <BlockHeading className="text-center !text-primary-green-deep">
          All Courses
        </BlockHeading>
        {FIELDS.map((field) => {
          const inField = courses.filter((course) => course.field === field.id);
          if (inField.length === 0) return null;
          return (
            <div key={field.id} className="mt-8">
              <h3 className="font-heading text-lg font-semibold text-primary-green">
                {field.title}
              </h3>
              <ul className="mt-3 divide-y divide-primary-green/10 rounded-xl border border-primary-green/10 bg-white-color">
                {inField.map((course) => (
                  <CourseRow key={course.id} course={course} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CourseCatalogue;
