"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DailyEntry, DailyTodayContent } from "@/lib/site-content-schema";
import DailyEntriesForm from "./DailyEntriesForm";
import DailyTodayForm from "./DailyTodayForm";

/**
 * The whole Daily editor with ONE save button. The activities (and their photos) and the dated entries used to
 * have a button each, so a photo added in one part was lost when the other part's button was pressed.
 */
const DailyEditor = ({
  today,
  entries,
}: {
  today: DailyTodayContent;
  entries: DailyEntry[];
}) => {
  const router = useRouter();
  const [todayValue, setToday] = useState(today);
  const [entriesValue, setEntries] = useState(entries);
  const [savedToday, setSavedToday] = useState(() => JSON.stringify(today));
  const [savedEntries, setSavedEntries] = useState(() => JSON.stringify(entries));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const onToday = useCallback((v: DailyTodayContent) => setToday(v), []);
  const onEntries = useCallback((v: DailyEntry[]) => setEntries(v), []);

  const todayJson = JSON.stringify(todayValue);
  const entriesJson = JSON.stringify(entriesValue);
  const dirtyToday = todayJson !== savedToday;
  const dirtyEntries = entriesJson !== savedEntries;
  const dirty = dirtyToday || dirtyEntries;

  // Warn before leaving the page with changes that were never saved.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const post = async (key: string, body: unknown) => {
    const res = await fetch(`/api/admin/content/${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, error: (data.error as string | undefined) ?? "Could not save." };
  };

  const save = async () => {
    setBusy(true);
    setMessage(null);
    const saved: string[] = [];
    if (dirtyToday) {
      const r = await post("daily_today", todayValue);
      if (!r.ok) {
        setBusy(false);
        return setMessage({ ok: false, text: `Activities were not saved: ${r.error}` });
      }
      setSavedToday(todayJson);
      saved.push("activities");
    }
    if (dirtyEntries) {
      const r = await post("daily_entries", { items: entriesValue });
      if (!r.ok) {
        setBusy(false);
        return setMessage({
          ok: false,
          text: `${saved.length ? "Activities were saved, but the" : "The"} entries were not saved: ${r.error}`,
        });
      }
      setSavedEntries(entriesJson);
      saved.push("entries");
    }
    setBusy(false);
    setMessage({
      ok: true,
      text: saved.length
        ? `Saved (${saved.join(" and ")}). The public Daily pages now show this.`
        : "Nothing to save: there are no changes.",
    });
    router.refresh();
  };

  return (
    <div className="grid gap-6">
      <DailyTodayForm initial={today} onChange={onToday} />
      <DailyEntriesForm initial={entries} onChange={onEntries} />

      <div className="sticky bottom-0 z-20 -mx-1 grid gap-2 rounded-lg border border-primary-green/15 bg-white-color p-3 shadow-lg">
        {dirty && !busy && (
          <p role="status" className="rounded-md bg-primary-gold/20 px-3 py-2 text-sm font-semibold text-card-heading">
            Unsaved changes in {[dirtyToday && "Activities", dirtyEntries && "Entries"].filter(Boolean).join(" and ")}. Visitors will
            not see them until you press “Save all changes”.
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={save}
            disabled={busy || !dirty}
            className="rounded-md bg-primary-gold px-5 py-2 text-sm font-semibold text-white-color hover:bg-primary-green disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save all changes"}
          </button>
          {message && (
            <span role="status" className={message.ok ? "text-sm text-primary-green" : "text-sm text-red-800"}>
              {message.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyEditor;
