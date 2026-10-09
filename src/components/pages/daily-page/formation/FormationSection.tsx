import { FORMATION_STEPS } from "@/constant/dailyData";
import FormationHeader from "./FormationHeader";
import FormationStepCard from "./FormationStepCard";

const FormationSection = () => (
  <section className="bg-cream py-10 lg:py-14">
    <div className="wrapper">
      <FormationHeader />

      <div className="mt-8 grid gap-x-4 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {FORMATION_STEPS.map(({ id, ...step }) => (
          <FormationStepCard key={id} {...step} />
        ))}
      </div>
    </div>
  </section>
);

export default FormationSection;
