"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import {
  isNavActive,
  JOIN_CTA,
  LOGIN_CTA,
  SEARCH_LINK,
  type NavItem,
} from "@/constant/navData";

interface MobileMenuProps {
  items: NavItem[];
  signedIn?: boolean;
  isAdmin?: boolean;
  pathname: string;
  onNavigate: () => void;
}

const linkClass = (active: boolean) =>
  clsx(
    "block py-3 text-base font-semibold",
    active ? "text-[var(--primary-gold)]" : "text-[var(--nav-text)]",
  );

const MobileMenu = ({
  items,
  signedIn = false,
  isAdmin = false,
  pathname,
  onNavigate,
}: MobileMenuProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <nav
      id="mobile-nav"
      aria-label="Mobile"
      className="max-h-[calc(100vh-74px)] overflow-y-auto border-t border-black/5 bg-[var(--white-color)] lg:hidden"
    >
      <ul className="wrapper flex flex-col py-2">
        {items.map((item) => {
          const active = isNavActive(item.href, pathname);

          if (!item.children) {
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={linkClass(active)}
                >
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = expanded === item.label;
          return (
            <li key={item.href}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : item.label)}
                className={clsx(
                  linkClass(active),
                  "flex w-full items-center justify-between text-left",
                )}
              >
                {item.label}
                <UiIcons
                  name="chevronDown"
                  className={clsx(
                    "transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <ul className="mb-2 ml-3 border-l border-primary-gold/40 pl-4">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onNavigate}
                        className={clsx(
                          linkClass(pathname === child.href),
                          "!py-2.5 !font-medium",
                        )}
                      >
                        {child.label}
                        {child.membersOnly && (
                          <span className="ml-2 text-xs font-semibold text-red-700">
                            (Members Only)
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
        <li>
          <Link
            href={SEARCH_LINK.href}
            onClick={onNavigate}
            className={linkClass(false)}
          >
            {SEARCH_LINK.label}
          </Link>
        </li>
        {signedIn && isAdmin && (
          <li>
            <Link
              href="/admin"
              onClick={onNavigate}
              className={clsx(linkClass(pathname === "/admin"), "!text-primary-gold font-bold")}
            >
              ★ Admin Portal
            </Link>
          </li>
        )}
        <li>
          <Link
            href={signedIn ? "/account" : LOGIN_CTA.href}
            onClick={onNavigate}
            className={linkClass(pathname === "/account")}
          >
            {signedIn ? "Member Dashboard" : LOGIN_CTA.label}
          </Link>
        </li>
        <li className="py-3">
          <ButtonSm
            url={JOIN_CTA.href}
            text={JOIN_CTA.label}
            bgColor="var(--primary-gold)"
            textColor="var(--white-color)"
            className="w-full"
          />
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
