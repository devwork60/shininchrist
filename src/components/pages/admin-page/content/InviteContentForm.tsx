"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { INVITE_HERO } from "@/constant/inviteMercyData";
import type { InviteContent } from "@/lib/site-content-schema";
import { Field, Section, SaveBar, inputClass, useSection } from "./contentUi";

/** Edits the Invite Mercy page heading, tagline, description, quote and photo. */
const InviteContentForm = ({ initial }: { initial: InviteContent }) => {
  const [c, setC] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const { busy, message, save } = useSection("invite_mercy");

  const line = (key: "title" | "tagline" | "quoteBy", i: number, value: string) =>
    setC({ ...c, [key]: c[key].map((v, k) => (k === i ? value : v)) });

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setUploadMessage(null);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/content/image", { method: "POST", body });
    const data = await res.json().catch(() => ({}));
    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
    if (!res.ok) return setUploadMessage({ ok: false, text: data.error ?? "Upload failed." });
    setC((prev) => ({ ...prev, image: data.url }));
    setUploadMessage({ ok: true, text: "New photo ready. Press “Save changes” below to publish it." });
  };

  const isOriginal = c.image === INVITE_HERO.image;
  const button =
    "rounded-md border border-primary-green/30 px-3 py-2 text-sm font-semibold text-text-dark hover:bg-cream disabled:opacity-60";

  return (
    <Section title="Invite Mercy to Speak" hint="The top part of the Invite Mercy page. Change the photo and text, then press Save to publish.">
      <div className="grid gap-5 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-3">
          <p className="text-xs font-medium text-text-dark">Photo</p>
          <div className="relative aspect-[300/286] w-full max-w-[240px] overflow-hidden rounded-md border border-primary-green/15 bg-cream">
            <Image
              src={c.image}
              alt="Current Invite Mercy photo"
              fill
              sizes="240px"
              className="object-cover"
              unoptimized={c.image.startsWith("http")}
            />
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading}
            onChange={(e) => upload(e.target.files?.[0])}
            className="sr-only"
            id="invite-photo"
          />
          <div className="flex flex-wrap gap-2">
            <label
              htmlFor="invite-photo"
              className={`${button} cursor-pointer ${uploading ? "pointer-events-none opacity-60" : ""}`}
            >
              {uploading ? "Uploading…" : "Change photo"}
            </label>
            {!isOriginal && (
              <button
                type="button"
                className={button}
                onClick={() => {
                  setC({ ...c, image: INVITE_HERO.image });
                  setUploadMessage({ ok: true, text: "Original photo restored. Press “Save changes” to publish." });
                }}
              >
                Use original photo
              </button>
            )}
          </div>
          <p className="text-xs text-text-grey">JPG, PNG or WebP, up to 4 MB.</p>
          {uploadMessage && (
            <p
              role={uploadMessage.ok ? "status" : "alert"}
              className={`text-xs ${uploadMessage.ok ? "text-primary-green" : "text-red-800"}`}
            >
              {uploadMessage.text}
            </p>
          )}
        </div>

        <div className="grid min-w-0 gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            {c.title.map((v, i) => (
              <Field key={`t${i}`} label={`Heading, line ${i + 1}`}>
                <input className={inputClass} value={v} onChange={(e) => line("title", i, e.target.value)} />
              </Field>
            ))}
            {c.tagline.map((v, i) => (
              <Field key={`g${i}`} label={`Tagline, line ${i + 1}`}>
                <input className={inputClass} value={v} onChange={(e) => line("tagline", i, e.target.value)} />
              </Field>
            ))}
          </div>
          <Field label="Description">
            <textarea className={inputClass} rows={4} maxLength={600} value={c.description} onChange={(e) => setC({ ...c, description: e.target.value })} />
          </Field>
          <Field label="Quote">
            <textarea className={inputClass} rows={2} maxLength={240} value={c.quote} onChange={(e) => setC({ ...c, quote: e.target.value })} />
          </Field>
          <div className="grid gap-3 sm:grid-cols-2">
            {c.quoteBy.map((v, i) => (
              <Field key={`q${i}`} label={`Quote by, line ${i + 1}`}>
                <input className={inputClass} value={v} onChange={(e) => line("quoteBy", i, e.target.value)} />
              </Field>
            ))}
          </div>
        </div>
      </div>
      <SaveBar busy={busy} message={message} onSave={() => save(c)} />
    </Section>
  );
};

export default InviteContentForm;
