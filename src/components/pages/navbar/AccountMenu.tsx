"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthIcons from "@/components/icons/AuthIcons";
import UiIcons from "@/components/icons/UiIcons";

interface AccountMenuProps {
  name: string;
  email: string;
  isAdmin: boolean;
}

const row =
  "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-semibold text-[var(--nav-text)] hover:bg-[var(--background-cream)] hover:text-[var(--primary-gold)] transition-colors";

/** Signed-in header control: initial avatar linking directly to Dashboard with streamlined actions. */
const AccountMenu = ({ name, email, isAdmin }: AccountMenuProps) => {
  const router = useRouter();

  const logOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const dashboardHref = isAdmin ? "/admin" : "/account";

  return (
    <div className="group relative hidden lg:block">
      <Link
        href={dashboardHref}
        aria-label={isAdmin ? "Admin Portal" : "Member Dashboard"}
        aria-haspopup="true"
        className="flex h-10 items-center gap-2 rounded-full px-1 text-[var(--primary-green)]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-green)] font-heading text-base uppercase text-[var(--gold-bright)] shadow-xs">
          {(name || email).charAt(0)}
        </span>
      </Link>
      <div className="invisible absolute right-0 top-full z-40 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="min-w-[240px] overflow-hidden rounded-2xl border border-primary-gold/30 bg-white py-2 shadow-xl">
          <div className="border-b border-black/10 px-4 pb-3 pt-2">
            <div className="flex items-center justify-between">
              <p className="truncate text-sm font-bold text-[var(--card-heading)]">
                {name || "Member"}
              </p>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                  isAdmin
                    ? "bg-primary-gold/15 text-primary-gold"
                    : "bg-primary-green/10 text-primary-green"
                }`}
              >
                {isAdmin ? "Admin" : "Member"}
              </span>
            </div>
            <p className="truncate text-xs text-[var(--text-grey)]">{email}</p>
          </div>

          <div className="py-1">
            {isAdmin && (
              <Link
                href="/admin"
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-bold text-primary-green hover:bg-cream hover:text-primary-gold transition-colors"
              >
                <div className="rounded-full bg-primary-gold/20 p-1 text-primary-gold">
                  <UiIcons name="sparkle" />
                </div>
                <div>
                  <p className="leading-tight">Admin Portal</p>
                  <p className="text-[11px] font-normal text-text-grey">
                    All management modules & stats
                  </p>
                </div>
              </Link>
            )}

            <Link href="/account" className={row}>
              <AuthIcons
                name="user"
                className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full text-primary-green"
              />
              <div>
                <p className="leading-tight">
                  {isAdmin ? "Member Profile View" : "My Dashboard"}
                </p>
                <p className="text-[11px] font-normal text-text-grey">
                  Status, chapter, uniform & orders
                </p>
              </div>
            </Link>
          </div>

          <div className="border-t border-black/10 pt-1">
            <button type="button" onClick={logOut} className={row}>
              <AuthIcons
                name="logout"
                className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full text-red-600"
              />
              <span className="text-red-700">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
