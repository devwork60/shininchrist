import type { FormEvent, ReactNode } from "react";
import CardDescSm from "@/components/pages/typography/CardDescSm";

interface StepFrameProps {
  title: string;
  description: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  /** The green "lock" note under the step, as in the mockup (e.g. "Subscription is required.") */
  locked?: string;
}

/** Shared step layout: heading, body, lock note and Back / Continue buttons. */
const StepFrame = ({
  title,
  description,
  children,
  onNext,
  onBack,
  nextLabel = "Continue",
  locked,
}: StepFrameProps) => {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary-green">
          {title}
        </h2>
        <CardDescSm className="mt-1 !text-base">{description}</CardDescSm>
      </div>
      {children}
      {locked && (
        <p className="rounded-md bg-primary-green px-4 py-2.5 text-sm font-medium text-white-color">
          🔒 {locked}
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="rounded-md border border-primary-green/30 px-5 py-3 text-sm font-semibold text-text-dark hover:bg-cream"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          className="rounded-md bg-primary-gold px-6 py-3 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green"
        >
          {nextLabel}
        </button>
      </div>
    </form>
  );
};

export default StepFrame;
