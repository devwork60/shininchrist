import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import Eyebrow from "@/components/pages/typography/Eyebrow";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import HeroTagline from "@/components/pages/typography/HeroTagline";
import Paragraph from "@/components/pages/typography/Paragraph";
import QuoteText from "@/components/pages/typography/QuoteText";
import { DAILY_HERO } from "@/constant/dailyData";

const DailyHero = () => (
  <section className="relative isolate overflow-hidden bg-primary-green-deep text-white-color">
    <Image
      src={DAILY_HERO.image}
      alt=""
      fill
      priority
      sizes="100vw"
      className="-z-10 object-cover object-[70%_center]"
    />
    {/* Dark shade on the left so the text stays readable */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,30,20,0.9)_0%,rgba(7,30,20,0.6)_45%,rgba(7,30,20,0.1)_80%)] max-md:bg-[linear-gradient(180deg,rgba(7,30,20,0.75)_0%,rgba(7,30,20,0.9)_100%)]"
    />

    <div className="wrapper flex min-h-[480px] flex-col justify-center gap-10 py-12 lg:min-h-[520px] lg:flex-row lg:items-center lg:justify-between lg:py-14">
      <div className="max-w-2xl">
        <Eyebrow>{DAILY_HERO.eyebrow}</Eyebrow>
        <HeroHeading compact className="mt-4">
          {DAILY_HERO.titleLine1}
          <span className="block">{DAILY_HERO.titleLine2}</span>
        </HeroHeading>
        <HeroTagline className="mt-5 !font-medium">
          {DAILY_HERO.tagline}
        </HeroTagline>
        <Paragraph className="mt-5 max-w-lg !text-white-color/95">
          {DAILY_HERO.description}
        </Paragraph>
        <div className="mt-7">
          <ButtonSm
            url={DAILY_HERO.cta.url}
            text={DAILY_HERO.cta.text}
            bgColor="var(--gold-bright)"
            textColor="var(--primary-green-deep)"
            shape="rounded"
            className="w-full sm:w-auto"
            iconRight={<UiIcons name="arrowRight" />}
          />
        </div>
      </div>

      <figure className="max-w-[300px] lg:text-center">
        <blockquote>
          <QuoteText className="lg:!text-2xl">{DAILY_HERO.quote}</QuoteText>
        </blockquote>
        <figcaption>
          <Eyebrow as="span" className="mt-3 block !text-white-color">
            {DAILY_HERO.quoteReference}
          </Eyebrow>
        </figcaption>
      </figure>
    </div>
  </section>
);

export default DailyHero;
