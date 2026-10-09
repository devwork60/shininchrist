import BorderedSection from "@/components/common-components/BorderedSection";
import { STATEMENT_OF_FAITH } from "@/constant/homeAddonsData";
import FaithPillarCard from "./FaithPillarCard";

const StatementOfFaithSection = () => (
  <BorderedSection id={STATEMENT_OF_FAITH.id} title={STATEMENT_OF_FAITH.title}>
    <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
      {STATEMENT_OF_FAITH.pillars.map(({ id, ...pillar }) => (
        <FaithPillarCard key={id} {...pillar} />
      ))}
    </ul>
  </BorderedSection>
);

export default StatementOfFaithSection;
