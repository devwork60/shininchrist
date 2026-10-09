import WayCard from "./WayCard";
import MainHeading from "@/components/pages/typography/MainHeading";
import QuoteText from "@/components/pages/typography/QuoteText";
import { WAYS_HEADER, WAYS_TO_SERVE } from "@/constant/serveData";

const WaysSection = () => (
  <section id="ways-to-serve" className="scroll-mt-24 bg-cream py-10 lg:py-14">
    <div className="wrapper">
      <div className="grid grid-cols-1 items-end gap-2 lg:grid-cols-2">
        <MainHeading className="!text-primary-green lg:!leading-tight">
          {WAYS_HEADER.title}
        </MainHeading>
        <QuoteText className="!text-primary-green lg:text-right lg:!text-lg">
          {WAYS_HEADER.script}
        </QuoteText>
      </div>
      <span
        aria-hidden="true"
        className="mt-3 block h-px w-full bg-primary-gold/40"
      />

      <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
        {WAYS_TO_SERVE.map((way) => (
          <WayCard key={way.id} way={way} />
        ))}
      </div>
    </div>
  </section>
);

export default WaysSection;
