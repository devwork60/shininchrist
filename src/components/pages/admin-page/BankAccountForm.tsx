"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BankAccountRow } from "@/lib/payments/bank-accounts";

const input =
  "w-full rounded-md border border-primary-green/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold";

const Account = ({
  currency,
  saved,
}: {
  currency: string;
  saved: BankAccountRow | undefined;
}) => {
  const router = useRouter();
  const [bankName, setBankName] = useState(saved?.bankName ?? "");
  const [accountTitle, setAccountTitle] = useState(saved?.accountTitle ?? "");
  const [accountNumber, setAccountNumber] = useState(saved?.accountNumber ?? "");
  const [instructions, setInstructions] = useState(saved?.instructions ?? "");
  const [active, setActive] = useState(saved?.active ?? true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const save = async () => {
    setBusy(true);
    setMessage(null);
    const res = await fetch("/api/admin/bank-accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currency, bankName, accountTitle, accountNumber, instructions, active }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    setMessage({ ok: res.ok, text: res.ok ? "Saved" : (data.error ?? "Could not save.") });
    if (res.ok) router.refresh();
  };

  return (
    <li className="grid gap-3 rounded-xl border border-primary-green/10 bg-white-color p-4">
      <p className="font-heading text-lg font-semibold text-card-heading">
        {currency} account{" "}
        <span className="text-xs font-normal text-text-grey">
          {saved ? (saved.active ? "· shown to customers" : "· turned off") : "· not set yet"}
        </span>
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-xs font-medium text-text-dark">
          Bank name
          <input className={input} value={bankName} onChange={(e) => setBankName(e.target.value)} />
        </label>
        <label className="grid gap-1 text-xs font-medium text-text-dark">
          Account title
          <input className={input} value={accountTitle} onChange={(e) => setAccountTitle(e.target.value)} />
        </label>
        <label className="grid gap-1 text-xs font-medium text-text-dark sm:col-span-2">
          Account number or IBAN
          <input className={input} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
        </label>
        <label className="grid gap-1 text-xs font-medium text-text-dark sm:col-span-2">
          Payment instructions (optional, e.g. what to write as the reference)
          <textarea className={input} rows={3} maxLength={1000} value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-text-dark">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="accent-primary-gold" />
          Show to customers
        </label>
        <button
          type="button"
          onClick={save}
          disabled={busy}
          className="rounded-md bg-primary-gold px-5 py-2 text-sm font-semibold text-white-color hover:bg-primary-green disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save"}
        </button>
        {message && (
          <span role="status" className={message.ok ? "text-sm text-primary-green" : "text-sm text-red-800"}>
            {message.text}
          </span>
        )}
      </div>
    </li>
  );
};

const BankAccountForm = ({ accounts }: { accounts: BankAccountRow[] }) => (
  <ul className="grid gap-4">
    {["NGN", "USD"].map((currency) => (
      <Account
        key={currency}
        currency={currency}
        saved={accounts.find((account) => account.currency === currency)}
      />
    ))}
  </ul>
);

export default BankAccountForm;
