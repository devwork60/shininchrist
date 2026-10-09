import BorderedSection from "@/components/common-components/BorderedSection";
import {
  RESOURCES_DESCRIPTION,
  RESOURCES_HEADING,
  RESOURCE_FORMATS,
} from "@/constant/resourcesData";
import ResourceFormatItem from "./ResourceFormatItem";

const ResourcesSection = () => (
  <BorderedSection
    title={RESOURCES_HEADING}
    description={RESOURCES_DESCRIPTION}
  >
    <div className="mt-6 grid gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
      {RESOURCE_FORMATS.map(({ id, ...format }) => (
        <ResourceFormatItem
          key={id}
          {...format}
          className="mb-8 lg:mb-0 lg:border-l lg:border-primary-gold/40 lg:first:border-l-0"
        />
      ))}
    </div>
  </BorderedSection>
);

export default ResourcesSection;
