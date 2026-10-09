import Image from "next/image";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { ArchiveEntryData } from "@/constant/dailyArchiveData";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const ArchiveEntryRow = ({
  title,
  scripture,
  date,
  image,
  imageAlt,
}: Omit<ArchiveEntryData, "id" | "book" | "topic">) => (
  <li className="flex items-center gap-4 border-b border-primary-green/10 py-3 last:border-b-0">
    <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg sm:h-[84px] sm:w-[150px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="150px"
        className="object-cover"
      />
    </div>

    <div className="min-w-0 flex-1">
      <CardTitleSm className="!text-primary-green">{title}</CardTitleSm>
      <CardDescSm className="!text-text-grey">{scripture}</CardDescSm>
      <CardDescSm className="!text-text-grey">
        <time dateTime={date}>{formatDate(date)}</time>
      </CardDescSm>
    </div>

    <span
      role="img"
      aria-label="Members only"
      className="flex h-12 w-14 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 sm:h-14 sm:w-[84px]"
    >
      <UiIcons name="lock" className="[&>svg]:h-5 [&>svg]:w-5" />
    </span>
  </li>
);

export default ArchiveEntryRow;
