import Image from "next/image";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";

interface WeekEntryRowProps {
  day: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
}

/** One locked entry: thumbnail, day + title, date and a lock badge. */
const WeekEntryRow = ({
  day,
  title,
  date,
  image,
  imageAlt,
}: WeekEntryRowProps) => (
  <li className="flex items-center gap-4 border-b border-primary-green/10 py-3 last:border-b-0">
    <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg sm:h-[72px] sm:w-[132px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="132px"
        className="object-cover"
      />
    </div>

    <div className="min-w-0 flex-1">
      <CardTitleSm className="!text-primary-green">{day}</CardTitleSm>
      <CardDescSm className="!text-text-dark">{title}</CardDescSm>
    </div>

    <CardDescSm
      as="time"
      className="hidden whitespace-nowrap !text-text-grey sm:block sm:pr-6"
    >
      {date}
    </CardDescSm>

    <span
      role="img"
      aria-label="Members only"
      className="flex h-12 w-14 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 sm:h-14 sm:w-[84px]"
    >
      <UiIcons name="lock" className="[&>svg]:h-5 [&>svg]:w-5" />
    </span>
  </li>
);

export default WeekEntryRow;
