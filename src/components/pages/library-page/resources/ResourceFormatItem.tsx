import clsx from "clsx";
import type { CSSProperties } from "react";
import ArrowLink from "@/components/common-components/ArrowLink";
import ResourceIcons from "@/components/icons/ResourceIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardHeading from "@/components/pages/typography/CardHeading";
import type { ResourceFormatData } from "@/constant/resourcesData";

const ResourceFormatItem = ({
  icon,
  title,
  description,
  accent,
  url,
  className,
}: Omit<ResourceFormatData, "id"> & { className?: string }) => (
  <article
    style={{ "--accent": accent } as CSSProperties}
    className={clsx(
      "row-span-4 grid grid-rows-subgrid justify-items-center px-4 text-center",
      className,
    )}
  >
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-white-color">
      <ResourceIcons name={icon} />
    </span>
    <CardHeading className="pt-3 !text-[var(--accent)]">{title}</CardHeading>
    <CardDescSm className="max-w-[230px] pt-1">{description}</CardDescSm>
    <div className="flex items-end pt-3">
      <ArrowLink text="Browse Now" url={url} color={accent} />
    </div>
  </article>
);

export default ResourceFormatItem;
