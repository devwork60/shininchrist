import Link from "next/link";
import ButtonOutline from "@/components/button/ButtonOutline";
import UiIcons from "@/components/icons/UiIcons";
import CardDesc from "@/components/pages/typography/CardDesc";
import SubHeading from "@/components/pages/typography/SubHeading";
import {
  FOUNDER_HEADING,
  FOUNDER_PARAGRAPHS,
  FOUNDER_PRIMARY_CTA,
  FOUNDER_STORY_CTA,
} from "@/constant/founderFaithData";

const AboutFounder = () => (
  <div>
    <SubHeading>{FOUNDER_HEADING}</SubHeading>
    <span
      aria-hidden="true"
      className="mt-2 block h-0.5 w-12 bg-primary-gold"
    />

    <div className="mt-5 space-y-2">
      {FOUNDER_PARAGRAPHS.map((paragraph) => (
        <CardDesc key={paragraph} className="!text-text-dark">
          {paragraph}
        </CardDesc>
      ))}
    </div>

    <div className="mt-6 flex flex-col items-start gap-4">
      <ButtonOutline
        url={FOUNDER_PRIMARY_CTA.url}
        text={FOUNDER_PRIMARY_CTA.text}
        borderColor="var(--primary-green)"
        textColor="var(--white-color)"
        shape="rounded"
        icon={<UiIcons name="user" />}
      />
      <Link
        href={FOUNDER_STORY_CTA.url}
        className="inline-flex items-center gap-2.5 pl-2 text-sm font-semibold text-text-dark transition-colors hover:text-primary-green lg:text-base"
      >
        <UiIcons name="playGreen" className="text-primary-green" />
        {FOUNDER_STORY_CTA.text}
      </Link>
    </div>
  </div>
);

export default AboutFounder;
