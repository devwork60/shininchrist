"use client";

import clsx from "clsx";
import { useId, useState } from "react";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import StepTitle from "@/components/pages/typography/StepTitle";
import type { FormationStepData } from "@/constant/dailyData";

type StepAccordionItemProps = Pick<
  FormationStepData,
  "number" | "title" | "subtitle" | "body" | "quote" | "quoteReference"
> & { defaultOpen?: boolean };

const StepAccordionItem = ({
  number,
  title,
  subtitle,
  body,
  quote,
  quoteReference,
  defaultOpen = false,
}: StepAccordionItemProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="rounded-xl bg-white-color/70 shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-gold text-xl font-bold text-white-color">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <StepTitle as="span" className="block">
            {title}
          </StepTitle>
          <CardDescSm as="span" className="block">
            {subtitle}
          </CardDescSm>
        </span>
        <UiIcons
          name={open ? "minus" : "plus"}
          className="text-primary-green"
        />
      </button>

      <div
        id={panelId}
        role="region"
        className={clsx(
          "grid transition-[grid-template-rows] duration-200",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-5 pl-[76px] sm:px-5 sm:pl-[84px]">
            {quote && (
              <CardDescSm className="!italic !text-text-dark">
                {quote}
              </CardDescSm>
            )}
            {quoteReference && (
              <CardDescSm className="mt-1 !text-text-dark">
                {quoteReference}
              </CardDescSm>
            )}
            {body && (
              <CardDescSm className="!text-text-dark">{body}</CardDescSm>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepAccordionItem;
