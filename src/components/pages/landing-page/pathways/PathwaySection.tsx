import { PATHWAY_CARDS } from "@/constant/pathwayData";
import PathwayCard from "./PathwayCard";

const PathwaySection = () => (
  <section className="bg-cream pb-12 lg:pb-16">
    <div className="wrapper grid gap-x-6 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
      {PATHWAY_CARDS.map(({ id, ...card }) => (
        <PathwayCard key={id} {...card} />
      ))}
    </div>
  </section>
);

export default PathwaySection;
