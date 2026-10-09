import Image from "next/image";
import type { CSSProperties } from "react";
import ButtonOutline from "@/components/button/ButtonOutline";
import UiIcons from "@/components/icons/UiIcons";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import HeroTagline from "@/components/pages/typography/HeroTagline";
import type { DailyConnectData } from "@/constant/chapterDailyTypes";
import DailyBadge from "./DailyBadge";

/** "Connected to ShininChrist Daily" band shared by the Men, Women and Youth pages. */
const DailyConnectSection = ({
  heading,
  badgeTop,
  badgeBottom,
  description,
  cta,
  image,
  accent,
}: DailyConnectData) => (
  <section
    style={{ "--accent": accent } as CSSProperties}
    className="relative isolate overflow-hidden bg-[var(--accent)] text-white-color"
  >
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 md:block"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="50vw"
        className="object-cover object-right"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent)_45%,rgba(0,0,0,0)_85%)] md:bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent)_50%,rgba(18,57,122,0.35)_100%)]"
    />

    <div className="wrapper py-8 lg:py-10">
      <BlockHeading className="!text-white-color">{heading}</BlockHeading>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <DailyBadge top={badgeTop} bottom={badgeBottom} />

        <div className="max-w-md">
          <HeroTagline className="!font-medium">{description}</HeroTagline>
          <div className="mt-5">
            <ButtonOutline
              url={cta.url}
              text={cta.text}
              borderColor="var(--white-color)"
              defaultTextColor="var(--white-color)"
              textColor="var(--chapter-men)"
              shape="rounded"
              className="w-full sm:w-auto"
              iconRight={<UiIcons name="arrowRight" />}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DailyConnectSection;
