import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import QuoteText from "@/components/pages/typography/QuoteText";
import { DAILY_BANNER } from "@/constant/dailyData";

const DailyBannerSection = () => (
  <section className="relative isolate overflow-hidden bg-primary-green-deep text-white-color">
    <Image
      src={DAILY_BANNER.image}
      alt=""
      fill
      sizes="100vw"
      className="-z-10 object-cover"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,30,20,0.55)_0%,rgba(7,30,20,0.2)_60%,rgba(7,30,20,0.45)_100%)]"
    />

    <div className="wrapper grid items-center gap-6 py-10 lg:grid-cols-[1.4fr_auto_1fr] lg:gap-10 lg:py-12">
      <div>
        <BlockHeading className="!text-white-color">
          {DAILY_BANNER.title}
        </BlockHeading>
        <CardDescSm className="mt-2 !text-white-color/95">
          {DAILY_BANNER.description}
        </CardDescSm>
      </div>

      <div className="lg:justify-self-center">
        <ButtonSm
          url={DAILY_BANNER.cta.url}
          text={DAILY_BANNER.cta.text}
          bgColor="var(--gold-bright)"
          textColor="var(--primary-green-deep)"
          shape="rounded"
          className="w-full sm:w-auto"
          iconRight={<UiIcons name="arrowRight" />}
        />
      </div>

      <figure className="lg:max-w-[320px] lg:justify-self-end">
        <blockquote>
          <QuoteText>{DAILY_BANNER.quote}</QuoteText>
        </blockquote>
        <figcaption>
          <QuoteText as="span" className="mt-1 block !not-italic">
            {DAILY_BANNER.quoteReference}
          </QuoteText>
        </figcaption>
      </figure>
    </div>
  </section>
);

export default DailyBannerSection;
