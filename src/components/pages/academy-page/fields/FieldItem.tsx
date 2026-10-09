import clsx from "clsx";
import type { CSSProperties } from "react";
import FieldIcons from "@/components/icons/FieldIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { FieldData } from "@/constant/academyData";

const FieldItem = ({
  icon,
  title,
  description,
  accent,
  className,
}: Omit<FieldData, "id"> & { className?: string }) => (
  <article
    style={{ "--accent": accent } as CSSProperties}
    className={clsx(
      "row-span-3 grid grid-rows-subgrid justify-items-center text-center",
      className,
    )}
  >
    <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[var(--accent)] text-white-color shadow-md ring-2 ring-[var(--accent)]/30 ring-offset-2 ring-offset-cream lg:h-[92px] lg:w-[92px]">
      <FieldIcons name={icon} />
    </span>
    <CardTitleSm className="max-w-[170px] pt-3 !text-primary-green-deep">
      {title}
    </CardTitleSm>
    <CardDescSm className="pt-1 !text-text-dark">
      {description.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </CardDescSm>
  </article>
);

export default FieldItem;
