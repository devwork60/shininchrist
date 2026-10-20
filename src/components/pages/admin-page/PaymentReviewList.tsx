"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ManualPaymentRow } from "@/lib/payments/manual-review";

const when = (value: Date | string | null) =>
  value
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(value))
    : "—";

const money = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

const BADGES: Record<string, { label: string; className: string }> = {
  pending_verification: {
    label: "Awaiting verification",
    className: "bg-primary-gold/20 text-card-heading",
  },
  confirmed: { label: "Paid", className: "bg-primary-green text-white-color" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
};

const Card = ({ row }: { row: ManualPaymentRow }) => {
  const router = useRouter();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const badge = BADGES[row.status] ?? { label: row.status, className: "bg-cream" };

  const decide = async (decision: "approve" | "reject") => {
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/payments/${row.id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, reason }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error ?? "Could not save. Try again.");
    router.refresh();
  };

  return (
    <li className="grid gap-4 rounded-xl border border-primary-green/10 bg-white-color p-4 lg:grid-cols-[1fr_16rem]">
      <div className="grid gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-heading text-lg font-semibold text-card-heading">
              {row.customer || row.email}
            </p>
            <p className="text-xs text-text-grey">
              {row.email} · Order {row.orderRef ?? "—"} · Ref {row.reference}
            </p>
            <p className="text-xs text-text-grey">{row.item}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-text-dark">
          <dt className="text-text-grey">Method</dt>
          <dd>Bank transfer</dd>
          <dt className="text-text-grey">Amount</dt>
          <dd className="font-semibold">{money(row.amount, row.currency)}</dd>
          <dt className="text-text-grey">Submitted</dt>
          <dd>{when(row.submittedAt)}</dd>
          {row.reviewedAt && (
            <>
              <dt className="text-text-grey">Reviewed</dt>
              <dd>{when(row.reviewedAt)}</dd>
            </>
          )}
          {row.rejectionReason && (
            <>
              <dt className="text-text-grey">Reason</dt>
              <dd>{row.rejectionReason}</dd>
            </>
          )}
        </dl>

        {row.status === "pending_verification" && (
          <div className="grid gap-2">
            {rejecting ? (
              <>
                <label className="grid gap-1 text-xs font-medium text-text-dark">
                  Reason for rejecting (shown to the customer)
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    maxLength={500}
                    className="w-full rounded-md border border-primary-green/20 px-3 py-2 text-sm focus:border-primary-gold focus:outline-none"
                  />
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busy || reason.trim().length < 3}
                    onClick={() => decide("reject")}
                    className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white-color disabled:opacity-60"
                  >
                    {busy ? "Saving…" : "Confirm rejection"}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setRejecting(false)}
                    className="rounded-md border border-primary-green/30 px-4 py-2 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => decide("approve")}
                  className="rounded-md bg-primary-green px-4 py-2 text-sm font-semibold text-white-color disabled:opacity-60"
                >
                  {busy ? "Saving…" : "Approve payment"}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setRejecting(true)}
                  className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-800"
                >
                  Reject
                </button>
              </div>
            )}
            {error && (
              <p role="alert" className="text-sm text-red-800">
                {error}
              </p>
            )}
          </div>
        )}

        {row.events.length > 0 && (
          <details className="text-sm">
            <summary className="cursor-pointer font-semibold text-primary-green">
              History ({row.events.length})
            </summary>
            <ul className="mt-2 grid gap-1 text-text-dark">
              {row.events.map((event, index) => (
                <li key={index}>
                  <span className="font-medium capitalize">{event.event}</span>{" "}
                  · {when(event.at)}
                  {event.by ? ` · ${event.by}` : ""}
                  {event.note ? ` · “${event.note}”` : ""}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <div>
        {row.receiptUrl ? (
          <a href={row.receiptUrl} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={row.receiptUrl}
              alt={`Receipt from ${row.customer || row.email}`}
              className="max-h-72 w-full rounded-md border border-primary-green/15 object-contain"
            />
            <span className="mt-1 block text-xs font-semibold text-primary-gold">
              Open full size (link expires in 10 minutes)
            </span>
          </a>
        ) : (
          <p className="text-sm text-text-grey">No receipt available.</p>
        )}
      </div>
    </li>
  );
};

const PaymentReviewList = ({ rows }: { rows: ManualPaymentRow[] }) => {
  const waiting = rows.filter((row) => row.status === "pending_verification");
  const done = rows.filter((row) => row.status !== "pending_verification");
  return (
    <div className="grid gap-8">
      <section>
        <h2 className="mb-3 font-heading text-xl font-semibold text-primary-green">
          Awaiting verification ({waiting.length})
        </h2>
        {waiting.length === 0 ? (
          <p className="text-sm text-text-grey">Nothing to review right now.</p>
        ) : (
          <ul className="grid gap-4">
            {waiting.map((row) => (
              <Card key={row.id} row={row} />
            ))}
          </ul>
        )}
      </section>
      {done.length > 0 && (
        <section>
          <h2 className="mb-3 font-heading text-xl font-semibold text-primary-green">
            Recently reviewed
          </h2>
          <ul className="grid gap-4">
            {done.map((row) => (
              <Card key={row.id} row={row} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default PaymentReviewList;
