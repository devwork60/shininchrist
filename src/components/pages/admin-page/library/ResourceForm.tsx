"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { AdminResource } from "@/lib/library-admin";

const TYPES = ["Teaching", "Music", "Prayer", "Book", "Study guide", "Tool", "Other"];
const input =
  "w-full min-w-0 rounded-md border border-primary-green/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold";

interface Upload {
  path: string;
  name: string;
  mime: string;
  size: number;
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="grid min-w-0 gap-1 text-xs font-medium text-text-dark">
    {label}
    {children}
  </label>
);

/** Add or edit one resource. The file goes straight to private storage with a one-time ticket from our server. */
const ResourceForm = ({
  resource,
  onDone,
}: {
  resource: AdminResource | null;
  onDone: () => void;
}) => {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [f, setF] = useState({
    title: resource?.title ?? "",
    description: resource?.description ?? "",
    contentType: resource?.contentType ?? "Teaching",
    collection: resource?.collection ?? "",
    scripture: resource?.scripture ?? "",
    access: resource?.access ?? "free",
    published: resource?.published ?? false,
  });
  const [upload, setUpload] = useState<Upload | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const chooseFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setStatus("Uploading…");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/library/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, size: file.size }),
      });
      const ticket = await res.json();
      if (!res.ok) throw new Error(ticket.error ?? "Could not start the upload.");
      const supabase = createClient();
      if (!supabase) throw new Error("Storage is not configured.");
      const { error: uploadError } = await supabase.storage
        .from("library-files")
        .uploadToSignedUrl(ticket.path, ticket.token, file, { contentType: file.type });
      if (uploadError) throw new Error(uploadError.message);
      setUpload({ path: ticket.path, name: file.name, mime: file.type, size: file.size });
      setStatus(`Uploaded: ${file.name}. Press Save to attach it.`);
    } catch (caught) {
      setUpload(null);
      setStatus("");
      setError(caught instanceof Error ? caught.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const save = async () => {
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: resource?.id,
        ...f,
        ...(upload ? { filePath: upload.path, fileName: upload.name, mimeType: upload.mime, fileSize: upload.size } : {}),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error ?? "Could not save.");
    router.refresh();
    onDone();
  };

  return (
    <div className="grid gap-3 rounded-xl border border-primary-gold/40 bg-white-color p-4">
      <h3 className="font-heading text-lg font-semibold text-primary-green">
        {resource ? "Edit resource" : "New resource"}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title">
          <input className={input} value={f.title} maxLength={120} onChange={(e) => setF({ ...f, title: e.target.value })} />
        </Field>
        <Field label="Type">
          <select className={input} value={f.contentType} onChange={(e) => setF({ ...f, contentType: e.target.value })}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Collection (optional, e.g. ShininFaith)">
          <input className={input} value={f.collection} maxLength={60} onChange={(e) => setF({ ...f, collection: e.target.value })} />
        </Field>
        <Field label="Scripture (optional)">
          <input className={input} value={f.scripture} maxLength={120} onChange={(e) => setF({ ...f, scripture: e.target.value })} />
        </Field>
      </div>
      <Field label="Description">
        <textarea className={input} rows={3} maxLength={1000} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Access">
          <select className={input} value={f.access} onChange={(e) => setF({ ...f, access: e.target.value as "free" | "contribution" })}>
            <option value="free">Free download</option>
            <option value="contribution">Give what you can (0 allowed)</option>
          </select>
        </Field>
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-text-dark">
          <input type="checkbox" checked={f.published} onChange={(e) => setF({ ...f, published: e.target.checked })} className="h-4 w-4 accent-primary-gold" />
          Published (visible to members)
        </label>
      </div>
      <div className="grid gap-2">
        <p className="text-xs font-medium text-text-dark">
          File (PDF, MP3, M4A, MP4, EPUB, ZIP, DOC/DOCX, JPG, PNG, up to 50 MB)
        </p>
        {resource?.hasFile && !upload && (
          <p className="text-xs text-text-grey">Current file: {resource.fileName || "uploaded"}. Choose a new one only to replace it.</p>
        )}
        <input ref={fileInput} type="file" disabled={busy} onChange={(e) => chooseFile(e.target.files?.[0])} className="text-sm" />
        {status && <p role="status" className="text-xs text-primary-green">{status}</p>}
      </div>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
      <div className="flex gap-2">
        <button type="button" disabled={busy} onClick={save} className="rounded-md bg-primary-gold px-5 py-2 text-sm font-semibold text-white-color hover:bg-primary-green disabled:opacity-60">
          {busy ? "Please wait…" : "Save"}
        </button>
        <button type="button" disabled={busy} onClick={onDone} className="rounded-md border border-primary-green/30 px-5 py-2 text-sm font-semibold">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResourceForm;
