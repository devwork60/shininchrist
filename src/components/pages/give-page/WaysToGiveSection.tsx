import GiveWayCard from "./GiveWayCard";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import { WAYS_TO_GIVE_CARDS, WAYS_TO_GIVE_HEADER } from "@/constant/giveData";

const WaysToGiveSection = () => (
  <section id="ways-to-give" className="scroll-mt-24 bg-cream py-10 lg:py-14">
    <div className="wrapper">
      <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-2 lg:gap-10">
        <div>
          <MainHeading className="!text-primary-green lg:!leading-tight">
            {WAYS_TO_GIVE_HEADER.title}
          </MainHeading>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-primary-gold">
            {WAYS_TO_GIVE_HEADER.tagline}
          </p>
        </div>
        <Paragraph className="lg:!text-base lg:!leading-7">
          {WAYS_TO_GIVE_HEADER.description}
        </Paragraph>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-3 lg:gap-y-0">
        {WAYS_TO_GIVE_CARDS.map((card) => (
          <GiveWayCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  </section>
);

export default WaysToGiveSection;
