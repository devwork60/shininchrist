import { getDailyToday } from "@/lib/site-content";
import FormationHeader from "./FormationHeader";
import FormationStepCard from "./FormationStepCard";

/** The activities strip on /daily. It shows the same editable activities, in the same order, as the Today page. */
const FormationSection = async () => {
  const content = await getDailyToday();

  return (
    <section className="bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <FormationHeader verse={content.verse} reference={content.verseReference} />

        <div className="mt-8 grid gap-x-4 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {content.steps.map((step, index) => (
            <FormationStepCard key={step.id} number={index + 1} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationSection;
