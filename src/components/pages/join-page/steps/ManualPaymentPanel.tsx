import { useEffect, useMemo, useState, type FormEvent } from "react";
import { getJson, postForm } from "../joinApi";
import {
  MethodSelector,
  PaymentSummary,
  money,
  type Method,
  type Price,
} from "./PaymentParts";
import type { UniformDetails } from "./StepUniform";

interface Info {
  bank: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    instructions: string | null;
  } | null;
  payment: {
    status: string;
    amount: number;
    currency: string;
    submittedAt: string | null;
    rejectionReason: string | null;
  } | null;
}

interface Props {
  details: UniformDetails;
  price: Price | null | undefined;
  onMethod: (method: Method) => void;
  onBack: () => void;
}

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-3 py-1.5 text-sm text-text-dark">
    <dt>{label}</dt>
    <dd className="text-right font-semibold">{value}</dd>
  </div>
);

const box = "rounded-md border px-4 py-3 text-sm";

/** Manual bank transfer: show the admin's bank details, take a receipt, then wait for an admin to verify it. */
const ManualPaymentPanel = ({ details, price, onMethod, onBack }: Props) => {
  const [info, setInfo] = useState<Info | null | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const load = () =>
    getJson<Info>("/api/payments/uniform-manual")
      .then(setInfo)
      .catch(() => setInfo(null));

  useEffect(() => {
    load();
  }, []);

  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const choose = (chosen: File | null) => {
    setError("");
    if (chosen && !TYPES.includes(chosen.type))
      return setError("Please choose a JPG, PNG or WebP image.");
    if (chosen && chosen.size > MAX_BYTES)
      return setError("The image is too large (maximum 4 MB).");
    setFile(chosen);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) return setError("Please choose your payment receipt first.");
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      for (const key of ["size", "quantity", "deliveryType", "address", "city", "state", "phone"] as const)
        body.append(key, details[key]);
      body.append("receipt", file);
      await postForm("/api/payments/uniform-manual", body);
      setFile(null);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(info?.bank?.accountNumber ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The number is still on screen if the clipboard is blocked.
    }
  };

  const quantity = Math.max(1, Number(details.quantity) || 1);
  const payment = info?.payment;
  const waiting = payment?.status === "pending_verification";
  const rejected = payment?.status === "rejected";

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary-green">
          Pay for Uniform + Delivery
        </h2>
        <p className="mt-1 text-base text-text-grey">
          Pay into our bank account, then upload your receipt. An admin checks it
          before your order is confirmed.
        </p>
      </div>
      <PaymentSummary price={price} size={details.size} quantity={quantity} />
      <MethodSelector method="manual" onChange={onMethod} disabled={busy} />

      {info === undefined && <p className="text-sm text-text-grey">Loading…</p>}
      {info && !info.bank && !payment && (
        <p role="alert" className={`${box} border-red-200 bg-red-50 text-red-800`}>
          Bank transfer is not available yet. Please pay by card, or contact us
          and we will help you pay.
        </p>
      )}

      {waiting && payment && (
        <div role="status" className={`${box} border-primary-gold/40 bg-primary-gold/10 text-text-dark`}>
          <strong>Payment proof submitted.</strong> It is awaiting admin
          verification
          {payment.submittedAt
            ? ` (sent ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(payment.submittedAt))})`
            : ""}
          . Your order is confirmed once it is approved. You can check the
          status on My Account.
        </div>
      )}

      {rejected && payment && (
        <div role="alert" className={`${box} border-red-200 bg-red-50 text-red-800`}>
          <strong>Your payment proof was not accepted.</strong> Reason:{" "}
          {payment.rejectionReason}. Please upload a new receipt below.
        </div>
      )}

      {info?.bank && !waiting && (
        <form onSubmit={submit} className="grid gap-4">
          <dl className="rounded-lg border border-primary-green/15 bg-white-color p-4">
            <Row label="Bank" value={info.bank.bankName} />
            <Row label="Account title" value={info.bank.accountTitle} />
            <div className="flex items-center justify-between gap-3 py-1.5 text-sm text-text-dark">
              <dt>Account number / IBAN</dt>
              <dd className="flex items-center gap-3 font-semibold">
                <span className="tracking-wider">{info.bank.accountNumber}</span>
                <button
                  type="button"
                  onClick={copy}
                  className="rounded-md border border-primary-green/30 px-3 py-1 text-xs font-semibold hover:bg-cream"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </dd>
            </div>
            {price && (
              <Row
                label="Amount to send"
                value={money(
                  payment?.amount ?? price.uniformPrice * quantity + price.deliveryFee,
                  payment?.currency ?? price.currency,
                )}
              />
            )}
          </dl>
          {info.bank.instructions && (
            <p className="whitespace-pre-line text-sm text-text-dark">
              {info.bank.instructions}
            </p>
          )}
          <label className="grid gap-1.5 text-sm font-medium text-text-dark">
            Payment receipt or screenshot (JPG, PNG or WebP, up to 4 MB)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => choose(e.target.files?.[0] ?? null)}
              className="rounded-md border border-primary-green/20 bg-white-color p-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-primary-green file:px-3 file:py-1.5 file:text-white-color"
            />
          </label>
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Your receipt preview"
              className="max-h-64 w-auto max-w-full rounded-md border border-primary-green/15 object-contain"
            />
          )}
          {error && (
            <p role="alert" className={`${box} border-red-200 bg-red-50 text-red-800`}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !file}
            className="rounded-md bg-primary-gold px-6 py-3 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Submitting…" : "Submit payment proof"}
          </button>
        </form>
      )}

      <div>
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-primary-green/30 px-5 py-3 text-sm font-semibold text-text-dark hover:bg-cream"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ManualPaymentPanel;
