import dynamic from "next/dynamic";
import AcademyHero from "@/components/pages/academy-page/AcademyHero";
import { ACADEMY_QUOTE } from "@/constant/academyData";

const FieldsSection = dynamic(
  () => import("@/components/pages/academy-page/fields/FieldsSection"),
);

const BenefitsSection = dynamic(
  () => import("@/components/pages/academy-page/benefits/BenefitsSection"),
);

const QuoteBand = dynamic(
  () => import("@/components/common-components/QuoteBand"),
);

const AcademyPage = () => (
  <main className="flex-1">
    <AcademyHero />
    <FieldsSection />
    <BenefitsSection />
    <QuoteBand {...ACADEMY_QUOTE} />
  </main>
);

export default AcademyPage;
