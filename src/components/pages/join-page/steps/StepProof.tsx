import Link from "next/link";
import { JOIN_LINKS } from "@/constant/joinData";
import ExternalAction from "../ExternalAction";
import StepFrame from "../StepFrame";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const StepProof = ({ onNext, onBack }: StepProps) => (
  <StepFrame
    title="Upload Screenshot Proof"
    description="Upload a screenshot showing your subscription or follow (YouTube, Facebook, Instagram or TikTok). The status must show “Subscribed” or “Following”."
    onNext={onNext}
    onBack={onBack}
    locked="Proof must be received by our team."
  >
    <div className="grid gap-1">
      <label htmlFor="proof" className="text-xs font-medium text-text-dark">
        Upload Screenshot <span className="text-red-600">*</span>
      </label>
      <input
        id="proof"
        name="proof"
        type="file"
        required
        accept=".jpg,.jpeg,.png,.pdf"
        className="rounded-lg border-2 border-dashed border-primary-green/30 p-6 text-sm text-text-dark file:mr-4 file:rounded-md file:border-0 file:bg-primary-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white-color"
      />
      <p className="text-xs text-text-grey">JPG, PNG or PDF.</p>
    </div>
    <p className="text-sm text-text-dark">
      Trouble uploading? Send your screenshot on WhatsApp with the name and
      email you registered with.
    </p>
    <div>
      <ExternalAction
        url={JOIN_LINKS.whatsapp}
        text="Send on WhatsApp"
        tone="whatsapp"
      />
    </div>
    <p className="text-sm text-text-dark">
      Still stuck?{" "}
      <Link
        href={JOIN_LINKS.contact}
        className="font-semibold text-primary-gold underline-offset-4 hover:underline"
      >
        Contact us here
      </Link>
      .
    </p>
  </StepFrame>
);

export default StepProof;
