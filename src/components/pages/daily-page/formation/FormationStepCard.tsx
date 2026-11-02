import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import StepTitle from "@/components/pages/typography/StepTitle";
import type { DailyStep } from "@/lib/site-content-schema";
import StepButtonIcon from "./StepButtonIcon";

/** The card shows a short preview; the full text opens on the Today page. */
const preview = (text: string) => text.split(/\n{2,}/)[0]?.trim() ?? "";

const FormationStepCard = ({
  number,
  step,
}: {
  number: number;
  step: DailyStep;
}) => {
  // "#" and unused anchors open the matching activity on the Today page instead of going nowhere.
  const url =
    step.buttonUrl.startsWith("/") || step.buttonUrl.startsWith("http")
      ? step.buttonUrl
      : `/daily/today#${step.id}`;
  const body = preview(step.body);

  return (
    <article className="row-span-4 mb-4 grid min-w-0 grid-rows-subgrid rounded-xl border border-primary-green/10 bg-white-color/70 p-3 shadow-sm">
      <header className="flex items-start gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-gold text-base font-bold text-white-color">
          {number}
        </span>
        <div>
          <StepTitle>{step.title}</StepTitle>
          {step.subtitle && (
            <CardDescSm className="!leading-snug">{step.subtitle}</CardDescSm>
          )}
        </div>
      </header>

      <div className="relative mt-3 aspect-[3/2] w-full self-start overflow-hidden rounded-lg">
        <Image
          src={step.image}
          alt={step.imageAlt}
          fill
          sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="pt-3">
        {step.quote && (
          <>
            <CardDescSm className="line-clamp-3 !italic !text-text-dark">
              {step.quote}
            </CardDescSm>
            {step.quoteReference && (
              <CardDescSm className="mt-2 !text-text-dark">
                {step.quoteReference}
              </CardDescSm>
            )}
          </>
        )}
        {body && (
          <CardDescSm className="line-clamp-4 !text-text-dark">{body}</CardDescSm>
        )}
        {step.motto && (
          <div className="mt-3 rounded-lg bg-primary-green/10 p-3 text-center">
            <CardDescSm className="!font-semibold !text-primary-green">
              Our Motto
            </CardDescSm>
            <CardDescSm className="!italic !text-text-dark">
              {step.motto}
            </CardDescSm>
          </div>
        )}
      </div>

      <div className="flex items-end pt-3">
        <ButtonSm
          url={url}
          text={step.buttonText}
          bgColor="var(--primary-green)"
          textColor="var(--white-color)"
          shape="rounded"
          className="w-full whitespace-nowrap !px-3 !text-sm"
          icon={<StepButtonIcon icon={step.icon} />}
        />
      </div>
    </article>
  );
};

export default FormationStepCard;
