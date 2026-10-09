import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import HeroCurve from "@/components/common-components/HeroCurve";
import UiIcons from "@/components/icons/UiIcons";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import SubHeading from "@/components/pages/typography/SubHeading";
import { LIBRARY_HERO } from "@/constant/libraryData";

const LibraryHero = () => (
  <section className="relative isolate overflow-hidden bg-primary-green-deep text-white-color">
    {/* Background art — placeholder crop from the approved mockup */}
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 -z-10 w-full md:w-[66%]"
    >
      <Image
        src={LIBRARY_HERO.image}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 66vw, 100vw"
        className="object-cover object-left"
      />
    </div>
    {/* Green fade so text stays legible */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--primary-green-deep)_0%,var(--primary-green-deep)_30%,rgba(18,38,28,0.6)_48%,rgba(18,38,28,0)_70%)] max-md:bg-[linear-gradient(180deg,rgba(18,38,28,0.93)_0%,rgba(18,38,28,0.82)_100%)]"
    />

    <div className="wrapper pb-28 pt-12 sm:pb-32 sm:pt-16 lg:pb-36 lg:pt-16">
      <div className="max-w-xl lg:max-w-[34rem]">
        <HeroHeading>
          {LIBRARY_HERO.titleLine1}
          <span className="block text-gold-bright">
            {LIBRARY_HERO.titleLine2}
          </span>
        </HeroHeading>

        <SubHeading
          as="p"
          className="mt-4 !font-normal italic !text-gold-bright"
        >
          {LIBRARY_HERO.tagline}
        </SubHeading>

        <div
          aria-hidden="true"
          className="mt-4 flex max-w-[230px] items-center gap-3 text-gold-bright"
        >
          <span className="h-px flex-1 bg-gold-bright/70" />
          <UiIcons name="sparkle" />
          <span className="h-px flex-1 bg-gold-bright/70" />
        </div>

        <Paragraph className="mt-5 max-w-md !text-white-color/95">
          {LIBRARY_HERO.description}
        </Paragraph>

        <div className="mt-7">
          <ButtonSm
            url={LIBRARY_HERO.cta.url}
            text={LIBRARY_HERO.cta.text}
            bgColor="var(--primary-gold)"
            textColor="var(--white-color)"
            iconRight={<UiIcons name="arrowRight" />}
          />
        </div>
      </div>
    </div>

    <HeroCurve />
  </section>
);

export default LibraryHero;
