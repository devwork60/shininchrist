"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import CardDescSm from "@/components/pages/typography/CardDescSm";

interface StepFrameProps {
  title: string;
  description: string;
  children: ReactNode;
  /** Receives the form fields. Throw an Error to show its message under the form. */
  onNext: (data: FormData) => void | Promise<void>;
  onBack?: () => void;
  nextLabel?: string;
  /** The green "lock" note under the step, as in the mockup (e.g. "Subscription is required.") */
  locked?: string;
}

/** Shared step layout: heading, body, lock note, error message and Back / Continue buttons. */
const StepFrame = ({
  title,
  description,
  children,
  onNext,
  onBack,
  nextLabel = "Continue",
  locked,
}: StepFrameProps) => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      await onNext(data);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Something went wrong.",
      );
    } finally {
      setBusy(false);
    }
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
      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            disabled={busy}
            className="rounded-md border border-primary-green/30 px-5 py-3 text-sm font-semibold text-text-dark hover:bg-cream disabled:opacity-60"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={busy}
          className="rounded-md bg-primary-gold px-6 py-3 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green disabled:cursor-wait disabled:opacity-70"
        >
          {busy ? "Please wait…" : nextLabel}
        </button>
      </div>
    </form>
  );
};

export default StepFrame;
