import Image from "next/image";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import HeroTagline from "@/components/pages/typography/HeroTagline";
import QuoteText from "@/components/pages/typography/QuoteText";
import { CHAPTERS_HERO } from "@/constant/chaptersData";

const ChaptersHero = () => (
  <section className="relative isolate overflow-hidden bg-primary-green-deep text-white-color">
    {/* Background photo */}
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 -z-10 w-full md:w-[72%]"
    >
      <Image
        src={CHAPTERS_HERO.image}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 72vw, 100vw"
        className="object-cover object-[center_28%]"
      />
    </div>
    {/* Dark fade on the left so the text stays readable */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,38,28,0.92)_0%,rgba(18,38,28,0.75)_32%,rgba(18,38,28,0.25)_60%,rgba(18,38,28,0)_80%)] max-md:bg-[linear-gradient(180deg,rgba(18,38,28,0.7)_0%,rgba(18,38,28,0.88)_100%)]"
    />

    <div className="wrapper flex min-h-[320px] flex-col justify-end gap-8 py-10 sm:min-h-[360px] lg:min-h-[380px] lg:flex-row lg:items-end lg:justify-between lg:py-12">
      <div className="max-w-2xl">
        <HeroHeading>{CHAPTERS_HERO.title}</HeroHeading>
        <span
          aria-hidden="true"
          className="mt-4 block h-1 w-14 bg-gold-bright"
        />
        <HeroTagline className="mt-4">{CHAPTERS_HERO.taglineMain}</HeroTagline>
        <HeroTagline className="mt-3">{CHAPTERS_HERO.taglineSub}</HeroTagline>
      </div>

      <figure className="max-w-[400px] lg:text-center">
        <blockquote>
          <QuoteText>{CHAPTERS_HERO.quote}</QuoteText>
        </blockquote>
        <figcaption>
          <QuoteText as="span" className="mt-2 block !not-italic !text-xs">
            {CHAPTERS_HERO.quoteReference}
          </QuoteText>
        </figcaption>
      </figure>
    </div>
  </section>
);

export default ChaptersHero;
