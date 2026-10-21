"use client";

import { useMemo, useState } from "react";
import { SUBMISSION_LABELS } from "@/constant/submissionTypes";

export interface SubmissionRow {
  id: string;
  reference: string;
  type: string;
  typeLabel: string;
  status: string;
  name: string;
  email: string;
  data: Record<string, unknown>;
  filePaths: string[];
  adminNotes: string | null;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  submitted: "bg-amber-100 text-amber-800 border-amber-300",
  under_review: "bg-blue-100 text-blue-800 border-blue-300",
  accepted: "bg-emerald-100 text-emerald-800 border-emerald-300",
  declined: "bg-stone-100 text-stone-700 border-stone-300",
  scheduled: "bg-purple-100 text-purple-800 border-purple-300",
  completed: "bg-teal-100 text-teal-800 border-teal-300",
};

export default function SubmissionsList({ initialRows }: { initialRows: SubmissionRow[] }) {
  const [rows, setRows] = useState<SubmissionRow[]>(initialRows);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRow | null>(null);
  const [editStatus, setEditStatus] = useState<string>("");
  const [editNotes, setEditNotes] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.reference.toLowerCase().includes(q)
      );
    });
  }, [rows, typeFilter, statusFilter, search]);

  const openModal = (sub: SubmissionRow) => {
    setSelectedSubmission(sub);
    setEditStatus(sub.status);
    setEditNotes(sub.adminNotes ?? "");
    setSaveMessage("");
  };

  const handleUpdate = async () => {
    if (!selectedSubmission) return;
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch(`/api/admin/submissions/${selectedSubmission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          adminNotes: editNotes,
        }),
      });
      if (res.ok) {
        setRows((prev) =>
          prev.map((r) =>
            r.id === selectedSubmission.id
              ? { ...r, status: editStatus, adminNotes: editNotes }
              : r,
          ),
        );
        setSelectedSubmission((prev) =>
          prev ? { ...prev, status: editStatus, adminNotes: editNotes } : null,
        );
        setSaveMessage("Saved successfully.");
      } else {
        setSaveMessage("Failed to save changes.");
      }
    } catch {
      setSaveMessage("Error connecting to server.");
    }
    setSaving(false);
  };

  return (
    <div>
      {/* Controls / Filter Bar */}
      <div className="rounded-2xl border border-primary-green/15 bg-white-color p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold text-stone-600">Search Submissions</label>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, email, reference..."
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600">Filter by Form Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
            >
              <option value="all">All Form Types ({rows.length})</option>
              {Object.entries(SUBMISSION_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-stone-200 bg-white-color shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50/75 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-5 py-3.5">Reference</th>
                <th className="px-5 py-3.5">Form Type</th>
                <th className="px-5 py-3.5">Submitter</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    No submissions found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredRows.map((sub) => {
                  const statusClass =
                    STATUS_COLORS[sub.status] ??
                    "bg-stone-100 text-stone-700 border-stone-200";
                  const dateStr = new Date(sub.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={sub.id} className="transition-colors hover:bg-stone-50/60">
                      <td className="px-5 py-4 font-mono text-xs font-bold text-primary-green">
                        {sub.reference}
                      </td>
                      <td className="px-5 py-4 font-medium text-stone-800">
                        {sub.typeLabel}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-black-color">{sub.name}</div>
                        <div className="text-xs text-stone-500">{sub.email}</div>
                      </td>
                      <td className="px-5 py-4 text-xs text-stone-500 whitespace-nowrap">
                        {dateStr}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusClass}`}
                        >
                          {sub.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => openModal(sub)}
                          className="rounded-lg bg-primary-green/10 px-3.5 py-1.5 text-xs font-semibold text-primary-green transition hover:bg-primary-green hover:text-white-color"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-color/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white-color p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary-green">
                  {selectedSubmission.reference}
                </span>
                <h3 className="mt-1 text-xl font-bold text-black-color">
                  {selectedSubmission.typeLabel}
                </h3>
                <p className="text-xs text-stone-500">
                  Submitted on {new Date(selectedSubmission.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            {/* Submission Content */}
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Submitter Details
                </h4>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs md:text-sm">
                  <div>
                    <span className="text-stone-500">Name:</span>{" "}
                    <strong className="text-black-color">{selectedSubmission.name}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">Email:</span>{" "}
                    <strong className="text-black-color">{selectedSubmission.email}</strong>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white-color p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Form Response Payload
                </h4>
                <div className="mt-3 grid gap-3 text-xs md:text-sm">
                  {Object.entries(selectedSubmission.data).map(([k, v]) => {
                    const displayVal = Array.isArray(v)
                      ? v.join(", ")
                      : typeof v === "object" && v !== null
                        ? JSON.stringify(v)
                        : String(v);
                    return (
                      <div key={k} className="border-b border-stone-100 pb-2">
                        <span className="font-semibold capitalize text-stone-600">
                          {k.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}:
                        </span>
                        <div className="mt-0.5 whitespace-pre-wrap text-stone-900 font-medium">
                          {displayVal || "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status & Admin Notes Form */}
              <div className="rounded-2xl border border-gold-bright/30 bg-gold-bright/5 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Admin Status & Notes
                </h4>
                <div className="mt-3 grid gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600">Update Status</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-stone-300 bg-white-color px-3.5 py-2 text-xs font-medium text-black-color focus:border-gold-bright focus:outline-none"
                    >
                      <option value="submitted">Submitted</option>
                      <option value="under_review">Under Review</option>
                      <option value="accepted">Accepted</option>
                      <option value="declined">Declined</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600">Internal Admin Notes</label>
                    <textarea
                      rows={3}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="e.g. Spoke with applicant, scheduled interview, or verified references..."
                      className="mt-1 w-full rounded-xl border border-stone-300 bg-white-color px-3.5 py-2 text-xs text-black-color focus:border-gold-bright focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {saveMessage && (
                      <span className="text-xs font-semibold text-primary-green">
                        {saveMessage}
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleUpdate}
                      className="ml-auto rounded-full bg-primary-green px-5 py-2 text-xs font-semibold text-white-color transition hover:bg-primary-green-deep disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Status & Notes"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
