import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import { ASSESSMENTS_CTA, EXAMS } from "@/constant/assessmentsData";
import ExamCard from "./ExamCard";

const ExamsSection = () => (
  <section id="programs" className="bg-cream py-10 lg:py-14">
    <div className="wrapper">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-5 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMS.map(({ id, ...exam }) => (
          <ExamCard key={id} {...exam} className="mb-6 lg:mb-8" />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <ButtonSm
          url={ASSESSMENTS_CTA.url}
          text={ASSESSMENTS_CTA.text}
          bgColor="var(--gold-bright)"
          textColor="var(--primary-green-deep)"
          shape="rounded"
          className="w-auto"
          padding="px-8 py-3"
          paddingMd="md:px-8 md:py-3"
          paddingLg="lg:px-10 lg:py-3.5"
          iconRight={<UiIcons name="arrowRight" />}
        />
      </div>
    </div>
  </section>
);

export default ExamsSection;
