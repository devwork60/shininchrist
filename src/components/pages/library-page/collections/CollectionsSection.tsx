import SectionHeader from "@/components/common-components/SectionHeader";
import {
  COLLECTIONS,
  COLLECTIONS_DESCRIPTION,
  COLLECTIONS_HEADING,
} from "@/constant/libraryData";
import CollectionCard from "./CollectionCard";

const CollectionsSection = () => (
  <section id="collections" className="bg-cream pb-10 pt-[18px] lg:pb-12">
    <div className="wrapper">
      <SectionHeader
        variant="label"
        title={COLLECTIONS_HEADING}
        description={COLLECTIONS_DESCRIPTION}
      />

      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-0 sm:grid-cols-3 xl:grid-cols-6">
        {COLLECTIONS.map(({ id, ...collection }) => (
          <CollectionCard key={id} {...collection} />
        ))}
      </div>
    </div>
  </section>
);

export default CollectionsSection;
