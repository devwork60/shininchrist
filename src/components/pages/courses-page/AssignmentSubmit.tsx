"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_TEXT: Record<string, string> = {
  submitted: "Received",
  under_review: "Being reviewed",
  accepted: "Reviewed: accepted",
  declined: "Reviewed: please revise",
  completed: "Completed",
  scheduled: "Received",
};

export interface PastSubmission {
  reference: string;
  status: string;
  createdAt: string;
}

const input =
  "w-full rounded-md border border-primary-green/25 bg-white-color px-3 py-2 text-sm text-text-dark outline-none focus:border-primary-green";

/** Lets an active member send an answer (and/or a link to their work) for one assignment to the admins. */
const AssignmentSubmit = ({
  courseId,
  assignmentId,
  past,
}: {
  courseId: string;
  assignmentId: string;
  past: PastSubmission[];
}) => {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const res = await fetch("/api/academy/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, assignmentId, answer, link }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      setMessage({ ok: true, text: `Submitted. Your reference is ${data.reference}.` });
      setAnswer("");
      setLink("");
      router.refresh();
    } else {
      setMessage({ ok: false, text: data.error ?? "Could not submit. Please try again." });
    }
  };

  return (
    <form onSubmit={send} className="mt-5 grid gap-3 border-t border-primary-green/10 pt-4">
      <p className="text-sm font-semibold text-card-heading">Submit your work</p>
      {past.length > 0 && (
        <ul className="grid gap-1 text-xs text-text-grey">
          {past.map((p) => (
            <li key={p.reference}>
              {p.reference} · {new Date(p.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })} · {STATUS_TEXT[p.status] ?? p.status}
            </li>
          ))}
        </ul>
      )}
      <label className="grid gap-1 text-sm text-text-dark">
        Your answer
        <textarea className={input} rows={5} maxLength={8000} value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </label>
      <label className="grid gap-1 text-sm text-text-dark">
        Link to your work (optional, for example a Google Drive or Docs link)
        <input className={input} value={link} placeholder="https://…" onChange={(e) => setLink(e.target.value)} />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy} className="rounded-lg bg-primary-green px-5 py-2.5 text-sm font-semibold text-white-color hover:opacity-90 disabled:opacity-60">
          {busy ? "Sending…" : "Submit to admin"}
        </button>
        {message && (
          <span role="status" className={`text-sm ${message.ok ? "text-primary-green" : "text-red-800"}`}>
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
};

export default AssignmentSubmit;
