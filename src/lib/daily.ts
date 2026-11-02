import type { DailyEntry } from "@/lib/site-content-schema";

/** Date rules for the Daily pages. Dates are plain yyyy-mm-dd and are compared as UTC days. */

const DAY_MS = 24 * 60 * 60 * 1000;

export const todayIso = (now = new Date()) => now.toISOString().slice(0, 10);

/** Monday of the week that contains `now`, as yyyy-mm-dd. */
export const weekStartIso = (now = new Date()) => {
  const day = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const sinceMonday = (now.getUTCDay() + 6) % 7;
  return new Date(day - sinceMonday * DAY_MS).toISOString().slice(0, 10);
};

export const weekEndIso = (now = new Date()) =>
  new Date(Date.parse(`${weekStartIso(now)}T00:00:00Z`) + 6 * DAY_MS)
    .toISOString()
    .slice(0, 10);

const byDateDesc = (a: DailyEntry, b: DailyEntry) =>
  b.date.localeCompare(a.date) || a.title.localeCompare(b.title);

/** Entries dated in the current Monday-to-Sunday week and not in the future, newest first. */
export const thisWeekEntries = (entries: DailyEntry[], now = new Date()) =>
  entries
    .filter(
      (e) =>
        e.date >= weekStartIso(now) &&
        e.date <= weekEndIso(now) &&
        e.date <= todayIso(now),
    )
    .sort(byDateDesc);

/** Entries from before this week (the archive), newest first. Future-dated entries stay hidden. */
export const archiveEntries = (entries: DailyEntry[], now = new Date()) =>
  entries.filter((e) => e.date < weekStartIso(now)).sort(byDateDesc);

/** An entry has its own page only when there is something to read or watch on it. */
export const hasDetail = (e: DailyEntry) =>
  Boolean(e.summary || e.reflection || e.assignment || e.videoUrl || e.linkUrl);

export const formatDay = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });

export const formatLongDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
