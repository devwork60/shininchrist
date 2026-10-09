import Image from "next/image";
import type { CSSProperties } from "react";
import ArrowLink from "@/components/common-components/ArrowLink";
import CollectionIcons from "@/components/icons/CollectionIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardHeading from "@/components/pages/typography/CardHeading";
import type { CollectionData } from "@/constant/libraryData";

const CollectionCard = ({
  icon,
  title,
  description,
  image,
  imageAlt,
  accent,
  url,
}: Omit<CollectionData, "id">) => (
  <article
    style={{ "--accent": accent } as CSSProperties}
    className="relative mb-2 mt-8 row-span-4 grid grid-rows-subgrid rounded-2xl border border-primary-gold/20 bg-white-color shadow-sm"
  >
    <div className="relative h-[110px] w-full overflow-hidden rounded-t-2xl">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1280px) 16vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover"
      />
    </div>

    <span className="absolute left-1/2 top-[80px] z-10 flex h-[60px] w-[60px] -translate-x-1/2 items-center justify-center rounded-full border-2 border-white-color bg-[var(--accent)] text-white-color shadow-md">
      <CollectionIcons name={icon} />
    </span>

    <CardHeading className="px-4 pt-9 text-center !text-[var(--accent)]">
      {title}
    </CardHeading>
    <CardDescSm className="px-4 pt-2 text-center">{description}</CardDescSm>
    <div className="flex items-end justify-center px-4 pb-5 pt-4">
      <ArrowLink text="Explore" url={url} color={accent} />
    </div>
  </article>
);

export default CollectionCard;
