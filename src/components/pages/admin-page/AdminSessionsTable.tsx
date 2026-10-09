"use client";

import { useState } from "react";
import CardDescSm from "@/components/pages/typography/CardDescSm";

export interface AdminSessionRow {
  id: string;
  name: string;
  email: string;
  roles: string[];
  sessions: number;
  lastActive: string;
}

/** Lists users and ends all of a user's sessions through DELETE /api/admin/sessions/[userId]. */
const AdminSessionsTable = ({
  initialRows,
}: {
  initialRows: AdminSessionRow[];
}) => {
  const [rows, setRows] = useState(initialRows);
  const [failed, setFailed] = useState<string | null>(null);

  const revoke = async (id: string) => {
    setFailed(null);
    const res = await fetch(`/api/admin/sessions/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setFailed(id);
      return;
    }
    setRows((current) =>
      current.map((row) =>
        row.id === id ? { ...row, sessions: 0, lastActive: "Signed out" } : row,
      ),
    );
  };

  if (rows.length === 0) {
    return (
      <CardDescSm className="!text-base">
        No users have signed in yet.
      </CardDescSm>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-primary-green/10 bg-white-color">
      <div className="hidden grid-cols-[1.4fr_1fr_0.6fr_0.8fr_auto] gap-4 bg-primary-green/10 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-primary-green md:grid">
        <span>User</span>
        <span>Role</span>
        <span>Sessions</span>
        <span>Last active</span>
        <span className="w-44 text-right">Action</span>
      </div>
      <ul className="divide-y divide-primary-green/10">
        {rows.map(({ id, name, email, roles, sessions, lastActive }) => (
          <li
            key={id}
            className="grid gap-2 px-5 py-4 md:grid-cols-[1.4fr_1fr_0.6fr_0.8fr_auto] md:items-center md:gap-4"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-dark">
                {name}
              </p>
              <CardDescSm className="truncate !text-xs">{email}</CardDescSm>
            </div>
            <span className="text-sm text-text-dark">
              {roles.join(", ") || "none"}
            </span>
            <span className="text-sm text-text-dark">
              {sessions} <span className="md:hidden">sessions</span>
            </span>
            <span className="text-sm text-text-grey">{lastActive}</span>
            <div className="md:w-44 md:text-right">
              <button
                type="button"
                disabled={sessions === 0}
                onClick={() => revoke(id)}
                className="rounded-md border border-red-300 px-3 py-2 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:border-primary-green/15 disabled:text-text-grey disabled:hover:bg-transparent"
              >
                Log out of all devices
              </button>
              {failed === id && (
                <p role="alert" className="mt-1 text-xs text-red-700">
                  Could not log this user out.
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSessionsTable;
