import clsx from "clsx";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import SectionLabel from "@/components/pages/typography/SectionLabel";
import SectionSubtext from "@/components/pages/typography/SectionSubtext";

interface SectionHeaderProps {
  title: string;
  description?: string;
  /** Gold lines on either side of the title (display variant) */
  withLines?: boolean;
  /** Style the description as a gold serif tagline (display variant) */
  accentDescription?: boolean;
  /** "display" = large title (home); "label" = compact uppercase title with arrow lines */
  variant?: "display" | "label";
  /** Label variant: give the title row a cream background so it can sit on top of a border */
  onBorder?: boolean;
  className?: string;
}

const Line = () => (
  <span
    aria-hidden="true"
    className="hidden h-px w-14 bg-primary-gold sm:block md:w-24"
  />
);

const ArrowLine = ({ flip = false }: { flip?: boolean }) => (
  <span
    aria-hidden="true"
    className={clsx(
      "hidden items-center text-primary-gold sm:flex",
      flip && "flex-row-reverse",
    )}
  >
    <span className="h-px w-10 bg-primary-gold md:w-16" />
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="currentColor"
      className={flip ? "rotate-180" : ""}
    >
      <path d="M0 0l8 5-8 5z" />
    </svg>
  </span>
);

/** Reusable section heading + description block. */
const SectionHeader = ({
  title,
  description,
  withLines = false,
  accentDescription = false,
  variant = "display",
  onBorder = false,
  className,
}: SectionHeaderProps) => {
  if (variant === "label") {
    return (
      <div className={clsx("text-center", className)}>
        <div
          className={clsx(
            "flex items-center justify-center gap-3 md:gap-4",
            onBorder && "mx-auto w-fit bg-cream px-4 md:px-6",
          )}
        >
          <ArrowLine />
          <SectionLabel>{title}</SectionLabel>
          <ArrowLine flip />
        </div>
        {description && (
          <SectionSubtext className="mt-2">{description}</SectionSubtext>
        )}
      </div>
    );
  }

  return (
    <div className={clsx("text-center", className)}>
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {withLines && <Line />}
        <MainHeading>{title}</MainHeading>
        {withLines && <Line />}
      </div>
      {description && (
        <Paragraph
          className={clsx(
            "mx-auto mt-3 max-w-3xl",
            accentDescription &&
              "!font-heading !font-semibold !text-primary-gold lg:!text-2xl",
          )}
        >
          {description}
        </Paragraph>
      )}
    </div>
  );
};

export default SectionHeader;
