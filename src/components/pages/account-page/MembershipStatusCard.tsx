import AuthIcons from "@/components/icons/AuthIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import { MEMBERSHIP_STEPS } from "@/constant/authData";

interface MembershipStatusCardProps {
  status: string;
  /** How many of the steps in MEMBERSHIP_STEPS are finished. */
  completed: number;
}

const MembershipStatusCard = ({
  status,
  completed,
}: MembershipStatusCardProps) => (
  <div className="rounded-xl border border-primary-green/10 bg-white-color p-6">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="font-heading text-xl font-semibold text-primary-green">
          Membership status
        </h2>
        <CardDescSm className="mt-1">
          Signing in does not make you an active member. Complete each step to
          be activated.
        </CardDescSm>
      </div>
      <span className="shrink-0 rounded-full border border-primary-gold/50 bg-primary-gold/10 px-3 py-1 text-xs font-semibold text-primary-gold">
        {status}
      </span>
    </div>

    <ol className="mt-5 grid gap-3">
      {MEMBERSHIP_STEPS.map(({ label }, index) => {
        const done = index < completed;
        return (
          <li
            key={label}
            className="grid grid-cols-[auto_1fr] items-center gap-3"
          >
            <span
              className={
                done
                  ? "flex h-7 w-7 items-center justify-center rounded-full bg-primary-green text-white-color"
                  : "flex h-7 w-7 items-center justify-center rounded-full border border-primary-green/25 text-text-grey"
              }
            >
              {done && (
                <AuthIcons
                  name="check"
                  className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full"
                />
              )}
            </span>
            <span
              className={
                done
                  ? "text-sm font-medium text-text-dark"
                  : "text-sm text-text-grey"
              }
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  </div>
);

export default MembershipStatusCard;
