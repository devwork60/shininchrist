import { INTEREST_AREAS } from "@/constant/joinData";
import JoinField from "../JoinField";
import StepFrame from "../StepFrame";

interface StepAboutProps {
  dob: string;
  onDob: (value: string) => void;
  minor: boolean;
  onNext: () => void;
  onBack: () => void;
}

const StepAbout = ({ dob, onDob, minor, onNext, onBack }: StepAboutProps) => (
  <StepFrame
    title="About You"
    description="Fill in the simple registration form with your basic information."
    onNext={onNext}
    onBack={onBack}
    locked="Registration saved."
  >
    <div className="grid gap-4 sm:grid-cols-2">
      <JoinField
        id="fullName"
        label="Full Name"
        span={2}
        placeholder="Enter your full name"
      />
      <JoinField
        id="dob"
        label="Date of Birth"
        type="date"
        value={dob}
        onChange={onDob}
      />
      <JoinField id="gender" label="Gender" options={["Male", "Female"]} />
      <JoinField id="country" label="Country" placeholder="e.g. Nigeria" />
      <JoinField
        id="state"
        label="State / Region"
        placeholder="Enter state or region"
      />
      <JoinField
        id="whatsapp"
        label="WhatsApp Number"
        type="tel"
        placeholder="Enter WhatsApp number"
      />
      <JoinField
        id="email"
        label="Email"
        type="email"
        placeholder="Gmail used to sign in"
      />
      <JoinField
        id="interest"
        label="Area of Interest"
        options={INTEREST_AREAS}
        span={2}
      />
    </div>
    {minor && (
      <p
        role="status"
        className="rounded-md border border-primary-gold/40 bg-primary-gold/10 px-4 py-3 text-sm text-text-dark"
      >
        You are under 18, so a parent or legal guardian must also give consent
        in the next step.
      </p>
    )}
  </StepFrame>
);

export default StepAbout;
