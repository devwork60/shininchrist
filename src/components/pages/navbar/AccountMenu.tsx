"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthIcons from "@/components/icons/AuthIcons";

interface AccountMenuProps {
  name: string;
  email: string;
  isAdmin: boolean;
}

const row =
  "flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold text-[var(--nav-text)] hover:bg-[var(--background-cream)] hover:text-[var(--primary-gold)]";

/** Signed-in header control: initial avatar with a My Account / Log out menu. */
const AccountMenu = ({ name, email, isAdmin }: AccountMenuProps) => {
  const router = useRouter();

  const logOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="group relative hidden lg:block">
      <Link
        href="/account"
        aria-label="My Account"
        aria-haspopup="true"
        className="flex h-10 items-center gap-2 rounded-full px-1 text-[var(--primary-green)]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-green)] font-heading text-base uppercase text-[var(--gold-bright)]">
          {(name || email).charAt(0)}
        </span>
      </Link>
      <div className="invisible absolute right-0 top-full z-40 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="min-w-[210px] overflow-hidden rounded-xl border border-primary-gold/20 bg-white py-2 shadow-lg">
          <li className="border-b border-primary-green/10 px-4 pb-2 pt-1">
            <p className="truncate text-sm font-semibold text-[var(--card-heading)]">
              {name}
            </p>
            <p className="truncate text-xs text-[var(--text-grey)]">{email}</p>
          </li>
          <li>
            <Link href="/account" className={row}>
              <AuthIcons
                name="user"
                className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
              />
              My Account
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link href="/admin/sessions" className={row}>
                <AuthIcons
                  name="shield"
                  className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
                />
                Session Control
              </Link>
            </li>
          )}
          <li>
            <button type="button" onClick={logOut} className={row}>
              <AuthIcons
                name="logout"
                className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
              />
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountMenu;
