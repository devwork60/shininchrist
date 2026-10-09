import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import StepTitle from "@/components/pages/typography/StepTitle";
import type { FormationStepData } from "@/constant/dailyData";
import StepButtonIcon from "./StepButtonIcon";

const FormationStepCard = ({
  number,
  title,
  subtitle,
  image,
  imageAlt,
  body,
  quote,
  quoteReference,
  motto,
  button,
}: Omit<FormationStepData, "id">) => (
  <article className="row-span-4 mb-4 grid min-w-0 grid-rows-subgrid rounded-xl border border-primary-green/10 bg-white-color/70 p-3 shadow-sm">
    <header className="flex items-start gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-gold text-base font-bold text-white-color">
        {number}
      </span>
      <div>
        <StepTitle>{title}</StepTitle>
        <CardDescSm className="!leading-snug">{subtitle}</CardDescSm>
      </div>
    </header>

    <div className="relative mt-3 aspect-[3/2] w-full self-start overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 100vw"
        className="object-cover"
      />
    </div>

    <div className="pt-3">
      {quote && (
        <>
          <CardDescSm className="!italic !text-text-dark">{quote}</CardDescSm>
          <CardDescSm className="mt-2 !text-text-dark">
            {quoteReference}
          </CardDescSm>
        </>
      )}
      {body && <CardDescSm className="!text-text-dark">{body}</CardDescSm>}
      {motto && (
        <div className="mt-3 rounded-lg bg-primary-green/10 p-3 text-center">
          <CardDescSm className="!font-semibold !text-primary-green">
            Our Motto
          </CardDescSm>
          <CardDescSm className="!italic !text-text-dark">{motto}</CardDescSm>
        </div>
      )}
    </div>

    <div className="flex items-end pt-3">
      <ButtonSm
        url={button.url}
        text={button.text}
        bgColor="var(--primary-green)"
        textColor="var(--white-color)"
        shape="rounded"
        className="w-full whitespace-nowrap !px-3 !text-sm"
        icon={<StepButtonIcon icon={button.icon} />}
      />
    </div>
  </article>
);

export default FormationStepCard;
