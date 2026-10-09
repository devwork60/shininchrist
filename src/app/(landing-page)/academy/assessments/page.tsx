import dynamic from "next/dynamic";
import SimpleHero from "@/components/common-components/SimpleHero";
import {
  ASSESSMENTS_HERO,
  ASSESSMENTS_QUOTE,
} from "@/constant/assessmentsData";

// Below the fold — loaded as separate chunks
const ExamsSection = dynamic(
  () => import("@/components/pages/assessments-page/ExamsSection"),
);
const QuoteBand = dynamic(
  () => import("@/components/common-components/QuoteBand"),
);

const AssessmentsPage = () => (
  <main className="flex-1">
    <SimpleHero {...ASSESSMENTS_HERO} />
    <ExamsSection />
    <QuoteBand {...ASSESSMENTS_QUOTE} />
  </main>
);

export default AssessmentsPage;
