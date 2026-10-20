"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
  roles: string[];
  status: string;
  suspendedReason: string | null;
  suspendedAt: string | null;
  /** Only a Super Admin can change the Admin role or touch an admin. */
  actorIsSuperAdmin: boolean;
  isSelf: boolean;
}

const ROLE_LABELS: Record<string, string> = {
  learner: "Learner",
  teacher: "Teacher",
  admin: "Admin",
};

const call = async (path: string, body: unknown) => {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, error: (data.error as string | undefined) ?? "" };
};

/** Roles on/off and suspend / reinstate for one member. Every rule is enforced again on the server. */
const MemberAccessPanel = ({
  userId,
  roles,
  status,
  suspendedReason,
  suspendedAt,
  actorIsSuperAdmin,
  isSelf,
}: Props) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");
  const [confirming, setConfirming] = useState(false);

  const targetIsSuper = roles.includes("super_admin");
  const targetIsAdmin = roles.includes("admin");
  const locked = isSelf || targetIsSuper || (targetIsAdmin && !actorIsSuperAdmin);

  const run = async (path: string, body: unknown) => {
    setBusy(true);
    setError("");
    const result = await call(path, body);
    setBusy(false);
    if (!result.ok) return setError(result.error || "Could not save. Try again.");
    setConfirming(false);
    setReason("");
    router.refresh();
  };

  const toggleRole = (role: string, grant: boolean) =>
    run(`/api/admin/members/${userId}/roles`, { role, grant });

  return (
    <section className="rounded-xl border border-primary-green/10 bg-white-color p-5">
      <h2 className="font-heading text-lg font-semibold text-primary-green">
        Roles and access
      </h2>

      {locked && (
        <p className="mt-2 text-sm text-text-grey">
          {isSelf
            ? "You cannot change your own access."
            : targetIsSuper
              ? "A Super Admin can only be changed in the database."
              : "Only a Super Admin can change an admin."}
        </p>
      )}

      <div className="mt-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-grey">
          Current roles
        </p>
        <p className="mt-1 text-sm text-text-dark">
          {roles.length ? roles.map((r) => r.replaceAll("_", " ")).join(", ") : "none"}
        </p>
      </div>

      <fieldset className="mt-4 grid gap-2" disabled={busy || locked}>
        <legend className="text-xs font-semibold uppercase tracking-wide text-text-grey">
          Extra roles
        </legend>
        {Object.entries(ROLE_LABELS).map(([role, label]) => {
          const adminOnly = role === "admin" && !actorIsSuperAdmin;
          return (
            <label
              key={role}
              className="flex items-center gap-3 text-sm text-text-dark"
            >
              <input
                type="checkbox"
                checked={roles.includes(role)}
                disabled={adminOnly}
                onChange={(event) => toggleRole(role, event.target.checked)}
                className="h-4 w-4 accent-primary-gold"
              />
              {label}
              {adminOnly && (
                <span className="text-xs text-text-grey">(Super Admin only)</span>
              )}
            </label>
          );
        })}
      </fieldset>

      <div className="mt-5 border-t border-primary-green/10 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-grey">
          Membership access
        </p>

        {status === "suspended" ? (
          <div className="mt-2 grid gap-3">
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              <strong>Suspended</strong>
              {suspendedAt
                ? ` on ${new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(suspendedAt))}`
                : ""}
              . Reason: {suspendedReason ?? "—"}
            </p>
            <button
              type="button"
              disabled={busy || locked}
              onClick={() =>
                run(`/api/admin/members/${userId}/suspension`, {
                  action: "reinstate",
                })
              }
              className="w-fit rounded-md bg-primary-green px-4 py-2 text-sm font-semibold text-white-color disabled:opacity-60"
            >
              {busy ? "Saving…" : "Reinstate member"}
            </button>
          </div>
        ) : status === "active" ? (
          <div className="mt-2 grid gap-3">
            {confirming ? (
              <>
                <label className="grid gap-1 text-xs font-medium text-text-dark">
                  Reason (the member will be emailed this)
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    maxLength={500}
                    className="w-full rounded-md border border-primary-green/20 px-3 py-2 text-sm focus:border-primary-gold focus:outline-none"
                  />
                </label>
                <p className="text-xs text-text-grey">
                  Suspending closes the member pages and signs them out on every
                  device.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busy || reason.trim().length < 3}
                    onClick={() =>
                      run(`/api/admin/members/${userId}/suspension`, {
                        action: "suspend",
                        reason,
                      })
                    }
                    className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white-color disabled:opacity-60"
                  >
                    {busy ? "Saving…" : "Confirm suspension"}
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setConfirming(false)}
                    className="rounded-md border border-primary-green/30 px-4 py-2 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                disabled={busy || locked}
                onClick={() => setConfirming(true)}
                className="w-fit rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-800 disabled:opacity-60"
              >
                Suspend member
              </button>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-text-grey">
            Only active members can be suspended. Status: {status.replaceAll("_", " ")}.
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-800">
          {error}
        </p>
      )}
    </section>
  );
};

export default MemberAccessPanel;
