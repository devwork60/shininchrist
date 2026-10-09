import Link from "next/link";
import { JOIN_LINKS } from "@/constant/joinData";
import ExternalAction from "../ExternalAction";
import { postForm } from "../joinApi";
import StepFrame from "../StepFrame";

interface StepProofProps {
  platform: string;
  proofStatus: string;
  onSaved: () => Promise<void>;
  onBack: () => void;
}

const StepProof = ({
  platform,
  proofStatus,
  onSaved,
  onBack,
}: StepProofProps) => {
  const submitted = proofStatus !== "not_submitted";

  const save = async (data: FormData) => {
    const file = data.get("file");
    if (file instanceof File && file.size > 0) {
      data.set("platform", platform);
      await postForm("/api/join/proof", data);
    } else if (!submitted) {
      throw new Error("Please upload your screenshot.");
    }
    await onSaved();
  };

  return (
    <StepFrame
      title="Upload Screenshot Proof"
      description="Upload a screenshot showing your subscription or follow (YouTube, Facebook, Instagram or TikTok). The status must show “Subscribed” or “Following”."
      onNext={save}
      onBack={onBack}
      locked="Proof must be received by our team."
    >
      <div className="grid gap-1">
        <label htmlFor="proof" className="text-xs font-medium text-text-dark">
          Upload Screenshot{" "}
          {!submitted && <span className="text-red-600">*</span>}
        </label>
        <input
          id="proof"
          name="file"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="rounded-lg border-2 border-dashed border-primary-green/30 p-6 text-sm text-text-dark file:mr-4 file:rounded-md file:border-0 file:bg-primary-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white-color"
        />
        <p className="text-xs text-text-grey">
          JPG, PNG or PDF, up to 10 MB. Your file is stored privately and seen
          only by the ShininChrist team.
        </p>
        {submitted && (
          <p className="text-xs text-primary-green">
            A screenshot was received (
            {proofStatus === "verified" ? "verified" : "waiting for review"}).
            Upload again only to replace it.
          </p>
        )}
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
};

export default StepProof;
