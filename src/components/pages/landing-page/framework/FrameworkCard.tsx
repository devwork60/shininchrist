import Image from "next/image";
import FrameworkIcons from "@/components/icons/FrameworkIcons";
import CardDesc from "@/components/pages/typography/CardDesc";
import CardHeading from "@/components/pages/typography/CardHeading";
import type { FrameworkCardData } from "@/constant/frameworkData";

const FrameworkCard = ({
  icon,
  title,
  description,
  image,
  imageAlt,
}: Omit<FrameworkCardData, "id">) => (
  <article className="relative mb-4 mt-9 row-span-3 grid grid-rows-subgrid rounded-2xl border border-primary-gold/30 bg-white-color shadow-sm">
    <span className="absolute -top-9 left-1/2 z-10 flex h-[72px] w-[72px] -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary-gold/60 bg-primary-green text-primary-gold">
      <FrameworkIcons name={icon} />
    </span>

    <div className="relative h-[130px] w-full overflow-hidden rounded-t-2xl">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>

    <CardHeading className="px-5 pt-4 text-center">{title}</CardHeading>
    <CardDesc className="px-5 pb-6 pt-2 text-center">{description}</CardDesc>
  </article>
);

export default FrameworkCard;
