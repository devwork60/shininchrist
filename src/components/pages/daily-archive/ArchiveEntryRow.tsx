import Image from "next/image";
import Link from "next/link";
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

const ROW =
  "flex items-center gap-4 border-b border-primary-green/10 py-3 last:border-b-0";

type ArchiveEntryRowProps = Omit<ArchiveEntryData, "id" | "book" | "topic"> & {
  /** Real entries open their own page; sample entries stay as locked previews. */
  href?: string;
};

const ArchiveEntryRow = ({
  title,
  scripture,
  date,
  image,
  imageAlt,
  href,
}: ArchiveEntryRowProps) => {
  const body = (
    <>
      <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-primary-green/10 sm:h-[84px] sm:w-[150px]">
        {image && (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="150px"
            className="object-cover"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <CardTitleSm className="!text-primary-green">{title}</CardTitleSm>
        {scripture && (
          <CardDescSm className="!text-text-grey">{scripture}</CardDescSm>
        )}
        <CardDescSm className="!text-text-grey">
          <time dateTime={date}>{formatDate(date)}</time>
        </CardDescSm>
      </div>

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

export default ArchiveEntryRow;
