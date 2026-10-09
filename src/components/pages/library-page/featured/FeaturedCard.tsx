import Image from "next/image";
import type { CSSProperties } from "react";
import ArrowLink from "@/components/common-components/ArrowLink";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { FeaturedResourceData } from "@/constant/featuredData";

const FeaturedCard = ({
  tag,
  title,
  description,
  image,
  imageAlt,
  linkText,
  url,
  accent,
}: Omit<FeaturedResourceData, "id">) => (
  <article
    style={{ "--accent": accent } as CSSProperties}
    className="mb-4 row-span-4 grid grid-rows-subgrid overflow-hidden rounded-xl border border-primary-gold/20 bg-white-color shadow-sm"
  >
    <div className="relative h-[110px] w-full">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1280px) 18vw, (min-width: 640px) 33vw, 100vw"
        className="object-cover"
      />
      <span className="absolute left-2 top-2 rounded bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold uppercase leading-tight tracking-wide text-white-color">
        {tag}
      </span>
    </div>

    <CardTitleSm className="px-4 pt-3">{title}</CardTitleSm>
    <CardDescSm className="px-4 pt-1.5">{description}</CardDescSm>
    <div className="flex items-end px-4 pb-4 pt-3">
      <ArrowLink text={linkText} url={url} color={accent} />
    </div>
  </article>
);

export default FeaturedCard;
