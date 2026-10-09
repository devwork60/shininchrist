import GoogleSignInButton from "@/components/common-components/GoogleSignInButton";
import StepFrame from "../StepFrame";

interface StepAccountProps {
  /** Set once the applicant has signed in with Google. */
  email: string | null;
  onNext: () => void;
}

const StepAccount = ({ email, onNext }: StepAccountProps) => (
  <StepFrame
    title="Sign in with Google/Gmail"
    description="Sign in with your Google/Gmail account. This creates your account and saves your progress."
    onNext={onNext}
    nextLabel={email ? "Continue" : "Sign in first"}
    locked="This does not grant member access."
  >
    {email ? (
      <p className="rounded-md border border-primary-green/20 bg-cream px-4 py-3 text-sm text-text-dark">
        Signed in as <strong>{email}</strong>. Your progress is saved to this
        account.
      </p>
    ) : (
      <div className="sm:max-w-sm">
        <GoogleSignInButton text="Sign in with Google" next="/join" />
      </div>
    )}
  </StepFrame>
);

export default StepAccount;
