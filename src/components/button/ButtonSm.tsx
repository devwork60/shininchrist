import Link from "next/link";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

interface ButtonProps {
  url?: string;
  text: string;
  bgColor: string; // "var(--primary-gold)" or "[#d4a017]"
  textColor: string;
  isBorder?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  shape?: "pill" | "rounded";
  onClick?: () => void;
  padding?: string;
  paddingMd?: string;
  paddingLg?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const stripBrackets = (value: string) =>
  value.startsWith("[") ? value.slice(1, -1) : value;

const ButtonSm = ({
  url = "#",
  text,
  bgColor,
  textColor,
  isBorder = false,
  icon,
  iconRight,
  shape = "rounded",
  onClick,
  padding = "px-5 py-2.5",
  paddingMd = "md:px-5 md:py-2.5",
  paddingLg = "lg:px-6 lg:py-3",
  className,
  type = "button",
}: ButtonProps) => {
  const style = {
    "--btn-bg": stripBrackets(bgColor),
    "--btn-text": stripBrackets(textColor),
  } as CSSProperties;

  const classes = clsx(
    "inline-flex items-center justify-center gap-2.5 text-sm font-semibold transition-colors duration-200 lg:text-base",
    shape === "rounded" ? "rounded-[10px]" : "rounded-[10px]",
    "bg-[var(--btn-bg)] text-[var(--btn-text)]",
    "hover:bg-transparent hover:text-[var(--btn-bg)]",
    isBorder
      ? "border border-[var(--btn-bg)]"
      : "border border-transparent hover:border-[var(--btn-bg)]",
    padding,
    paddingMd,
    paddingLg,
    className,
  );

  const content = (
    <>
      {icon}
      {text}
      {iconRight}
    </>
  );

  if (onClick) {
    return (
      <button type={type} onClick={onClick} style={style} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <Link href={url} style={style} className={classes}>
      {content}
    </Link>
  );
};

export default ButtonSm;
