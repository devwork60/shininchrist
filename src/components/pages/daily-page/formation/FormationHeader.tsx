import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import Eyebrow from "@/components/pages/typography/Eyebrow";
import QuoteText from "@/components/pages/typography/QuoteText";
import SubHeading from "@/components/pages/typography/SubHeading";
import { FORMATION_HEADER } from "@/constant/dailyData";

/** Today's date, formatted like "Sunday, April 13, 2025". */
const formatToday = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

const FormationHeader = () => (
  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
    <div className="max-w-2xl">
      <SubHeading as="h2" className="!font-bold !text-primary-green">
        {FORMATION_HEADER.heading}
      </SubHeading>
      <Eyebrow className="mt-2 !text-primary-gold">
        {FORMATION_HEADER.eyebrow}
      </Eyebrow>
      <CardDescSm className="mt-3 !text-text-dark">
        {FORMATION_HEADER.description}
      </CardDescSm>
    </div>

    <div className="flex flex-col gap-4 sm:flex-row sm:items-start lg:gap-8">
      <div className="sm:pt-3">
        <CardDescSm className="!text-text-dark">{formatToday()}</CardDescSm>
        <span
          aria-hidden="true"
          className="mt-2 block h-0.5 w-20 bg-primary-gold"
        />
      </div>

      <aside className="rounded-xl bg-primary-green px-6 py-4 text-center text-white-color shadow-md sm:min-w-[260px]">
        <p className="flex items-center justify-center gap-2 font-sans text-sm font-semibold text-gold-bright">
          <UiIcons name="leaf" />
          {FORMATION_HEADER.verseLabel}
        </p>
        <QuoteText className="mt-2 !not-italic lg:!text-xl">
          “{FORMATION_HEADER.verse}
        </QuoteText>
        <Eyebrow as="span" className="mt-2 block !text-white-color">
          {FORMATION_HEADER.verseReference}
        </Eyebrow>
      </aside>
    </div>
  </div>
);

export default FormationHeader;
