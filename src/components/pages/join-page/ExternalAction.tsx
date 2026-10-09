import clsx from "clsx";

interface ExternalActionProps {
  url: string;
  text: string;
  tone: "youtube" | "whatsapp" | "neutral";
}

const TONES = {
  youtube: "bg-red-600 text-white-color hover:bg-red-700",
  whatsapp: "bg-[#1fa855] text-white-color hover:bg-[#188a45]",
  neutral: "bg-primary-green text-white-color hover:bg-primary-green-deep",
};

/** Opens an official ShininChrist link. With no approved URL yet it shows "link coming soon". */
const ExternalAction = ({ url, text, tone }: ExternalActionProps) =>
  url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors",
        TONES[tone],
      )}
    >
      {text} <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <span
      aria-disabled="true"
      className="inline-flex items-center justify-center gap-2 rounded-md border border-dashed border-primary-green/30 px-5 py-3 text-sm font-semibold text-text-grey"
    >
      {text} — link coming soon
    </span>
  );

export default ExternalAction;
