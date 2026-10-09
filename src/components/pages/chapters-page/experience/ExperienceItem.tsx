import clsx from "clsx";
import Image from "next/image";
import ExperienceIcons from "@/components/icons/ExperienceIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardHeading from "@/components/pages/typography/CardHeading";
import type { ExperienceItemData } from "@/constant/chaptersData";

const ExperienceItem = ({
  icon,
  title,
  description,
  image,
  imageAlt,
  className,
}: Omit<ExperienceItemData, "id"> & { className?: string }) => (
  <article
    className={clsx(
      "row-span-4 grid grid-rows-subgrid justify-items-center px-3 text-center",
      className,
    )}
  >
    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary-gold bg-primary-green text-primary-gold">
      <ExperienceIcons name={icon} />
    </span>

    <CardHeading className="pt-4 !text-primary-green">{title}</CardHeading>
    <CardDescSm className="max-w-[210px] pb-6 pt-2 !text-text-dark">
      {description}
    </CardDescSm>

    <div className="relative aspect-[4/5] w-full max-w-[260px] self-end overflow-hidden rounded-2xl">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1280px) 18vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover"
      />
    </div>
  </article>
);

export default ExperienceItem;
