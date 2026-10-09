import Link from "next/link";
import type { CSSProperties } from "react";
import clsx from "clsx";
import UiIcons from "@/components/icons/UiIcons";

interface ArrowLinkProps {
  text: string;
  url: string;
  /** CSS colour or variable, e.g. "var(--collection-faith)" */
  color: string;
  className?: string;
}

/** Text link with a trailing arrow, coloured by an accent. */
const ArrowLink = ({ text, url, color, className }: ArrowLinkProps) => (
  <Link
    href={url}
    style={{ "--link-color": color } as CSSProperties}
    className={clsx(
      "inline-flex items-center gap-2 text-sm font-semibold text-[var(--link-color)] transition-opacity hover:opacity-75",
      className,
    )}
  >
    {text}
    <UiIcons name="arrowRight" />
  </Link>
);

export default ArrowLink;
