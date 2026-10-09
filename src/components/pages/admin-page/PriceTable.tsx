"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PriceRow } from "@/lib/members-admin";

interface CountryRow {
  name: string;
  code: string;
  price: PriceRow | null;
}

const input =
  "w-full rounded-md border border-primary-green/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold";

const Row = ({ row }: { row: CountryRow }) => {
  const router = useRouter();
  const { price } = row;
  const [currency, setCurrency] = useState(price?.currency ?? "NGN");
  const [uniformPrice, setUniformPrice] = useState(
    price ? String(price.uniformPrice) : "",
  );
  const [deliveryFee, setDeliveryFee] = useState(
    price ? String(price.deliveryFee) : "0",
  );
  const [active, setActive] = useState(price?.active ?? true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  const save = async () => {
    setBusy(true);
    setMessage(null);
    const res = await fetch("/api/admin/uniform-prices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        countryCode: row.code,
        currency,
        uniformPrice,
        deliveryFee,
        active,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    setMessage({
      ok: res.ok,
      text: res.ok ? "Saved" : (data.error ?? "Could not save."),
    });
    if (res.ok) router.refresh();
  };

  return (
    <li className="grid gap-3 rounded-xl border border-primary-green/10 bg-white-color p-4 lg:grid-cols-[1.2fr_0.7fr_1fr_1fr_auto_auto] lg:items-end">
      <div>
        <p className="font-heading text-lg font-semibold text-card-heading">
          {row.name}
        </p>
        <p className="text-xs text-text-grey">
          {row.code} ·{" "}
          {price
            ? price.active
              ? "price is set"
              : "turned off"
            : "no price yet"}
        </p>
      </div>
      <label className="grid gap-1 text-xs font-medium text-text-dark">
        Currency
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className={input}
        >
          <option value="NGN">NGN (Naira)</option>
          <option value="USD">USD (Dollar)</option>
        </select>
      </label>
      <label className="grid gap-1 text-xs font-medium text-text-dark">
        Uniform price
        <input
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          value={uniformPrice}
          onChange={(e) => setUniformPrice(e.target.value)}
          placeholder="e.g. 5000"
          className={input}
        />
      </label>
      <label className="grid gap-1 text-xs font-medium text-text-dark">
        Delivery fee
        <input
          type="number"
          min="0"
          step="0.01"
          inputMode="decimal"
          value={deliveryFee}
          onChange={(e) => setDeliveryFee(e.target.value)}
          placeholder="0"
          className={input}
        />
      </label>
      <label className="flex items-center gap-2 pb-2 text-xs font-medium text-text-dark">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="h-4 w-4 accent-[var(--primary-green)]"
        />
        On
      </label>
      <div className="grid gap-1">
        <button
          type="button"
          onClick={save}
          disabled={busy || !uniformPrice}
          className="rounded-md bg-primary-green px-4 py-2 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "Saving…" : "Save"}
        </button>
        {message && (
          <span
            role="status"
            className={`text-xs font-semibold ${message.ok ? "text-primary-green" : "text-red-700"}`}
          >
            {message.text}
          </span>
        )}
      </div>
    </li>
  );
};

/** One row per country, so an admin can set or change the uniform price without touching the database. */
const PriceTable = ({ rows }: { rows: CountryRow[] }) => (
  <ul className="grid gap-3">
    {rows.map((row) => (
      <Row
        key={`${row.code}-${row.price?.uniformPrice ?? "x"}-${row.price?.deliveryFee ?? "x"}-${row.price?.currency ?? "x"}-${row.price?.active ?? "x"}`}
        row={row}
      />
    ))}
  </ul>
);

export default PriceTable;
