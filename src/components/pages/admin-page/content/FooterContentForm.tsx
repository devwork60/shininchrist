"use client";

import { useState } from "react";
import type { FooterContent } from "@/lib/site-content-schema";
import { Field, LinkListEditor, SaveBar, Section, inputClass, useSection } from "./contentUi";

const LISTS = [
  ["explore", "Explore column"],
  ["involved", "Get Involved column"],
  ["support", "Support column"],
  ["legal", "Bottom bar (legal links)"],
] as const;

const NAMES: Record<string, string> = {
  youtube: "YouTube",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
};

/** Edits the footer link columns, contact details and social media addresses. */
const FooterContentForm = ({ initial }: { initial: FooterContent }) => {
  const [c, setC] = useState(initial);
  const { busy, message, save } = useSection("footer");

  const setSocial = (id: string, patch: Partial<FooterContent["social"][number]>) =>
    setC({ ...c, social: c.social.map((s) => (s.id === id ? { ...s, ...patch } : s)) });

  return (
    <Section title="Footer" hint="Appears at the bottom of every page. A link can be /page, https://…, mailto: or tel:.">
      <div className="grid gap-5 lg:grid-cols-2">
        {LISTS.map(([key, title]) => (
          <LinkListEditor key={key} title={title} rows={c[key]} onChange={(rows) => setC({ ...c, [key]: rows })} />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Contact email">
          <input className={inputClass} value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} />
        </Field>
        <Field label="WhatsApp number">
          <input className={inputClass} value={c.whatsapp} onChange={(e) => setC({ ...c, whatsapp: e.target.value })} />
        </Field>
      </div>
      <div className="grid gap-2">
        <p className="text-sm font-semibold text-card-heading">Social media</p>
        {c.social.map((s) => (
          <div key={s.id} className="grid items-center gap-2 sm:grid-cols-[110px_minmax(0,1fr)_auto]">
            <span className="text-sm text-text-dark">{NAMES[s.id] ?? s.id}</span>
            <input aria-label={`${NAMES[s.id] ?? s.id} link`} className={inputClass} value={s.url} onChange={(e) => setSocial(s.id, { url: e.target.value })} placeholder="https://…" />
            <label className="flex items-center gap-2 text-xs text-text-dark">
              <input type="checkbox" checked={s.enabled} onChange={(e) => setSocial(s.id, { enabled: e.target.checked })} className="accent-primary-gold" />
              Show
            </label>
          </div>
        ))}
      </div>
      <SaveBar busy={busy} message={message} onSave={() => save(c)} />
    </Section>
  );
};

export default FooterContentForm;
