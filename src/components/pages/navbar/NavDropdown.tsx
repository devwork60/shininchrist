import clsx from "clsx";
import Link from "next/link";
import UiIcons from "@/components/icons/UiIcons";
import { isNavActive, type NavItem } from "@/constant/navData";
import NavDropdownRow from "./NavDropdownRow";

interface NavDropdownProps {
  item: NavItem;
  pathname: string;
}

/** Desktop nav item with a hover / keyboard-focus dropdown. */
const NavDropdown = ({ item, pathname }: NavDropdownProps) => {
  const active = isNavActive(item.href, pathname);
  const isRich = item.children?.some((child) => child.description);

  return (
    <li className="group relative">
      <Link
        href={item.href}
        aria-current={pathname === item.href ? "page" : undefined}
        aria-haspopup="true"
        className={clsx(
          "inline-flex items-center gap-1 border-b-2 pb-1 text-[15px] lg:max-xl:text-[13px] font-semibold transition-colors group-hover:text-[var(--primary-gold)] group-focus-within:text-[var(--primary-gold)]",
          active
            ? "border-[var(--primary-gold)] text-[var(--primary-green)]"
            : "border-transparent text-[var(--nav-text)]",
        )}
      >
        {item.label}
        <UiIcons
          name="chevronDown"
          className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </Link>

      {/* pt-3 keeps the hover area continuous between link and panel */}
      <div className="invisible absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul
          className={clsx(
            "overflow-hidden rounded-2xl border bg-white-color shadow-lg",
            isRich
              ? "min-w-[410px] space-y-1.5 border-primary-green/40 p-2"
              : "min-w-[170px] border-primary-gold/20 py-2",
          )}
        >
          {item.children?.map((child) => (
            <li key={child.href}>
              <NavDropdownRow child={child} pathname={pathname} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default NavDropdown;
