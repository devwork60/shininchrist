import dynamic from "next/dynamic";
import SimpleHero from "@/components/common-components/SimpleHero";
import {
  LEARNER_SUPPORT_HERO,
  LEARNER_SUPPORT_QUOTE,
} from "@/constant/learnerSupportData";

// Below the fold — loaded as separate chunks
const SupportServicesSection = dynamic(
  () =>
    import("@/components/pages/learner-support-page/SupportServicesSection"),
);
const QuoteBand = dynamic(
  () => import("@/components/common-components/QuoteBand"),
);

const LearnerSupportPage = () => (
  <main className="flex-1">
    <SimpleHero {...LEARNER_SUPPORT_HERO} />
    <SupportServicesSection />
    <QuoteBand {...LEARNER_SUPPORT_QUOTE} />
  </main>
);

export default LearnerSupportPage;
