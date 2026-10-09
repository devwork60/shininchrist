import GoogleSignInButton from "@/components/common-components/GoogleSignInButton";
import StepFrame from "../StepFrame";

const StepAccount = ({ onNext }: { onNext: () => void }) => (
  <StepFrame
    title="Sign in with Google/Gmail"
    description="Sign in with your Google/Gmail account. This creates your account and saves your progress."
    onNext={onNext}
    locked="This does not grant member access."
  >
    <div className="sm:max-w-sm">
      <GoogleSignInButton text="Sign in with Google" next="/join" />
    </div>
  </StepFrame>
);

export default StepAccount;
