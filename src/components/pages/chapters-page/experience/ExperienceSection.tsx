import { EXPERIENCE_ITEMS } from "@/constant/chaptersData";
import ExperienceItem from "./ExperienceItem";

const ExperienceSection = () => (
  <section className="bg-cream pb-10 pt-4 lg:pb-14">
    <div className="wrapper grid gap-x-0 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {EXPERIENCE_ITEMS.map(({ id, ...item }) => (
        <ExperienceItem
          key={id}
          {...item}
          className="mb-10 xl:border-l xl:border-primary-gold/40 xl:first:border-l-0"
        />
      ))}
    </div>
  </section>
);

export default ExperienceSection;
