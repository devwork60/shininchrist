"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { LinkItem } from "@/lib/site-content-schema";

export const inputClass =
  "w-full min-w-0 rounded-md border border-primary-green/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold";

export const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="grid min-w-0 gap-1 text-xs font-medium text-text-dark">
    {label}
    {children}
  </label>
);

/** Saves one section through POST /api/admin/content/[key] and shows the result under the button. */
export const useSection = (sectionKey: string) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const save = async (body: unknown) => {
    setBusy(true);
    setMessage(null);
    const res = await fetch(`/api/admin/content/${sectionKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    setMessage({
      ok: res.ok,
      text: res.ok ? "Saved. The public page now shows this." : (data.error ?? "Could not save."),
    });
    if (res.ok) router.refresh();
  };
  return { busy, message, save };
};

export const SaveBar = ({
  busy,
  message,
  onSave,
}: {
  busy: boolean;
  message: { ok: boolean; text: string } | null;
  onSave: () => void;
}) => (
  <div className="flex flex-wrap items-center gap-3">
    <button
      type="button"
      onClick={onSave}
      disabled={busy}
      className="rounded-md bg-primary-gold px-5 py-2 text-sm font-semibold text-white-color hover:bg-primary-green disabled:opacity-60"
    >
      {busy ? "Saving…" : "Save changes"}
    </button>
    {message && (
      <span role="status" className={message.ok ? "text-sm text-primary-green" : "text-sm text-red-800"}>
        {message.text}
      </span>
    )}
  </div>
);

export const Section = ({ title, hint, children }: { title: string; hint: string; children: ReactNode }) => (
  <section className="grid min-w-0 gap-4 rounded-xl border border-primary-green/10 bg-white-color p-4 sm:p-5">
    <div>
      <h2 className="font-heading text-xl font-semibold text-primary-green">{title}</h2>
      <p className="mt-1 text-sm text-text-grey">{hint}</p>
    </div>
    {children}
  </section>
);

/** A list of {label, link} rows with add, remove and move up/down. */
export const LinkListEditor = ({
  title,
  rows,
  onChange,
}: {
  title: string;
  rows: LinkItem[];
  onChange: (rows: LinkItem[]) => void;
}) => {
  const set = (i: number, patch: Partial<LinkItem>) =>
    onChange(rows.map((row, k) => (k === i ? { ...row, ...patch } : row)));
  const move = (i: number, by: -1 | 1) => {
    const next = [...rows];
    const j = i + by;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const small = "rounded border border-primary-green/25 px-2 py-1 text-xs font-semibold disabled:opacity-40";

  return (
    <div className="grid gap-2">
      <p className="text-sm font-semibold text-card-heading">{title}</p>
      {rows.map((row, i) => (
        <div key={i} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]">
          <input aria-label="Label" className={inputClass} value={row.label} onChange={(e) => set(i, { label: e.target.value })} />
          <input aria-label="Link" className={inputClass} value={row.href} onChange={(e) => set(i, { href: e.target.value })} placeholder="/page or https://…" />
          <div className="flex gap-1">
            <button type="button" className={small} disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">↑</button>
            <button type="button" className={small} disabled={i === rows.length - 1} onClick={() => move(i, 1)} aria-label="Move down">↓</button>
            <button type="button" className={`${small} text-red-800`} onClick={() => onChange(rows.filter((_, k) => k !== i))} aria-label="Remove">✕</button>
          </div>
        </div>
      ))}
      <button type="button" className={`${small} w-fit`} onClick={() => onChange([...rows, { label: "", href: "/" }])}>
        + Add link
      </button>
    </div>
  );
};
