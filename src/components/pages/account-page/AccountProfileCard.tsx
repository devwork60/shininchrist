"use client";

import { useRouter } from "next/navigation";
import AuthIcons from "@/components/icons/AuthIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";

interface AccountProfileCardProps {
  name: string;
  email: string;
  memberId: string | null;
  country: string | null;
  chapter: string | null;
}

const AccountProfileCard = ({
  name,
  email,
  memberId,
  country,
  chapter,
}: AccountProfileCardProps) => {
  const router = useRouter();
  const details = [
    ["Member ID", memberId ?? "Issued when you are activated"],
    ["Country", country ?? "Not set yet"],
    ["Chapter", chapter ?? "Not chosen yet"],
  ] as const;

  const signOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="rounded-xl border border-primary-green/10 bg-white-color p-6">
      <div className="flex items-center gap-4">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-green font-heading text-2xl uppercase text-gold-bright">
          {(name || email).charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-heading text-xl font-semibold text-card-heading">
            {name}
          </p>
          <CardDescSm className="truncate">{email}</CardDescSm>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 border-t border-primary-green/10 pt-4">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <dt className="text-text-grey">{label}</dt>
            <dd className="text-right font-semibold text-text-dark">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={signOut}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-primary-green px-5 py-2.5 text-sm font-semibold text-primary-green transition-colors hover:bg-primary-green hover:text-white-color lg:text-base"
      >
        <AuthIcons
          name="logout"
          className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
        />
        Sign out
      </button>
    </div>
  );
};

export default AccountProfileCard;
