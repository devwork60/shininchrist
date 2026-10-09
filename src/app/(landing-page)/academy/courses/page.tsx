import dynamic from "next/dynamic";
import SimpleHero from "@/components/common-components/SimpleHero";
import CourseResults from "@/components/pages/courses-page/CourseResults";
import { COURSES_HERO, COURSES_QUOTE } from "@/constant/coursesData";

// Below the fold — loaded as separate chunks
const BrowseSection = dynamic(
  () => import("@/components/pages/courses-page/BrowseSection"),
);
const QuoteBand = dynamic(
  () => import("@/components/common-components/QuoteBand"),
);

const CoursesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  return (
    <main className="flex-1">
      <SimpleHero {...COURSES_HERO} />
      {query && <CourseResults query={query} />}
      <BrowseSection defaultQuery={query} />
      <QuoteBand {...COURSES_QUOTE} />
    </main>
  );
};

export default CoursesPage;
