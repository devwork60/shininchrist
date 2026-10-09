import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import ButtonOutline from "@/components/button/ButtonOutline";
import Eyebrow from "@/components/pages/typography/Eyebrow";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import QuoteText from "@/components/pages/typography/QuoteText";
import { GIVE_HERO } from "@/constant/giveData";

const GiveHero = () => (
  <section className="relative isolate overflow-hidden bg-primary-green-deep text-white-color">
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Image
        src={GIVE_HERO.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_40%]"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,14,12,0.7)_0%,rgba(8,14,12,0.85)_100%)] md:bg-[linear-gradient(90deg,rgba(8,20,13,0.92)_0%,rgba(8,20,13,0.7)_38%,rgba(8,20,13,0.05)_70%)]"
    />

    <div className="wrapper grid grid-cols-1 gap-8 py-12 lg:min-h-[520px] lg:grid-cols-12 lg:items-center lg:py-16">
      <div className="lg:col-span-7">
        <Eyebrow>{GIVE_HERO.eyebrow}</Eyebrow>
        <HeroHeading compact className="mt-4">
          {GIVE_HERO.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </HeroHeading>
        <Paragraph className="mt-5 max-w-lg !text-white-color/90">
          {GIVE_HERO.description}
        </Paragraph>
        <span
          aria-hidden="true"
          className="mt-5 block h-1 w-14 bg-gold-bright"
        />
        <QuoteText className="mt-4 max-w-md">{GIVE_HERO.quote}</QuoteText>
        <p className="mt-2 text-sm font-semibold tracking-wide text-white-color">
          {GIVE_HERO.quoteRef}
        </p>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-4">
          <ButtonSm
            url={GIVE_HERO.primary.url}
            text={GIVE_HERO.primary.text}
            bgColor="var(--gold-bright)"
            textColor="var(--card-heading)"
            shape="rounded"
            iconRight={<span aria-hidden="true">→</span>}
          />
          <ButtonOutline
            url={GIVE_HERO.secondary.url}
            text={GIVE_HERO.secondary.text}
            borderColor="var(--white-color)"
            textColor="var(--primary-green)"
            shape="rounded"
          />
        </div>
      </div>

      <div className="hidden text-center lg:col-span-3 lg:col-start-10 lg:block">
        <QuoteText className="!font-heading !text-2xl !not-italic !font-semibold !leading-snug !text-text-dark">
          {GIVE_HERO.badgeQuote.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </QuoteText>
        <span
          aria-hidden="true"
          className="mx-auto mt-4 block h-1 w-16 bg-gold-bright"
        />
        <QuoteText className="mt-4 !text-base !font-semibold !leading-snug !text-text-dark">
          {GIVE_HERO.badgeTagline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </QuoteText>
      </div>
    </div>
  </section>
);

export default GiveHero;
