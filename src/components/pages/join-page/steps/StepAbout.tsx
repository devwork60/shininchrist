import { COUNTRY_NAMES } from "@/constant/countries";
import { INTEREST_AREAS } from "@/constant/joinData";
import type { JoinStatus } from "@/lib/join";
import JoinField from "../JoinField";
import { formToObject, postJson } from "../joinApi";
import StepFrame from "../StepFrame";

interface StepAboutProps {
  status: JoinStatus;
  dob: string;
  onDob: (value: string) => void;
  minor: boolean;
  onSaved: () => Promise<void>;
  onBack: () => void;
}

const StepAbout = ({
  status,
  dob,
  onDob,
  minor,
  onSaved,
  onBack,
}: StepAboutProps) => {
  const { profile } = status;

  const save = async (data: FormData) => {
    await postJson("/api/join/profile", formToObject(data));
    await onSaved();
  };

  return (
    <StepFrame
      title="About You"
      description="Fill in the simple registration form with your basic information."
      onNext={save}
      onBack={onBack}
      locked="Registration saved."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <JoinField
          id="fullName"
          label="Full Name"
          span={2}
          placeholder="Enter your full name"
          defaultValue={profile.fullName ?? ""}
        />
        <JoinField
          id="dob"
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={onDob}
        />
        <JoinField
          id="gender"
          label="Gender"
          options={["Male", "Female"]}
          defaultValue={
            profile.gender
              ? profile.gender[0].toUpperCase() + profile.gender.slice(1)
              : ""
          }
        />
        <JoinField
          id="country"
          label="Country"
          options={COUNTRY_NAMES}
          defaultValue={profile.country ?? ""}
        />
        <JoinField
          id="state"
          label="State / Region"
          placeholder="Enter state or region"
          required={false}
          defaultValue={profile.state ?? ""}
        />
        <JoinField
          id="whatsapp"
          label="WhatsApp Number"
          type="tel"
          placeholder="e.g. +234 800 000 0000"
          defaultValue={profile.whatsapp ?? ""}
        />
        <div className="grid content-start gap-1">
          <span className="text-xs font-medium text-text-dark">Email</span>
          <p className="rounded-md border border-primary-green/10 bg-cream px-3 py-2.5 text-sm text-text-dark">
            {status.email}
          </p>
        </div>
        <JoinField
          id="interest"
          label="Area of Interest"
          options={INTEREST_AREAS}
          span={2}
          defaultValue={profile.interest ?? ""}
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
};

export default StepAbout;
