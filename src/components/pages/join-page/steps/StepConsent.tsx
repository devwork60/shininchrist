import { CONSENT_FORM_URL, JOIN_LINKS } from "@/constant/joinData";
import ExternalAction from "../ExternalAction";
import StepFrame from "../StepFrame";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const StepConsent = ({ onNext, onBack }: StepProps) => (
  <StepFrame
    title="Parental Consent"
    description="Because you are under 18, a parent or legal guardian must complete and sign the Parental Consent Form."
    onNext={onNext}
    onBack={onBack}
    locked="Consent required before moving forward."
  >
    <ol className="grid list-decimal gap-2 pl-5 text-sm text-text-dark">
      <li>
        Download the{" "}
        <a
          href={CONSENT_FORM_URL}
          download
          className="font-semibold text-primary-gold underline-offset-4 hover:underline"
        >
          Parental / Legal Guardian Consent Form (PDF)
        </a>
        .
      </li>
      <li>Your parent or guardian completes and signs it.</li>
      <li>
        Send the signed form through the ShininChrist WhatsApp link below.
      </li>
    </ol>
    <div>
      <ExternalAction
        url={JOIN_LINKS.whatsapp}
        text="Submit consent on WhatsApp"
        tone="whatsapp"
      />
    </div>
    <label className="flex items-start gap-3 text-sm text-text-dark">
      <input
        type="checkbox"
        required
        className="mt-1 h-4 w-4 accent-[var(--primary-green)]"
      />
      I have sent the signed consent form on WhatsApp.
    </label>
  </StepFrame>
);

export default StepConsent;
