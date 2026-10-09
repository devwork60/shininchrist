import SectionHeader from "@/components/common-components/SectionHeader";
import {
  FRAMEWORK_CARDS,
  FRAMEWORK_DESCRIPTION,
  FRAMEWORK_HEADING,
} from "@/constant/frameworkData";
import FrameworkCard from "./FrameworkCard";

const FrameworkSection = () => (
  <section id="framework" className="bg-cream pb-12 pt-4 lg:pb-16 lg:pt-6">
    <div className="wrapper">
      <SectionHeader
        title={FRAMEWORK_HEADING}
        description={FRAMEWORK_DESCRIPTION}
        withLines
        accentDescription
      />

      <div className="mt-8 grid gap-x-6 gap-y-0 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
        {FRAMEWORK_CARDS.map(({ id, ...card }) => (
          <FrameworkCard key={id} {...card} />
        ))}
      </div>
    </div>
  </section>
);

export default FrameworkSection;
