"use client";

import { useMemo, useState } from "react";
import SearchIcon from "@/components/icons/UiIconsSearch";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import {
  ARCHIVE_ENTRIES,
  ARCHIVE_PAGE,
  type ArchiveEntryData,
} from "@/constant/dailyArchiveData";
import ArchiveEntryRow from "./ArchiveEntryRow";
import ArchiveFilterSelect from "./ArchiveFilterSelect";

const monthKey = (entry: ArchiveEntryData) => entry.date.slice(0, 7);

const monthLabel = (key: string) =>
  new Date(`${key}-01T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const unique = (values: string[]) => Array.from(new Set(values));

/** Search box, three filters and the (locked) entry list. */
const ArchiveBrowser = () => {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("");
  const [topic, setTopic] = useState("");
  const [book, setBook] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARCHIVE_ENTRIES.filter(
      (entry) =>
        (!month || monthKey(entry) === month) &&
        (!topic || entry.topic === topic) &&
        (!book || entry.book === book) &&
        (!q ||
          [entry.title, entry.scripture, entry.topic]
            .join(" ")
            .toLowerCase()
            .includes(q)),
    );
  }, [query, month, topic, book]);

  return (
    <div>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ARCHIVE_PAGE.searchPlaceholder}
          aria-label="Search the archive"
          className="w-full rounded-xl border border-primary-green/20 bg-white-color px-4 py-3.5 pr-12 font-sans text-sm text-text-dark outline-none transition-colors placeholder:text-text-grey focus:border-primary-green"
        />
        <SearchIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-dark" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <ArchiveFilterSelect
          label="Filter by month"
          allLabel="All Months"
          value={month}
          onChange={setMonth}
          options={unique(ARCHIVE_ENTRIES.map(monthKey)).map((key) => ({
            value: key,
            label: monthLabel(key),
          }))}
        />
        <ArchiveFilterSelect
          label="Filter by topic"
          allLabel="All Topics"
          value={topic}
          onChange={setTopic}
          options={unique(ARCHIVE_ENTRIES.map((e) => e.topic)).map((t) => ({
            value: t,
            label: t,
          }))}
        />
        <ArchiveFilterSelect
          label="Filter by scripture"
          allLabel="All Scripture"
          value={book}
          onChange={setBook}
          options={unique(ARCHIVE_ENTRIES.map((e) => e.book)).map((b) => ({
            value: b,
            label: b,
          }))}
        />
      </div>

      {results.length > 0 ? (
        <ul className="mt-5">
          {results.map(({ id, title, scripture, date, image, imageAlt }) => (
            <ArchiveEntryRow
              key={id}
              title={title}
              scripture={scripture}
              date={date}
              image={image}
              imageAlt={imageAlt}
            />
          ))}
        </ul>
      ) : (
        <CardDescSm className="mt-8 text-center !text-text-dark">
          No entries match your search.
        </CardDescSm>
      )}
    </div>
  );
};

export default ArchiveBrowser;
