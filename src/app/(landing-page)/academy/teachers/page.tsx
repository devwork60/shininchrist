import dynamic from "next/dynamic";
import SimpleHero from "@/components/common-components/SimpleHero";
import { TEACHERS_HERO, TEACHERS_QUOTE } from "@/constant/teachersData";

// Below the fold — loaded as separate chunks
const TeachersIntroSection = dynamic(
  () => import("@/components/pages/teachers-page/TeachersIntroSection"),
);
const QuoteBand = dynamic(
  () => import("@/components/common-components/QuoteBand"),
);

const TeachersPage = () => (
  <main className="flex-1">
    <SimpleHero {...TEACHERS_HERO} />
    <TeachersIntroSection />
    <QuoteBand {...TEACHERS_QUOTE} />
  </main>
);

export default TeachersPage;
