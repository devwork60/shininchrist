import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getJson } from "../joinApi";

export interface TransferDetails {
  reference: string;
  amount: number;
  currency: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  expiresAt: string;
}

interface BankTransferPanelProps {
  transfer: TransferDetails;
  onChangeMethod: () => void;
}

const POLL_MS = 6000;

const money = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-3 py-1.5 text-sm text-text-dark">
    <dt>{label}</dt>
    <dd className="text-right font-semibold">{value}</dd>
  </div>
);

/** Shows the one-time bank account on OUR page and waits for Paystack to confirm the transfer. */
const BankTransferPanel = ({
  transfer,
  onChangeMethod,
}: BankTransferPanelProps) => {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(
      0,
      Math.floor((Date.parse(transfer.expiresAt) - Date.now()) / 1000),
    ),
  );
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const expired = secondsLeft === 0;

  const check = async () => {
    setChecking(true);
    try {
      const result = await getJson<{ state: string }>(
        `/api/payments/verify?reference=${encodeURIComponent(transfer.reference)}`,
      );
      if (result.state === "confirmed") {
        router.push(
          `/payment/result?reference=${encodeURIComponent(transfer.reference)}`,
        );
      }
    } catch {
      // Keep waiting: a failed check is retried automatically.
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (expired) return;
    const timer = setInterval(check, POLL_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expired, transfer.reference]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(transfer.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the number is still on screen.
    }
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="grid gap-5">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary-green">
          Pay by Bank Transfer
        </h2>
        <p className="mt-1 text-base text-text-grey">
          Transfer exactly{" "}
          <strong>{money(transfer.amount, transfer.currency)}</strong> to the
          account below from any bank app. This page confirms your payment
          automatically.
        </p>
      </div>
      <dl className="rounded-lg border border-primary-gold/40 bg-primary-gold/10 p-4">
        <Row label="Bank" value={transfer.bankName} />
        <Row label="Account name" value={transfer.accountName} />
        <div className="flex items-center justify-between gap-3 py-1.5 text-sm text-text-dark">
          <dt>Account number</dt>
          <dd className="flex items-center gap-3 font-semibold">
            <span className="text-lg tracking-wider">
              {transfer.accountNumber}
            </span>
            <button
              type="button"
              onClick={copy}
              className="rounded-md border border-primary-green/30 px-3 py-1 text-xs font-semibold hover:bg-cream"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </dd>
        </div>
        <Row label="Amount" value={money(transfer.amount, transfer.currency)} />
      </dl>
      {expired ? (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          This account number has expired. If you already sent the money, it
          will still be confirmed. Otherwise get a new account number.
        </p>
      ) : (
        <p className="text-sm text-text-grey">
          Waiting for your transfer… this account is valid for{" "}
          <strong>
            {minutes}:{seconds}
          </strong>
          . Do not close this page.
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onChangeMethod}
          className="rounded-md border border-primary-green/30 px-5 py-3 text-sm font-semibold text-text-dark hover:bg-cream"
        >
          {expired ? "Get a new account" : "Change payment method"}
        </button>
        <button
          type="button"
          onClick={check}
          disabled={checking}
          className="rounded-md bg-primary-gold px-6 py-3 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green disabled:cursor-wait disabled:opacity-70"
        >
          {checking ? "Checking…" : "I have paid"}
        </button>
      </div>
    </div>
  );
};

export default BankTransferPanel;
