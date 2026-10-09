import Image from "next/image";
import ButtonOutline from "@/components/button/ButtonOutline";
import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import HeroTagline from "@/components/pages/typography/HeroTagline";
import { CHAPTERS_CTA } from "@/constant/chaptersData";

const SIDE_PHOTO = "relative hidden w-[26%] max-w-[300px] shrink-0 md:block";

const ChaptersCtaSection = () => (
  <section className="bg-primary-green text-white-color">
    <div className="mx-auto flex max-w-[1920px] items-stretch">
      <div className={SIDE_PHOTO}>
        <Image
          src={CHAPTERS_CTA.leftImage}
          alt={CHAPTERS_CTA.leftImageAlt}
          fill
          sizes="(min-width: 768px) 26vw, 0px"
          className="object-cover"
        />
      </div>

      <div className="wrapper flex flex-1 flex-col items-center justify-center py-12 text-center md:mx-6 lg:py-16">
        <BlockHeading className="!text-white-color">
          {CHAPTERS_CTA.title}
        </BlockHeading>
        <CardDescSm className="mt-2 !text-white-color/90">
          {CHAPTERS_CTA.subtitle}
        </CardDescSm>
        <span
          aria-hidden="true"
          className="mt-4 block h-0.5 w-16 bg-gold-bright"
        />
        <HeroTagline className="mt-5 !font-semibold !text-gold-bright">
          {CHAPTERS_CTA.tagline}
        </HeroTagline>

        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <ButtonSm
            url={CHAPTERS_CTA.primaryCta.url}
            text={CHAPTERS_CTA.primaryCta.text}
            bgColor="var(--gold-bright)"
            textColor="var(--primary-green-deep)"
            shape="rounded"
            className="w-full sm:w-auto"
          />
          <ButtonOutline
            url={CHAPTERS_CTA.videoCta.url}
            text={CHAPTERS_CTA.videoCta.text}
            borderColor="var(--gold-bright)"
            defaultTextColor="var(--white-color)"
            textColor="var(--primary-green-deep)"
            shape="rounded"
            className="w-full sm:w-auto"
            iconRight={<UiIcons name="playSmall" />}
          />
        </div>
      </div>

      <div className={SIDE_PHOTO}>
        <Image
          src={CHAPTERS_CTA.rightImage}
          alt={CHAPTERS_CTA.rightImageAlt}
          fill
          sizes="(min-width: 768px) 26vw, 0px"
          className="object-cover"
        />
      </div>
    </div>
  </section>
);

export default ChaptersCtaSection;
