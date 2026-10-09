import AuthIcons from "@/components/icons/AuthIcons";
import type { JoinStatus } from "@/lib/join";
import StepFrame from "../StepFrame";

interface StepReviewProps {
  status: JoinStatus;
  onRefresh: () => Promise<void>;
}

const wording = (state: string, done = "received") =>
  state === "verified"
    ? "verified"
    : state === "rejected"
      ? "needs to be re-uploaded"
      : state === "pending"
        ? `${done}, waiting for review`
        : "not received yet";

/** "Registration Pending": the real checklist the ShininChrist team works through before activation. */
const StepReview = ({ status, onRefresh }: StepReviewProps) => {
  const { membership, uniformPaid } = status;

  const checks: { label: string; ok: boolean; note?: string }[] = [
    {
      label: "Registration information completed",
      ok: Boolean(status.profile.fullName),
    },
    ...(membership.isMinor
      ? [
          {
            label: `Parental consent: ${wording(membership.consentStatus)}`,
            ok: membership.consentStatus === "verified",
          },
        ]
      : []),
    {
      label: `Social subscription proof: ${wording(membership.proofStatus)}`,
      ok: membership.proofStatus === "verified",
    },
    { label: "Uniform requested", ok: Boolean(status.order) },
    {
      label: uniformPaid
        ? "Payment confirmed"
        : "Uniform payment not confirmed yet",
      ok: uniformPaid,
    },
  ];

  return (
    <StepFrame
      title="Registration Pending"
      description="Thank you! ShininChrist is verifying your registration. Your account stays locked from member content until every item below is confirmed."
      onNext={onRefresh}
      nextLabel="Refresh status"
      locked="Account remains pending until verification is complete."
    >
      <ul className="grid gap-2.5">
        {checks.map(({ label, ok }) => (
          <li
            key={label}
            className="grid grid-cols-[auto_1fr] items-center gap-3 text-sm text-text-dark"
          >
            <span
              className={
                ok
                  ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary-green text-white-color"
                  : "flex h-6 w-6 items-center justify-center rounded-full border border-primary-green/30"
              }
            >
              {ok && (
                <AuthIcons
                  name="check"
                  className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full"
                />
              )}
            </span>
            {label}
          </li>
        ))}
      </ul>
    </StepFrame>
  );
};

export default StepReview;
