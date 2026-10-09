import ButtonOutline from "@/components/button/ButtonOutline";
import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import ScriptText from "@/components/pages/typography/ScriptText";
import { CHAPTERS_ABOUT, CHAPTER_PILLARS } from "@/constant/chaptersData";
import PillarItem from "./PillarItem";

const ChaptersAboutSection = () => (
  <section className="bg-cream py-10 lg:py-12">
    <div className="wrapper grid items-center gap-10 lg:grid-cols-[1.2fr_1.6fr] xl:grid-cols-[1.35fr_1.6fr_0.7fr] xl:gap-6">
      <div>
        <BlockHeading className="max-w-[360px]">
          {CHAPTERS_ABOUT.heading}
        </BlockHeading>
        <CardDescSm className="mt-3 max-w-[420px] !text-text-dark">
          {CHAPTERS_ABOUT.description}
        </CardDescSm>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonSm
            url={CHAPTERS_ABOUT.primaryCta.url}
            text={CHAPTERS_ABOUT.primaryCta.text}
            bgColor="var(--primary-green)"
            textColor="var(--white-color)"
            shape="rounded"
            className="w-full sm:w-auto"
            iconRight={<UiIcons name="arrowRight" />}
          />
          <ButtonOutline
            url={CHAPTERS_ABOUT.videoCta.url}
            text={CHAPTERS_ABOUT.videoCta.text}
            borderColor="var(--primary-green)"
            textColor="var(--white-color)"
            shape="rounded"
            className="w-full sm:w-auto"
            iconRight={
              <UiIcons name="playGreen" className="text-primary-green" />
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-0 sm:grid-cols-4">
        {CHAPTER_PILLARS.map(({ id, ...pillar }) => (
          <PillarItem key={id} {...pillar} />
        ))}
      </div>

      <div className="text-center lg:col-span-2 xl:col-span-1">
        <ScriptText className="-rotate-3">
          {CHAPTERS_ABOUT.scriptLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </ScriptText>
        <span
          aria-hidden="true"
          className="mx-auto mt-2 block h-0.5 w-44 -rotate-3 bg-gold-bright"
        />
      </div>
    </div>
  </section>
);

export default ChaptersAboutSection;
