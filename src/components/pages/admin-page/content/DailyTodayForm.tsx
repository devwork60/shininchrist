"use client";

import { useState } from "react";
import type {
  DailyIcon,
  DailyStep,
  DailyTodayContent,
  DailyViewOption,
} from "@/lib/site-content-schema";
import {
  Field,
  ImageUpload,
  SaveBar,
  Section,
  inputClass,
  useSection,
} from "./contentUi";

const MAX_STEPS = 12;
const ICONS: { value: DailyIcon; label: string }[] = [
  { value: "play", label: "Play (video)" },
  { value: "book", label: "Book (read)" },
  { value: "doc", label: "Document" },
  { value: "headphones", label: "Headphones (audio)" },
  { value: "arrow", label: "Arrow" },
];

const small =
  "rounded border border-primary-green/25 px-2 py-1 text-xs font-semibold disabled:opacity-40";

const newStep = (): DailyStep => ({
  id: `activity-${Date.now()}`,
  title: "New activity",
  subtitle: "",
  image: "/images/daily/step-shine-v2.webp",
  imageAlt: "",
  body: "",
  quote: "",
  quoteReference: "",
  motto: "",
  videoUrl: "",
  buttonText: "Read more",
  buttonUrl: "#",
  icon: "arrow",
});

/** Edits the Daily Today page: the activities (title, order, text, photo, video, button) and the watch / listen options. */
const DailyTodayForm = ({ initial }: { initial: DailyTodayContent }) => {
  const [c, setC] = useState(initial);
  const [open, setOpen] = useState<string | null>(initial.steps[0]?.id ?? null);
  const { busy, message, save } = useSection("daily_today");

  const setStep = (id: string, patch: Partial<DailyStep>) =>
    setC((prev) => ({
      ...prev,
      steps: prev.steps.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));

  const move = (index: number, by: -1 | 1) =>
    setC((prev) => {
      const steps = [...prev.steps];
      const j = index + by;
      if (j < 0 || j >= steps.length) return prev;
      [steps[index], steps[j]] = [steps[j], steps[index]];
      return { ...prev, steps };
    });

  const remove = (id: string) => {
    if (c.steps.length <= 1) return;
    if (!window.confirm("Remove this activity? It disappears when you press Save.")) return;
    setC((prev) => ({ ...prev, steps: prev.steps.filter((s) => s.id !== id) }));
  };

  const add = () => {
    if (c.steps.length >= MAX_STEPS) return;
    const step = newStep();
    setC((prev) => ({ ...prev, steps: [...prev.steps, step] }));
    setOpen(step.id);
  };

  const setOption = (id: DailyViewOption["id"], patch: Partial<DailyViewOption>) =>
    setC((prev) => ({
      ...prev,
      viewOptions: prev.viewOptions.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    }));

  return (
    <Section
      title="Daily: today’s activities and viewing options"
      hint="The activities show on /daily and on /daily/today, in the order below. Change a title, text, photo, video or button, move activities up or down, or add up to 12."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Today page heading">
          <input className={inputClass} value={c.title} maxLength={80} onChange={(e) => setC({ ...c, title: e.target.value })} />
        </Field>
        <Field label="Verse reference (e.g. Psalm 46:10 (NIV))">
          <input className={inputClass} value={c.verseReference} maxLength={80} onChange={(e) => setC({ ...c, verseReference: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Today’s verse">
            <textarea className={inputClass} rows={2} maxLength={400} value={c.verse} onChange={(e) => setC({ ...c, verse: e.target.value })} />
          </Field>
        </div>
      </div>

      <div className="grid gap-3">
        <p className="text-sm font-semibold text-card-heading">
          Activities ({c.steps.length} of {MAX_STEPS})
        </p>
        {c.steps.map((step, index) => {
          const isOpen = open === step.id;
          return (
            <div key={step.id} className="rounded-lg border border-primary-green/15 bg-white-color">
              <div className="flex flex-wrap items-center gap-2 p-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-gold text-sm font-bold text-white-color">
                  {index + 1}
                </span>
                <button type="button" onClick={() => setOpen(isOpen ? null : step.id)} className="min-w-0 flex-1 text-left" aria-expanded={isOpen}>
                  <span className="block truncate font-heading text-base font-semibold text-card-heading">{step.title || "(untitled)"}</span>
                  <span className="block truncate text-xs text-text-grey">{isOpen ? "Click to close" : "Click to edit"}</span>
                </button>
                <button type="button" className={small} disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Move ${step.title} up`}>↑</button>
                <button type="button" className={small} disabled={index === c.steps.length - 1} onClick={() => move(index, 1)} aria-label={`Move ${step.title} down`}>↓</button>
                <button type="button" className={`${small} text-red-800`} disabled={c.steps.length <= 1} onClick={() => remove(step.id)} aria-label={`Remove ${step.title}`}>✕</button>
              </div>

              {isOpen && (
                <div className="grid gap-4 border-t border-primary-green/10 p-4 md:grid-cols-[minmax(0,230px)_minmax(0,1fr)]">
                  <div className="grid content-start gap-3">
                    <ImageUpload value={step.image} onChange={(url) => setStep(step.id, { image: url })} />
                    <Field label="Photo description (for screen readers)">
                      <input className={inputClass} value={step.imageAlt} maxLength={160} onChange={(e) => setStep(step.id, { imageAlt: e.target.value })} />
                    </Field>
                  </div>
                  <div className="grid min-w-0 gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Title">
                        <input className={inputClass} value={step.title} maxLength={60} onChange={(e) => setStep(step.id, { title: e.target.value })} />
                      </Field>
                      <Field label="Short line under the title">
                        <input className={inputClass} value={step.subtitle} maxLength={120} onChange={(e) => setStep(step.id, { subtitle: e.target.value })} />
                      </Field>
                    </div>
                    <Field label="Devotional or reflection text (leave a blank line between paragraphs)">
                      <textarea className={inputClass} rows={6} maxLength={6000} value={step.body} onChange={(e) => setStep(step.id, { body: e.target.value })} />
                    </Field>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="Scripture quote (optional)">
                        <textarea className={inputClass} rows={2} maxLength={600} value={step.quote} onChange={(e) => setStep(step.id, { quote: e.target.value })} />
                      </Field>
                      <Field label="Scripture reference (optional)">
                        <input className={inputClass} value={step.quoteReference} maxLength={120} onChange={(e) => setStep(step.id, { quoteReference: e.target.value })} />
                      </Field>
                    </div>
                    <Field label="Motto box (optional)">
                      <input className={inputClass} value={step.motto} maxLength={240} onChange={(e) => setStep(step.id, { motto: e.target.value })} />
                    </Field>
                    <Field label="Video address (optional). A YouTube link plays on the page; other sites open as a link.">
                      <input className={inputClass} value={step.videoUrl} placeholder="https://www.youtube.com/watch?v=…" onChange={(e) => setStep(step.id, { videoUrl: e.target.value })} />
                    </Field>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Field label="Button label">
                        <input className={inputClass} value={step.buttonText} maxLength={40} onChange={(e) => setStep(step.id, { buttonText: e.target.value })} />
                      </Field>
                      <Field label="Button link (/page or https://…)">
                        <input className={inputClass} value={step.buttonUrl} onChange={(e) => setStep(step.id, { buttonUrl: e.target.value })} />
                      </Field>
                      <Field label="Button icon">
                        <select className={inputClass} value={step.icon} onChange={(e) => setStep(step.id, { icon: e.target.value as DailyIcon })}>
                          {ICONS.map((icon) => (
                            <option key={icon.value} value={icon.value}>{icon.label}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <button type="button" onClick={add} disabled={c.steps.length >= MAX_STEPS} className={`${small} w-fit px-3 py-2`}>
          + Add an activity
        </button>
      </div>

      <div className="grid gap-2">
        <p className="text-sm font-semibold text-card-heading">Watch and listen options (right-hand side of the Today page)</p>
        <p className="text-xs text-text-grey">
          Each button opens the address you give. Use the official page, or the link to today’s video on that site. Switch off any you do not want to show.
        </p>
        {c.viewOptions.map((option) => (
          <div key={option.id} className="grid items-center gap-2 sm:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.6fr)]">
            <label className="flex items-center gap-2 text-sm font-medium capitalize text-text-dark">
              <input type="checkbox" checked={option.enabled} onChange={(e) => setOption(option.id, { enabled: e.target.checked })} className="h-4 w-4 accent-primary-gold" />
              {option.id === "audio" ? "Audio" : option.id}
            </label>
            <input aria-label={`${option.id} button label`} className={inputClass} value={option.label} maxLength={40} onChange={(e) => setOption(option.id, { label: e.target.value })} />
            <input aria-label={`${option.id} address`} className={inputClass} value={option.url} placeholder="https://…" onChange={(e) => setOption(option.id, { url: e.target.value })} />
          </div>
        ))}
      </div>

      <SaveBar busy={busy} message={message} onSave={() => save(c)} />
    </Section>
  );
};

export default DailyTodayForm;
