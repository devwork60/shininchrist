import clsx from "clsx";
import Link from "next/link";
import UiIcons from "@/components/icons/UiIcons";
import type { NavChild } from "@/constant/navData";

interface NavDropdownRowProps {
  child: NavChild;
  pathname: string;
}

/** One row of a dropdown: simple label, or rich row with icon, description and lock badge. */
const NavDropdownRow = ({ child, pathname }: NavDropdownRowProps) => {
  const current = pathname === child.href;

  if (!child.description) {
    return (
      <Link
        href={child.href}
        aria-current={current ? "page" : undefined}
        className={clsx(
          "block px-5 py-2.5 text-[15px] font-semibold transition-colors hover:bg-cream hover:text-[var(--primary-gold)]",
          current ? "text-[var(--primary-gold)]" : "text-[var(--nav-text)]",
        )}
      >
        {child.label}
      </Link>
    );
  }

  return (
    <Link
      href={child.href}
      aria-current={current ? "page" : undefined}
      className={clsx(
        "flex items-center gap-3.5 rounded-xl border px-3 py-2.5 transition-colors",
        child.highlight
          ? child.tone === "gold"
            ? "border-primary-gold/40 bg-primary-gold/10 hover:bg-primary-gold/15"
            : "border-primary-green/30 bg-primary-green/10 hover:bg-primary-green/15"
          : "border-transparent hover:bg-cream",
      )}
    >
      <span
        className={clsx(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border",
          child.tone === "gold"
            ? "border-primary-gold/60 text-primary-gold"
            : "border-primary-green/40 text-primary-green",
        )}
      >
        <UiIcons name={child.icon ?? "calendarCheck"} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={clsx(
            "block text-[15px] font-bold leading-tight",
            child.tone === "gold" ? "text-primary-gold" : "text-primary-green",
          )}
        >
          {child.label}
        </span>
        <span className="block whitespace-nowrap text-[13px] leading-tight text-text-grey">
          {child.description}
        </span>
      </span>

      {child.membersOnly && (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-red-300 bg-red-100 px-2 py-1 text-[11px] font-semibold text-red-700">
          <UiIcons name="lock" />
          Members Only
        </span>
      )}
    </Link>
  );
};

export default NavDropdownRow;
