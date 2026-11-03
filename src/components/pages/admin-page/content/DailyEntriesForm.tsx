"use client";

import { useEffect, useMemo, useState } from "react";
import type { DailyEntry } from "@/lib/site-content-schema";
import { Field, ImageUpload, Section, inputClass } from "./contentUi";

const small =
  "rounded border border-primary-green/25 px-2 py-1 text-xs font-semibold disabled:opacity-40";

const todayIso = () => new Date().toISOString().slice(0, 10);

/** Monday of the current week (UTC) as yyyy-mm-dd, the same rule the public This Week page uses. */
const weekStart = () => {
  const now = new Date();
  const day = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return new Date(day - ((now.getUTCDay() + 6) % 7) * 86400000)
    .toISOString()
    .slice(0, 10);
};

const where = (date: string) =>
  date > todayIso()
    ? { label: "Scheduled (hidden until the date)", tone: "bg-primary-gold/20 text-card-heading" }
    : date >= weekStart()
      ? { label: "This Week", tone: "bg-primary-green text-white-color" }
      : { label: "Archive", tone: "bg-cream text-text-dark" };

const newEntry = (): DailyEntry => ({
  id: `entry-${Date.now()}`,
  date: todayIso(),
  title: "New daily entry",
  scripture: "",
  book: "",
  topic: "",
  summary: "",
  reflection: "",
  assignment: "",
  image: "",
  imageAlt: "",
  videoUrl: "",
  linkText: "",
  linkUrl: "",
});

/** Adds, edits and removes the dated Daily entries (devotional, reflection, assignment, photo, video, link). */
const DailyEntriesForm = ({
  initial,
  onChange,
}: {
  initial: DailyEntry[];
  /** Called with the latest list on every edit; the page saves everything with one button. */
  onChange: (value: DailyEntry[]) => void;
}) => {
  const [entries, setEntries] = useState(initial);
  useEffect(() => onChange(entries), [entries, onChange]);
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...entries]
      .filter((e) => !q || `${e.title} ${e.scripture} ${e.topic}`.toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [entries, query]);

  const set = (id: string, patch: Partial<DailyEntry>) =>
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const remove = (id: string) => {
    if (!window.confirm("Remove this entry? It disappears when you press Save.")) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const add = () => {
    const entry = newEntry();
    setEntries((prev) => [entry, ...prev]);
    setOpen(entry.id);
    setQuery("");
  };

  return (
    <Section
      title="Daily entries: devotionals, reflections and assignments"
      hint="Each entry has a date. Entries dated this week appear under This Week, older ones in the Archive, and a future date keeps an entry hidden until that day. Members open an entry to read it, so add the devotional, reflection, assignment, a photo, a video or a link."
    >
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={add} className="rounded-md bg-primary-green px-4 py-2 text-sm font-semibold text-white-color hover:bg-primary-green-deep">
          + New entry
        </button>
        <input
          type="search"
          aria-label="Search entries"
          placeholder="Search entries…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${inputClass} max-w-xs`}
        />
        <span className="text-xs text-text-grey">{entries.length} entries</span>
      </div>

      <p className="rounded-md bg-cream px-3 py-2 text-xs text-text-dark">
        Until you save your own entries, members see the sample entries that came with the site. The first time you press Save, only the entries in this list are shown.
      </p>

      <div className="grid gap-3">
        {sorted.length === 0 && <p className="text-sm text-text-grey">No entries match.</p>}
        {sorted.map((entry) => {
          const isOpen = open === entry.id;
          const tag = where(entry.date);
          return (
            <div key={entry.id} className="rounded-lg border border-primary-green/15 bg-white-color">
              <div className="flex flex-wrap items-center gap-2 p-3">
                <button type="button" onClick={() => setOpen(isOpen ? null : entry.id)} className="min-w-0 flex-1 text-left" aria-expanded={isOpen}>
                  <span className="block truncate font-heading text-base font-semibold text-card-heading">{entry.title || "(untitled)"}</span>
                  <span className="block truncate text-xs text-text-grey">
                    {entry.date}
                    {entry.scripture ? ` · ${entry.scripture}` : ""}
                  </span>
                </button>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tag.tone}`}>{tag.label}</span>
                <button type="button" className={`${small} text-red-800`} onClick={() => remove(entry.id)} aria-label={`Remove ${entry.title}`}>✕</button>
              </div>

              {isOpen && (
                <div className="grid gap-4 border-t border-primary-green/10 p-4 md:grid-cols-[minmax(0,230px)_minmax(0,1fr)]">
                  <div className="grid content-start gap-3">
                    <ImageUpload optional value={entry.image} onChange={(url) => set(entry.id, { image: url })} />
                    <Field label="Photo description (for screen readers)">
                      <input className={inputClass} value={entry.imageAlt} maxLength={160} onChange={(e) => set(entry.id, { imageAlt: e.target.value })} />
                    </Field>
                  </div>
                  <div className="grid min-w-0 gap-3">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,170px)_minmax(0,1fr)]">
                      <Field label="Date">
                        <input type="date" className={inputClass} value={entry.date} onChange={(e) => set(entry.id, { date: e.target.value })} />
                      </Field>
                      <Field label="Title">
                        <input className={inputClass} value={entry.title} maxLength={120} onChange={(e) => set(entry.id, { title: e.target.value })} />
                      </Field>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Field label="Scripture (e.g. Psalm 46:10)">
                        <input className={inputClass} value={entry.scripture} maxLength={120} onChange={(e) => set(entry.id, { scripture: e.target.value })} />
                      </Field>
                      <Field label="Bible book (for the filter)">
                        <input className={inputClass} value={entry.book} maxLength={60} onChange={(e) => set(entry.id, { book: e.target.value })} />
                      </Field>
                      <Field label="Topic (for the filter)">
                        <input className={inputClass} value={entry.topic} maxLength={60} onChange={(e) => set(entry.id, { topic: e.target.value })} />
                      </Field>
                    </div>
                    <Field label="Devotional (leave a blank line between paragraphs)">
                      <textarea className={inputClass} rows={6} maxLength={8000} value={entry.summary} onChange={(e) => set(entry.id, { summary: e.target.value })} />
                    </Field>
                    <Field label="Reflection">
                      <textarea className={inputClass} rows={3} maxLength={4000} value={entry.reflection} onChange={(e) => set(entry.id, { reflection: e.target.value })} />
                    </Field>
                    <Field label="Assignment">
                      <textarea className={inputClass} rows={3} maxLength={4000} value={entry.assignment} onChange={(e) => set(entry.id, { assignment: e.target.value })} />
                    </Field>
                    <Field label="Video address (optional). A YouTube link plays on the page; other sites open as a link.">
                      <input className={inputClass} value={entry.videoUrl} placeholder="https://www.youtube.com/watch?v=…" onChange={(e) => set(entry.id, { videoUrl: e.target.value })} />
                    </Field>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Extra link label (optional)">
                        <input className={inputClass} value={entry.linkText} maxLength={60} onChange={(e) => set(entry.id, { linkText: e.target.value })} />
                      </Field>
                      <Field label="Extra link address (optional)">
                        <input className={inputClass} value={entry.linkUrl} placeholder="https://…" onChange={(e) => set(entry.id, { linkUrl: e.target.value })} />
                      </Field>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </Section>
  );
};

export default DailyEntriesForm;
