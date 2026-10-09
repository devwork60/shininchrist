import { CONSENT_FORM_URL, JOIN_LINKS } from "@/constant/joinData";
import ExternalAction from "../ExternalAction";
import { postForm } from "../joinApi";
import StepFrame from "../StepFrame";

interface StepConsentProps {
  consentStatus: string;
  onSaved: () => Promise<void>;
  onBack: () => void;
}

const StepConsent = ({ consentStatus, onSaved, onBack }: StepConsentProps) => {
  const submitted = consentStatus !== "not_submitted";

  const save = async (data: FormData) => {
    const file = data.get("file");
    if (file instanceof File && file.size > 0) {
      await postForm("/api/join/consent", data);
    } else if (!submitted) {
      throw new Error("Please upload the signed consent form.");
    }
    await onSaved();
  };

  return (
    <StepFrame
      title="Parental Consent"
      description="Because you are under 18, a parent or legal guardian must complete and sign the Parental Consent Form."
      onNext={save}
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
        <li>Upload the signed form below (JPG, PNG or PDF).</li>
      </ol>

      <div className="grid gap-1">
        <label
          htmlFor="consent-file"
          className="text-xs font-medium text-text-dark"
        >
          Signed consent form{" "}
          {!submitted && <span className="text-red-600">*</span>}
        </label>
        <input
          id="consent-file"
          name="file"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="rounded-lg border-2 border-dashed border-primary-green/30 p-5 text-sm text-text-dark file:mr-4 file:rounded-md file:border-0 file:bg-primary-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white-color"
        />
        {submitted && (
          <p className="text-xs text-primary-green">
            A form was received (
            {consentStatus === "verified" ? "verified" : "waiting for review"}).
            Upload again only to replace it.
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <p className="text-sm text-text-dark">
          Prefer WhatsApp? You can also send it there:
        </p>
        <div>
          <ExternalAction
            url={JOIN_LINKS.whatsapp}
            text="Send on WhatsApp"
            tone="whatsapp"
          />
        </div>
      </div>
    </StepFrame>
  );
};

export default StepConsent;
