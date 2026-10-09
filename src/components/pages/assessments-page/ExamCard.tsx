import clsx from "clsx";
import type { CSSProperties } from "react";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { ExamData } from "@/constant/assessmentsData";

const ExamCard = ({
  code,
  badge,
  name,
  accent,
  className,
}: Omit<ExamData, "id"> & { className?: string }) => (
  <article
    style={{ "--accent": accent } as CSSProperties}
    className={clsx(
      "row-span-3 grid grid-rows-subgrid justify-items-center rounded-xl border border-primary-green/10 bg-white-color px-4 py-5 text-center shadow-sm",
      className,
    )}
  >
    <span
      aria-hidden="true"
      className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[var(--accent)]/30 bg-[var(--accent)] font-sans text-sm font-extrabold tracking-wide text-white-color"
    >
      {badge}
    </span>
    <CardTitleSm className="pt-3 !text-primary-green-deep">{code}</CardTitleSm>
    <CardDescSm className="max-w-[200px] pt-1 !text-text-dark">
      {name}
    </CardDescSm>
  </article>
);

export default ExamCard;
