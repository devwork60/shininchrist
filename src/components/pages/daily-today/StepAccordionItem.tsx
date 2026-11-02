"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import StepTitle from "@/components/pages/typography/StepTitle";
import { youtubeEmbedUrl } from "@/lib/daily-video";
import type { DailyStep } from "@/lib/site-content-schema";

type StepAccordionItemProps = {
  number: number;
  step: DailyStep;
  defaultOpen?: boolean;
};

/** A button only makes sense when it goes somewhere real (not "#" or an unused anchor). */
const isRealLink = (url: string) => url.startsWith("/") || url.startsWith("http");

const StepAccordionItem = ({
  number,
  step,
  defaultOpen = false,
}: StepAccordionItemProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const embed = step.videoUrl ? youtubeEmbedUrl(step.videoUrl) : null;
  const paragraphs = step.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      id={step.id}
      className="scroll-mt-24 rounded-xl bg-white-color/70 shadow-sm"
    >
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
            {step.title}
          </StepTitle>
          {step.subtitle && (
            <CardDescSm as="span" className="block">
              {step.subtitle}
            </CardDescSm>
          )}
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
          <div className="grid gap-3 px-4 pb-5 sm:px-5 md:pl-[84px]">
            {embed && open && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                  src={embed}
                  title={`${step.title} video`}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            )}

            {step.image && (
              <div className="relative aspect-[3/2] w-full max-w-md overflow-hidden rounded-lg">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(min-width: 768px) 28rem, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            {step.quote && (
              <CardDescSm className="!italic !text-text-dark">
                {step.quote}
              </CardDescSm>
            )}
            {step.quoteReference && (
              <CardDescSm className="!text-text-dark">
                {step.quoteReference}
              </CardDescSm>
            )}
            {paragraphs.map((paragraph, index) => (
              <CardDescSm
                key={index}
                className="whitespace-pre-line !text-text-dark"
              >
                {paragraph}
              </CardDescSm>
            ))}
            {step.motto && (
              <div className="rounded-lg bg-primary-green/10 p-3 text-center">
                <CardDescSm className="!font-semibold !text-primary-green">
                  Our Motto
                </CardDescSm>
                <CardDescSm className="!italic !text-text-dark">
                  {step.motto}
                </CardDescSm>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {step.videoUrl && !embed && (
                <Link
                  href={step.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-green px-4 py-2.5 text-sm font-semibold text-white-color hover:opacity-90"
                >
                  <UiIcons name="playSmall" />
                  Watch the video
                </Link>
              )}
              {isRealLink(step.buttonUrl) && (
                <Link
                  href={step.buttonUrl}
                  {...(step.buttonUrl.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex items-center gap-2 rounded-lg bg-gold-bright px-4 py-2.5 text-sm font-semibold text-primary-green-deep hover:opacity-90"
                >
                  {step.buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepAccordionItem;
