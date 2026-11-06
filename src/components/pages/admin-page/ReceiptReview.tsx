"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface ReceiptInfo {
  paymentId: string;
  status: string;
  /** Short-lived (10 minutes) link to the uploaded bank-transfer receipt, or null when there is none. */
  url: string | null;
  amount: number;
  currency: string;
  submittedAt: string | null;
  reason: string | null;
}

const money = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

const BADGE: Record<string, { label: string; className: string }> = {
  pending_verification: { label: "Receipt waiting for you", className: "bg-primary-gold/20 text-card-heading" },
  confirmed: { label: "Receipt approved", className: "bg-primary-green/15 text-primary-green" },
  rejected: { label: "Receipt rejected", className: "bg-red-100 text-red-700" },
};

/**
 * A member's bank-transfer receipt, shown next to their subscription screenshot: view it, then approve or reject it.
 * Uses the same review route as the Payments page, so the order, emails and history are handled in one place.
 */
const ReceiptReview = ({ receipt }: { receipt: ReceiptInfo }) => {
  const router = useRouter();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const badge = BADGE[receipt.status] ?? { label: receipt.status, className: "bg-cream" };

  const decide = async (decision: "approve" | "reject") => {
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/payments/${receipt.paymentId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, reason }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error ?? "Could not save. Try again.");
    setRejecting(false);
    router.refresh();
  };

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}>{badge.label}</span>
        <span className="text-xs text-text-grey">{money(receipt.amount, receipt.currency)}</span>
        {receipt.url ? (
          <a href={receipt.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary-gold hover:underline">
            View receipt
          </a>
        ) : (
          <span className="text-xs text-text-grey">No receipt file</span>
        )}
      </div>
      {receipt.status === "rejected" && receipt.reason && (
        <p className="text-xs text-text-grey">Reason given: {receipt.reason}</p>
      )}

      {receipt.status === "pending_verification" &&
        (rejecting ? (
          <div className="grid gap-2">
            <label className="grid gap-1 text-xs font-medium text-text-dark">
              Reason for rejecting (shown to the customer)
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                maxLength={500}
                className="w-full rounded-md border border-primary-green/20 px-3 py-2 text-sm focus:border-primary-gold focus:outline-none"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={busy || reason.trim().length < 3}
                onClick={() => decide("reject")}
                className="rounded-md bg-red-700 px-3 py-1.5 text-xs font-semibold text-white-color disabled:opacity-60"
              >
                {busy ? "Saving…" : "Confirm rejection"}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => setRejecting(false)}
                className="rounded-md border border-primary-green/30 px-3 py-1.5 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => decide("approve")}
              className="rounded-md bg-primary-green px-3 py-1.5 text-xs font-semibold text-white-color disabled:opacity-60"
            >
              {busy ? "Saving…" : "Approve payment"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => setRejecting(true)}
              className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700"
            >
              Reject
            </button>
          </div>
        ))}
      {error && (
        <p role="alert" className="text-xs text-red-800">
          {error}
        </p>
      )}
    </div>
  );
};

export default ReceiptReview;
