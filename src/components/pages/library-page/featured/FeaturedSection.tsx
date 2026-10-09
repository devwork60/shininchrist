import BorderedSection from "@/components/common-components/BorderedSection";
import {
  FEATURED_DESCRIPTION,
  FEATURED_HEADING,
  FEATURED_RESOURCES,
} from "@/constant/featuredData";
import FeaturedCard from "./FeaturedCard";

const FeaturedSection = () => (
  <BorderedSection title={FEATURED_HEADING} description={FEATURED_DESCRIPTION}>
    <div className="mt-6 grid gap-x-4 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {FEATURED_RESOURCES.map(({ id, ...resource }) => (
        <FeaturedCard key={id} {...resource} />
      ))}
    </div>
  </BorderedSection>
);

export default FeaturedSection;
