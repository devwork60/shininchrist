"use client";

import { useState } from "react";
import { openPaystackCheckout } from "@/lib/payments/paystack-checkout";
import type { LibraryResourceView } from "@/lib/library";

const money = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

/**
 * Download button. Free resources download directly. "Give what you can" resources take any amount, including 0
 * (downloads at once); an amount above 0 goes to Paystack and unlocks the download once the payment is confirmed.
 */
const DownloadControl = ({
  resource,
  currency,
}: {
  resource: LibraryResourceView;
  currency: string;
}) => {
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const askForContribution = resource.access === "contribution" && !resource.contributed;
  const value = Number(amount);
  const giving = askForContribution && Number.isFinite(value) && value > 0;

  const go = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/library/${resource.id}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: askForContribution ? (amount === "" ? 0 : value) : undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      if (data.kind === "checkout") return openPaystackCheckout(data);
      window.location.assign(data.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-2">
      {askForContribution && (
        <label className="grid gap-1 text-xs font-medium text-gray-700">
          Give what you can ({currency}). Leave at 0 to download for free.
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-[var(--primary-green-deep)] focus:outline-none"
          />
        </label>
      )}
      {resource.contributed && resource.access === "contribution" && (
        <p className="text-xs font-medium text-[var(--primary-green-deep)]">
          Thank you for your contribution.
        </p>
      )}
      <button
        type="button"
        onClick={go}
        disabled={busy}
        className="rounded-md bg-[var(--primary-green-deep)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
      >
        {busy
          ? "Please wait…"
          : giving
            ? `Give ${money(value, currency)} & download`
            : askForContribution
              ? "Download (no contribution)"
              : "Download"}
      </button>
      {error && (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};

export default DownloadControl;
