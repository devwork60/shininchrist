"use client";

import { useState } from "react";
import type { HomeHeroContent } from "@/lib/site-content-schema";
import { Field, SaveBar, Section, inputClass, useSection } from "./contentUi";

export const HomeHeroContentForm = ({
  initial,
}: {
  initial: HomeHeroContent;
}) => {
  const [data, setData] = useState<HomeHeroContent>(initial);
  const { busy, message, save } = useSection("home_hero");

  const set = <K extends keyof HomeHeroContent>(
    key: K,
    val: HomeHeroContent[K],
  ) => setData((prev) => ({ ...prev, [key]: val }));

  return (
    <Section
      title="Homepage Hero & Announcements"
      hint="Controls the primary heading, tagline, mission statement, action buttons, intro video, and optional top announcement pill on the main landing page."
    >
      <div className="grid gap-4">
        {/* Announcement Banner Box */}
        <div className="rounded-lg border border-primary-gold/30 bg-cream/50 p-4">
          <label className="flex items-center gap-2.5 font-semibold text-sm text-primary-green cursor-pointer">
            <input
              type="checkbox"
              checked={data.announcementEnabled}
              onChange={(e) => set("announcementEnabled", e.target.checked)}
              className="h-4 w-4 rounded border-primary-green text-primary-green focus:ring-primary-gold"
            />
            <span>Enable Announcement Banner / Pill</span>
          </label>

          {data.announcementEnabled && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Announcement Text">
                <input
                  className={inputClass}
                  value={data.announcementText}
                  onChange={(e) => set("announcementText", e.target.value)}
                  placeholder="Special Easter Convocation · Join Us"
                />
              </Field>
              <Field label="Announcement Link">
                <input
                  className={inputClass}
                  value={data.announcementUrl}
                  onChange={(e) => set("announcementUrl", e.target.value)}
                  placeholder="/join or https://…"
                />
              </Field>
            </div>
          )}
        </div>

        {/* Main Hero Content */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Main Hero Title (e.g. ShininChrist)">
            <input
              className={inputClass}
              value={data.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="ShininChrist"
            />
          </Field>
          <Field label="Tagline (Subheading)">
            <input
              className={inputClass}
              value={data.tagline}
              onChange={(e) => set("tagline", e.target.value)}
              placeholder="Shining Christ in our Hearts, Homes, Communities, and Nations"
            />
          </Field>
        </div>

        <Field label="Hero Mission Description">
          <textarea
            rows={3}
            className={inputClass}
            value={data.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="A global ministry, community and compassionate nonprofit organization..."
          />
        </Field>

        {/* Primary CTA */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary Button Text">
            <input
              className={inputClass}
              value={data.primaryCtaText}
              onChange={(e) => set("primaryCtaText", e.target.value)}
              placeholder="Join ShininChrist Today"
            />
          </Field>
          <Field label="Primary Button Destination Link">
            <input
              className={inputClass}
              value={data.primaryCtaUrl}
              onChange={(e) => set("primaryCtaUrl", e.target.value)}
              placeholder="/join"
            />
          </Field>
        </div>

        {/* Secondary CTA / Video Dialog */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Video Button Text">
            <input
              className={inputClass}
              value={data.videoText}
              onChange={(e) => set("videoText", e.target.value)}
              placeholder="Watch our Story"
            />
          </Field>
          <Field label="Video Source URL (/videos/… or external mp4)">
            <input
              className={inputClass}
              value={data.videoUrl}
              onChange={(e) => set("videoUrl", e.target.value)}
              placeholder="/videos/shininchrist-intro.mp4"
            />
          </Field>
        </div>

        <SaveBar busy={busy} message={message} onSave={() => save(data)} />
      </div>
    </Section>
  );
};

export default HomeHeroContentForm;
