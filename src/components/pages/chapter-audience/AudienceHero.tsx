import Image from "next/image";
import ButtonOutline from "@/components/button/ButtonOutline";
import ButtonSm from "@/components/button/ButtonSm";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import HeroTagline from "@/components/pages/typography/HeroTagline";
import QuoteText from "@/components/pages/typography/QuoteText";

export interface AudienceHeroData {
  titleLine1: string;
  titleLine2: string;
  tagline: string;
  quote: string;
  quoteReference: string;
  primaryCta: { text: string; url: string };
  videoCta: { text: string; url: string };
  image: string;
  imageAlt: string;
}

/** Hero shared by the Men, Women and Youth chapter pages. */
const AudienceHero = ({
  titleLine1,
  titleLine2,
  tagline,
  quote,
  quoteReference,
  primaryCta,
  videoCta,
  image,
}: AudienceHeroData) => (
  <section className="relative isolate overflow-hidden bg-primary-green-deep text-white-color">
    <Image
      src={image}
      alt=""
      fill
      priority
      sizes="100vw"
      className="-z-10 object-cover object-[75%_center]"
    />
    {/* Light shade so white text stays readable without hiding the photo */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0)_80%),linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_45%)] max-md:bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.6)_100%)]"
    />

    <div className="wrapper flex min-h-[560px] flex-col justify-center gap-10 py-10 sm:min-h-[620px] lg:min-h-[700px] lg:py-14">
      <div>
        <HeroHeading large>
          {titleLine1}
          <span className="block">{titleLine2}</span>
        </HeroHeading>
        <span
          aria-hidden="true"
          className="mt-5 block h-1 w-14 bg-gold-bright"
        />
        <HeroTagline className="mt-5 !font-semibold">{tagline}</HeroTagline>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <figure>
          <blockquote>
            <QuoteText className="!not-italic !font-sans lg:!text-lg">
              {quote}
            </QuoteText>
          </blockquote>
          <figcaption>
            <QuoteText
              as="span"
              className="block !not-italic !font-sans lg:!text-lg"
            >
              {quoteReference}
            </QuoteText>
          </figcaption>
        </figure>

        <div className="mt-6 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-[1.35fr_1fr] sm:gap-4">
          <ButtonSm
            url={primaryCta.url}
            text={primaryCta.text}
            bgColor="var(--gold-bright)"
            textColor="var(--primary-green-deep)"
            shape="rounded"
            className="w-full !text-lg"
            padding="py-4"
            paddingMd="md:py-4"
            paddingLg="lg:py-4"
          />
          <ButtonOutline
            url={videoCta.url}
            text={videoCta.text}
            borderColor="var(--white-color)"
            defaultTextColor="var(--white-color)"
            textColor="var(--primary-green-deep)"
            shape="rounded"
            className="w-full !bg-black/50 !py-4 !text-lg hover:!bg-white-color hover:!text-primary-green-deep"
          />
        </div>
      </div>
    </div>
  </section>
);

export default AudienceHero;
