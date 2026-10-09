import Image from "next/image";
import HeroCurve from "@/components/common-components/HeroCurve";
import VideoDialogButton from "@/components/common-components/VideoDialogButton";
import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import SubHeading from "@/components/pages/typography/SubHeading";
import {
  HERO_DESCRIPTION,
  HERO_PRIMARY_CTA,
  HERO_SECONDARY_CTA,
  HERO_TAGLINE,
  HERO_TITLE,
} from "@/constant/homeData";

const HeroSection = () => (
  <section className="relative isolate overflow-hidden bg-[var(--primary-green-deep)] text-[var(--white-color)]">
    {/* Background art — clean, high-resolution hero artwork */}
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%]"
    >
      <Image
        src="/images/hero-globe-clean.jpg"
        alt="ShininChrist Hero"
        fill
        priority
        sizes="(min-width: 768px) 62vw, 100vw"
        className="object-cover object-center"
      />
    </div>
    {/* Green fade gradient so text stays legible while image remains crisp */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--primary-green-deep)_0%,var(--primary-green-deep)_35%,rgba(18,38,28,0.7)_60%,rgba(18,38,28,0.1)_100%)] max-md:bg-[linear-gradient(180deg,rgba(18,38,28,0.92)_0%,rgba(18,38,28,0.75)_100%)]"
    />

    <div className="wrapper pb-28 pt-12 sm:pb-32 sm:pt-16 lg:pb-36 lg:pt-20">
      <div className="max-w-xl lg:max-w-[34rem]">
        <HeroHeading>{HERO_TITLE}</HeroHeading>
        <SubHeading as="p" className="mt-5 !text-primary-gold">
          {HERO_TAGLINE}
        </SubHeading>

        <div
          aria-hidden="true"
          className="mt-6 flex items-center gap-3 text-[var(--primary-gold)]"
        >
          <span className="h-px flex-1 bg-[var(--primary-gold)]/70" />
          <UiIcons name="sparkle" />
          <span className="h-px flex-1 bg-[var(--primary-gold)]/70" />
        </div>

        <Paragraph className="mt-6 max-w-md !text-[var(--white-color)]/95">
          {HERO_DESCRIPTION}
        </Paragraph>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonSm
            url={HERO_PRIMARY_CTA.url}
            text={HERO_PRIMARY_CTA.text}
            bgColor="var(--primary-gold)"
            textColor="var(--white-color)"
            icon={<UiIcons name="users" />}
            className="w-full sm:w-auto"
          />
          <VideoDialogButton
            src={HERO_SECONDARY_CTA.video}
            text={HERO_SECONDARY_CTA.text}
            icon={<UiIcons name="play" />}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>

    <HeroCurve />
  </section>
);

export default HeroSection;
