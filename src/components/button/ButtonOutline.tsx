import Link from "next/link";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

interface ButtonOutlineProps {
  text: string;
  borderColor: string; // border color and hover fill
  url: string;
  defaultTextColor?: string; // resting text color (default: borderColor)
  textColor?: string; // hover text color (default: white)
  icon?: ReactNode;
  iconRight?: ReactNode;
  shape?: "pill" | "rounded";
  className?: string;
}

const stripBrackets = (value: string) =>
  value.startsWith("[") ? value.slice(1, -1) : value;

const ButtonOutline = ({
  text,
  borderColor,
  url,
  defaultTextColor,
  textColor = "var(--white-color)",
  icon,
  iconRight,
  shape = "rounded",
  className,
}: ButtonOutlineProps) => {
  const border = stripBrackets(borderColor);
  const style = {
    "--btn-border": border,
    "--btn-default-text": defaultTextColor
      ? stripBrackets(defaultTextColor)
      : border,
    "--btn-hover-text": stripBrackets(textColor),
  } as CSSProperties;

  return (
    <Link
      href={url}
      style={style}
      className={clsx(
        "inline-flex items-center justify-center gap-2.5 border border-[var(--btn-border)] bg-transparent px-5 py-2.5 text-sm font-semibold text-[var(--btn-default-text)] transition-colors duration-200 lg:px-6 lg:py-3 lg:text-base",
        shape === "rounded" ? "rounded-[10px]" : "rounded-[10px]",
        "hover:bg-[var(--btn-border)] hover:text-[var(--btn-hover-text)]",
        className,
      )}
    >
      {icon}
      {text}
      {iconRight}
    </Link>
  );
};

export default ButtonOutline;
