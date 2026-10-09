import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import ButtonOutline from "@/components/button/ButtonOutline";
import Eyebrow from "@/components/pages/typography/Eyebrow";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import QuoteText from "@/components/pages/typography/QuoteText";
import { SERVE_HERO } from "@/constant/serveData";

const ServeHero = () => (
  <section className="relative isolate overflow-hidden bg-primary-green-deep text-white-color">
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 -z-10 w-full md:w-[54%] md:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
    >
      <Image
        src={SERVE_HERO.image}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 54vw, 100vw"
        className="object-cover object-[center_20%]"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,14,12,0.7)_0%,rgba(8,14,12,0.85)_100%)] md:bg-[linear-gradient(90deg,rgba(8,14,12,0.35)_0%,rgba(8,14,12,0.1)_50%,rgba(8,14,12,0)_70%)]"
    />

    <div className="wrapper grid grid-cols-1 gap-8 py-12 lg:min-h-[480px] lg:grid-cols-12 lg:items-center lg:py-16">
      <div className="lg:col-span-7">
        <Eyebrow>{SERVE_HERO.eyebrow}</Eyebrow>
        <HeroHeading compact className="mt-4">
          {SERVE_HERO.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </HeroHeading>
        <Paragraph className="mt-5 max-w-lg !text-white-color/90">
          {SERVE_HERO.description}
        </Paragraph>
        <QuoteText className="mt-5 max-w-md">{SERVE_HERO.verse}</QuoteText>
        <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gold-bright">
          {SERVE_HERO.verseRef}
        </p>

        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-4">
          <ButtonSm
            url={SERVE_HERO.primary.url}
            text={SERVE_HERO.primary.text}
            bgColor="var(--gold-bright)"
            textColor="var(--white-color)"
            shape="rounded"
            iconRight={<span aria-hidden="true">→</span>}
          />
          <ButtonOutline
            url={SERVE_HERO.secondary.url}
            text={SERVE_HERO.secondary.text}
            borderColor="var(--white-color)"
            textColor="var(--primary-green)"
            shape="rounded"
          />
        </div>
      </div>

      <div className="hidden rounded-xl bg-white-color/85 p-6 shadow-lg backdrop-blur-sm lg:col-span-3 lg:col-start-10 lg:block">
        <QuoteText className="!text-xl !leading-snug !text-text-dark">
          {SERVE_HERO.quote.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </QuoteText>
        <span
          aria-hidden="true"
          className="mt-5 block h-1 w-20 bg-gold-bright"
        />
        <p className="mt-4 font-heading text-base italic text-text-dark">
          {SERVE_HERO.quoteSign}
        </p>
      </div>
    </div>
  </section>
);

export default ServeHero;
