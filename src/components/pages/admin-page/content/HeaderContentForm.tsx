"use client";

import { useState } from "react";
import type { HeaderItem } from "@/lib/site-content-schema";
import { LinkListEditor, SaveBar, Section, inputClass, useSection } from "./contentUi";

/** Edits the main menu: each item's label and link, and the pages in its dropdown. */
const HeaderContentForm = ({ initial }: { initial: HeaderItem[] }) => {
  const [items, setItems] = useState(initial);
  const { busy, message, save } = useSection("header");

  const setItem = (i: number, patch: Partial<HeaderItem>) =>
    setItems(items.map((item, k) => (k === i ? { ...item, ...patch } : item)));

  return (
    <Section title="Header menu" hint="The main navigation at the top of every page. Dropdown rows keep their icon and description from the design.">
      <div className="grid gap-4">
        {items.map((item, i) => (
          <div key={i} className="grid gap-3 rounded-lg border border-primary-green/10 p-4">
            <div className="grid gap-2 sm:grid-cols-2">
              <input aria-label="Menu label" className={`${inputClass} font-semibold`} value={item.label} onChange={(e) => setItem(i, { label: e.target.value })} />
              <input aria-label="Menu link" className={inputClass} value={item.href} onChange={(e) => setItem(i, { href: e.target.value })} />
            </div>
            <LinkListEditor title="Dropdown pages" rows={item.children} onChange={(rows) => setItem(i, { children: rows })} />
          </div>
        ))}
      </div>
      <SaveBar busy={busy} message={message} onSave={() => save({ items })} />
    </Section>
  );
};

export default HeaderContentForm;
