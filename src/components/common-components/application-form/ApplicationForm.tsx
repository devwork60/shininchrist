"use client";

import { useState, type FormEvent } from "react";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import type { FormConfig } from "@/constant/forms/formTypes";
import {
  STALLED_MESSAGE,
  openPaystackCheckout,
} from "@/lib/payments/paystack-popup";
import FormField from "./FormField";

/**
 * Data-driven application / inquiry form (Serve forms, Give forms).
 * DESIGN ONLY: validates in the browser and shows the confirmation. Nothing is sent or saved yet.
 * TODO: post to the backend / admin inbox and send the notification email when they exist.
 */
const ApplicationForm = ({ config }: { config: FormConfig }) => {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [stalledUrl, setStalledUrl] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Payment forms: send the details to our server, then go to the secure checkout it returns.
    if (config.submitTo) {
      const form = new FormData(event.currentTarget);
      const body: Record<string, FormDataEntryValue | FormDataEntryValue[]> =
        {};
      for (const key of new Set(form.keys())) {
        const values = form.getAll(key);
        body[key] = values.length > 1 ? values : values[0];
      }
      setBusy(true);
      setError("");
      setStalledUrl(null);
      try {
        const res = await fetch(config.submitTo, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          await openPaystackCheckout(data, (url) => setStalledUrl(url));
          setBusy(false);
          return;
        }
        setError(data.error ?? "Something went wrong. Please try again.");
      } catch {
        setError(
          "Could not reach the server. Please check your connection and try again.",
        );
      }
      setBusy(false);
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-xl border border-primary-gold/40 bg-white-color p-8 text-center shadow-sm"
      >
        <h2 className="font-heading text-2xl font-semibold text-primary-green">
          {config.successTitle}
        </h2>
        <CardDescSm className="mx-auto mt-3 max-w-xl !text-base !text-text-dark">
          {config.successText}
        </CardDescSm>
      </div>
    );
  }

  return (
    <form
      id={config.id}
      onSubmit={onSubmit}
      className="grid gap-7 rounded-xl border border-primary-green/10 bg-white-color p-5 shadow-sm sm:p-8"
    >
      {config.sections.map((section) => (
        <fieldset key={section.title} className="grid gap-4">
          <legend className="mb-4 w-full rounded-sm bg-primary-green/10 px-3 py-2 font-heading text-lg font-semibold text-primary-green">
            {section.title}
          </legend>
          {section.intro && <CardDescSm>{section.intro}</CardDescSm>}
          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
            {section.fields.map((field) => (
              <FormField key={field.id} {...field} />
            ))}
          </div>
        </fieldset>
      ))}

      <button
        type="submit"
        disabled={busy}
        className="rounded-md bg-primary-green px-6 py-3.5 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green-deep"
      >
        {busy ? "Please wait…" : config.submit}
      </button>
      {stalledUrl && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {STALLED_MESSAGE}{" "}
          <a
            href={stalledUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Open the payment page in a new tab
          </a>
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
      {config.footnote && (
        <CardDescSm className="text-center !text-xs">
          {config.footnote}
        </CardDescSm>
      )}
    </form>
  );
};

export default ApplicationForm;
