"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SearchIcon from "@/components/icons/UiIconsSearch";
import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import {
  isNavActive,
  JOIN_CTA,
  LOGIN_CTA,
  NAV_ITEMS,
  SEARCH_LINK,
} from "@/constant/navData";
import { useAuthUser } from "@/hooks/useAuthUser";
import AccountMenu from "./AccountMenu";
import MobileMenu from "./MobileMenu";
import NavDropdown from "./NavDropdown";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, isAdmin } = useAuthUser();
  const signedIn = Boolean(user);

  return (
    <header className="sticky top-0 z-30 bg-[var(--white-color)] shadow-sm">
      <div className="wrapper flex h-[74px] lg:max-xl:h-16 items-center justify-between gap-2 xl:gap-4">
        <Link href="/" aria-label="ShininChrist home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="ShininChrist"
            width={1665}
            height={265}
            priority
            className="h-9 w-auto sm:h-11 lg:max-xl:!h-7"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-2.5 xl:gap-5">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <NavDropdown
                    key={item.href}
                    item={item}
                    pathname={pathname}
                  />
                );
              }
              const active = isNavActive(item.href, pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-block border-b-2 pb-1 text-[15px] lg:max-xl:text-[13px] font-semibold transition-colors hover:text-[var(--primary-gold)] ${
                      active
                        ? "border-[var(--primary-gold)] text-[var(--primary-green)]"
                        : "border-transparent text-[var(--nav-text)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-0 xl:gap-1.5">
          <Link
            href={SEARCH_LINK.href}
            aria-label={SEARCH_LINK.label}
            className="hidden h-10 w-10 items-center justify-center rounded-md text-[var(--primary-green)] transition-colors hover:text-[var(--primary-gold)] lg:inline-flex"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>
          {user ? (
            <AccountMenu
              name={user.name}
              email={user.email}
              isAdmin={isAdmin}
            />
          ) : (
            <Link
              href={LOGIN_CTA.href}
              aria-label={LOGIN_CTA.label}
              title={LOGIN_CTA.label}
              className="hidden h-10 w-10 items-center justify-center text-[var(--primary-green)] transition-colors hover:text-[var(--primary-gold)] lg:inline-flex"
            >
              <UiIcons name="user" />
            </Link>
          )}
          <div className="hidden sm:block">
            <ButtonSm
              url={JOIN_CTA.href}
              text={JOIN_CTA.label}
              bgColor="var(--primary-gold)"
              className="whitespace-nowrap lg:max-xl:!px-3 lg:max-xl:!py-2 lg:max-xl:!text-[13px]"
              textColor="var(--white-color)"
            />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--primary-green)] lg:hidden"
          >
            <UiIcons name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <MobileMenu
          signedIn={signedIn}
          pathname={pathname}
          onNavigate={() => setOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
