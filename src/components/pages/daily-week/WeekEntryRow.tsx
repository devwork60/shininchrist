import Image from "next/image";
import Link from "next/link";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";

interface WeekEntryRowProps {
  day: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  /** When set, the row opens the entry's own page (real entries). Sample rows stay as locked previews. */
  href?: string;
}

const ROW =
  "flex items-center gap-4 border-b border-primary-green/10 py-3 last:border-b-0";

/** One entry: thumbnail, day + title, date and either a lock badge (sample) or an "open" badge (real entry). */
const WeekEntryRow = ({
  day,
  title,
  date,
  image,
  imageAlt,
  href,
}: WeekEntryRowProps) => {
  const body = (
    <>
      <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg bg-primary-green/10 sm:h-[72px] sm:w-[132px]">
        {image && (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="132px"
            className="object-cover"
          />
        )}
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

      {href ? (
        <span
          role="img"
          aria-label="Open this entry"
          className="flex h-12 w-14 shrink-0 items-center justify-center rounded-lg border border-primary-green/20 bg-primary-green/10 text-primary-green sm:h-14 sm:w-[84px]"
        >
          <UiIcons name="arrowRight" className="[&>svg]:h-5 [&>svg]:w-5" />
        </span>
      ) : (
        <span
          role="img"
          aria-label="Members only"
          className="flex h-12 w-14 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 sm:h-14 sm:w-[84px]"
        >
          <UiIcons name="lock" className="[&>svg]:h-5 [&>svg]:w-5" />
        </span>
      )}
    </>
  );

  return href ? (
    <li>
      <Link href={href} className={`${ROW} transition-colors hover:bg-primary-green/5`}>
        {body}
      </Link>
    </li>
  ) : (
    <li className={ROW}>{body}</li>
  );
};

export default WeekEntryRow;
