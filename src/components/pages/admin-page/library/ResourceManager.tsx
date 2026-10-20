"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminResource } from "@/lib/library-admin";
import ResourceForm from "./ResourceForm";

const size = (bytes: number | null) =>
  bytes === null ? "" : bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/** List of Library resources with add, edit and delete. */
const ResourceManager = ({ resources }: { resources: AdminResource[] }) => {
  const router = useRouter();
  const [editing, setEditing] = useState<AdminResource | "new" | null>(null);
  const [error, setError] = useState("");

  const remove = async (resource: AdminResource) => {
    if (!window.confirm(`Delete "${resource.title}" and its file? This cannot be undone.`)) return;
    setError("");
    const res = await fetch(`/api/admin/library/${resource.id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return setError(data.error ?? "Could not delete.");
    router.refresh();
  };

  if (editing)
    return (
      <ResourceForm
        key={editing === "new" ? "new" : editing.id}
        resource={editing === "new" ? null : editing}
        onDone={() => setEditing(null)}
      />
    );

  return (
    <div className="grid gap-4">
      <div>
        <button type="button" onClick={() => setEditing("new")} className="rounded-md bg-primary-green px-5 py-2 text-sm font-semibold text-white-color hover:bg-primary-green-deep">
          + New resource
        </button>
      </div>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
      {resources.length === 0 ? (
        <p className="text-sm text-text-grey">No resources yet. Add the first one.</p>
      ) : (
        <ul className="grid gap-3">
          {resources.map((r) => (
            <li key={r.id} className="grid gap-2 rounded-xl border border-primary-green/10 bg-white-color p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="min-w-0">
                <p className="font-heading text-lg font-semibold text-card-heading">{r.title}</p>
                <p className="text-xs text-text-grey">
                  {r.contentType}
                  {r.collection ? ` · ${r.collection}` : ""} ·{" "}
                  {r.access === "free" ? "Free" : "Give what you can"} ·{" "}
                  {r.hasFile ? `${r.fileName} ${size(r.fileSize)}` : "no file yet"} · {r.downloads} download{r.downloads === 1 ? "" : "s"}
                </p>
                <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${r.published ? "bg-primary-green text-white-color" : "bg-primary-gold/20 text-card-heading"}`}>
                  {r.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setEditing(r)} className="rounded-md border border-primary-green/30 px-4 py-2 text-sm font-semibold hover:bg-cream">Edit</button>
                <button type="button" onClick={() => remove(r)} className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-50">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceManager;
