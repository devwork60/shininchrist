import ChapterPillarIcons from "@/components/icons/ChapterPillarIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { ChapterPillarData } from "@/constant/chaptersData";

const PillarItem = ({
  icon,
  title,
  description,
}: Omit<ChapterPillarData, "id">) => (
  <article className="row-span-3 mb-8 grid grid-rows-subgrid justify-items-center text-center sm:mb-0">
    <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-primary-green text-gold-bright lg:h-24 lg:w-24">
      <ChapterPillarIcons name={icon} />
    </span>
    <CardTitleSm className="pt-3">{title}</CardTitleSm>
    <CardDescSm className="max-w-[160px] pt-1">{description}</CardDescSm>
  </article>
);

export default PillarItem;
