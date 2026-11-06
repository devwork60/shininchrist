import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/constant/contactInfo";
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

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "application/pdf"];

const sizeLabel = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const StepProof = ({
  platform,
  proofStatus,
  onSaved,
  onBack,
}: StepProofProps) => {
  const submitted = proofStatus !== "not_submitted";
  const [picked, setPicked] = useState<{
    name: string;
    size: number;
    preview: string | null;
  } | null>(null);
  const [fileError, setFileError] = useState("");

  // Free the preview image when it is replaced or the step closes.
  useEffect(
    () => () => {
      if (picked?.preview) URL.revokeObjectURL(picked.preview);
    },
    [picked],
  );

  /** Checks the file as soon as it is chosen, so a wrong type or an oversize file is caught before uploading. */
  const choose = (input: HTMLInputElement) => {
    const file = input.files?.[0];
    setFileError("");
    if (!file) return setPicked(null);
    if (!ALLOWED.includes(file.type)) {
      input.value = "";
      setPicked(null);
      return setFileError("Please choose a JPG, PNG or PDF file.");
    }
    if (file.size > MAX_BYTES) {
      input.value = "";
      setPicked(null);
      return setFileError(
        `That file is ${sizeLabel(file.size)}. The limit is 4 MB.`,
      );
    }
    setPicked({
      name: file.name,
      size: file.size,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    });
  };

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
          onChange={(event) => choose(event.currentTarget)}
          className="w-full min-w-0 rounded-lg border-2 border-dashed border-primary-green/30 p-6 text-sm text-text-dark file:mr-4 file:rounded-md file:border-0 file:bg-primary-green file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white-color"
        />
        {fileError && (
          <p role="alert" className="text-sm text-red-800">
            {fileError}
          </p>
        )}
        {picked && (
          <div className="flex items-center gap-3 rounded-md border border-primary-green/15 bg-cream p-2 text-sm text-text-dark">
            {picked.preview ? (
              // A local preview of the chosen screenshot (not uploaded yet).
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={picked.preview}
                alt="Preview of your screenshot"
                className="h-16 w-16 rounded object-cover"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded bg-white-color text-xs font-semibold">
                PDF
              </span>
            )}
            <span className="min-w-0">
              <span className="block truncate font-medium">{picked.name}</span>
              <span className="text-xs text-text-grey">
                {sizeLabel(picked.size)}. Ready to upload.
              </span>
            </span>
          </div>
        )}
        <p className="text-xs text-text-grey">
          JPG, PNG or PDF, up to 4 MB. Your file is stored privately and seen
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
      <section
        aria-labelledby="whatsapp-proof-title"
        className="grid gap-3 rounded-lg border border-primary-green/15 bg-cream p-4"
      >
        <h3
          id="whatsapp-proof-title"
          className="font-heading text-lg font-semibold text-card-heading"
        >
          Or send your screenshot on WhatsApp
        </h3>
        <p className="text-sm text-text-dark">
          You can upload it above. If uploading does not work for you, or you
          prefer WhatsApp, follow these three steps:
        </p>
        <ol className="grid gap-2 text-sm text-text-dark">
          <li>
            <strong>1. Open WhatsApp.</strong> Tap the green button below to
            open the official ShininChrist WhatsApp chat ({CONTACT.whatsappNumber}).
          </li>
          <li>
            <strong>2. Attach your screenshot.</strong> In the chat, tap the
            paperclip or + button and choose the screenshot that shows you
            completed the social media step (it should say “Subscribed” or
            “Following”).
          </li>
          <li>
            <strong>3. Send it to ShininChrist.</strong> Type the name and email
            you registered with, so we can match it to your registration, then
            press Send.
          </li>
        </ol>
        <div>
          <ExternalAction
            url={JOIN_LINKS.whatsapp}
            text="Send Screenshot on WhatsApp"
            tone="whatsapp"
          />
        </div>
        <p className="text-xs text-text-grey">
          This button only opens WhatsApp. Your screenshot is not sent until you
          attach it and press Send yourself.
        </p>
      </section>
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
