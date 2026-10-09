import Link from "next/link";
import AuthIcons from "@/components/icons/AuthIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import type { ChecklistItem } from "@/lib/account-view";

interface MembershipStatusCardProps {
  status: string;
  active: boolean;
  items: ChecklistItem[];
}

const circle = {
  done: "flex h-7 w-7 items-center justify-center rounded-full bg-primary-green text-white-color",
  pending:
    "flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary-gold text-primary-gold",
  todo: "flex h-7 w-7 items-center justify-center rounded-full border border-primary-green/25 text-text-grey",
} as const;

/** Real membership checklist: every line comes from what the server has recorded for this member. */
const MembershipStatusCard = ({
  status,
  active,
  items,
}: MembershipStatusCardProps) => (
  <div className="rounded-xl border border-primary-green/10 bg-white-color p-6">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="font-heading text-xl font-semibold text-primary-green">
          Membership status
        </h2>
        <CardDescSm className="mt-1">
          Signing in does not make you an active member. Every item below must
          be completed and confirmed.
        </CardDescSm>
      </div>
      <span
        className={
          active
            ? "shrink-0 rounded-full bg-primary-green px-3 py-1 text-xs font-semibold text-white-color"
            : "shrink-0 rounded-full border border-primary-gold/50 bg-primary-gold/10 px-3 py-1 text-xs font-semibold text-primary-gold"
        }
      >
        {status}
      </span>
    </div>

    <ol className="mt-5 grid gap-3.5">
      {items.map(({ label, state, note }) => (
        <li key={label} className="grid grid-cols-[auto_1fr] items-start gap-3">
          <span className={circle[state]}>
            {state === "done" && (
              <AuthIcons
                name="check"
                className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full"
              />
            )}
            {state === "pending" && (
              <span className="h-2 w-2 rounded-full bg-primary-gold" />
            )}
          </span>
          <div>
            <p
              className={
                state === "todo"
                  ? "text-sm text-text-grey"
                  : "text-sm font-medium text-text-dark"
              }
            >
              {label}
            </p>
            <p className="text-xs text-text-grey">{note}</p>
          </div>
        </li>
      ))}
    </ol>

    {!active && (
      <Link
        href="/join"
        className="mt-5 inline-block rounded-md bg-primary-gold px-5 py-2.5 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green"
      >
        Continue registration
      </Link>
    )}
  </div>
);

export default MembershipStatusCard;
