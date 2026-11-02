import Breadcrumb from "@/components/common-components/Breadcrumb";
import MainHeading from "@/components/pages/typography/MainHeading";
import { TODAY_PAGE } from "@/constant/dailyData";
import { getDailyToday } from "@/lib/site-content";
import StepAccordionItem from "./StepAccordionItem";
import TodaySidebar from "./TodaySidebar";

/** The activities, their order, the verse and the watch / listen options all come from the admin-editable content. */
const TodaySection = async () => {
  const content = await getDailyToday();

  return (
    <section className="bg-cream py-10 lg:py-14">
      <div className="wrapper grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10 xl:grid-cols-[1fr_380px]">
        <div>
          <MainHeading as="h1" className="!text-primary-green">
            {content.title}
          </MainHeading>
          <div className="mt-3">
            <Breadcrumb items={TODAY_PAGE.breadcrumb} />
          </div>

          <div className="mt-6 space-y-3">
            {content.steps.map((step, index) => (
              <StepAccordionItem
                key={step.id}
                number={index + 1}
                step={step}
                defaultOpen={index === 0}
              />
            ))}
          </div>
        </div>

        <TodaySidebar content={content} />
      </div>
    </section>
  );
};

export default TodaySection;
