import Breadcrumb from "@/components/common-components/Breadcrumb";
import MainHeading from "@/components/pages/typography/MainHeading";
import { FORMATION_STEPS, TODAY_PAGE } from "@/constant/dailyData";
import StepAccordionItem from "./StepAccordionItem";
import TodaySidebar from "./TodaySidebar";

const TodaySection = () => (
  <section className="bg-cream py-10 lg:py-14">
    <div className="wrapper grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10 xl:grid-cols-[1fr_380px]">
      <div>
        <MainHeading as="h1" className="!text-primary-green">
          {TODAY_PAGE.title}
        </MainHeading>
        <div className="mt-3">
          <Breadcrumb items={TODAY_PAGE.breadcrumb} />
        </div>

        <div className="mt-6 space-y-3">
          {FORMATION_STEPS.map((step) => (
            <StepAccordionItem
              key={step.id}
              number={step.number}
              title={step.title}
              subtitle={step.subtitle}
              body={step.body}
              quote={step.quote}
              quoteReference={step.quoteReference}
              defaultOpen={step.number === 1}
            />
          ))}
        </div>
      </div>

      <TodaySidebar />
    </div>
  </section>
);

export default TodaySection;
