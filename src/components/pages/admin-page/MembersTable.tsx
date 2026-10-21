"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Applicant } from "@/lib/members-admin";

const badge = (state: string) =>
  state === "verified"
    ? "bg-primary-green/15 text-primary-green"
    : state === "rejected"
      ? "bg-red-100 text-red-700"
      : state === "pending"
        ? "bg-primary-gold/15 text-primary-gold"
        : "bg-primary-green/5 text-text-grey";

const button =
  "rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

/** Applicants with their proof, consent and payment, and the buttons an admin uses to verify and activate. */
const MembersTable = ({ applicants }: { applicants: Applicant[] }) => {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    id: string;
    text: string;
    ok: boolean;
  } | null>(null);

  const call = async (
    userId: string,
    key: string,
    url: string,
    body?: unknown,
  ) => {
    setBusy(key);
    setMessage(null);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    setBusy(null);
    setMessage({
      id: userId,
      ok: res.ok,
      text: res.ok
        ? data.memberId
          ? `Activated. Member ID ${data.memberId}`
          : "Saved."
        : (data.error ?? "Something went wrong."),
    });
    if (res.ok) router.refresh();
  };

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [chapterFilter, setChapterFilter] = useState("all");

  const filteredApplicants = applicants.filter((a) => {
    if (chapterFilter !== "all" && a.chapter !== chapterFilter) return false;
    if (statusFilter !== "all") {
      if (statusFilter === "active" && a.status !== "active") return false;
      if (statusFilter === "ready" && !a.ready) return false;
      if (statusFilter === "proof_pending" && a.proofStatus !== "pending") return false;
      if (statusFilter === "consent_pending" && a.consentStatus !== "pending") return false;
      if (statusFilter === "payment_pending" && a.uniformPaid) return false;
      if (statusFilter === "suspended" && a.status !== "suspended") return false;
    }
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.whatsapp.toLowerCase().includes(q) ||
      (a.memberId && a.memberId.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="rounded-2xl border border-primary-green/15 bg-white-color p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold text-stone-600">
              Search Members
            </label>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, email, Member ID, phone..."
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
            >
              <option value="all">All Statuses ({applicants.length})</option>
              <option value="active">Active Members Only</option>
              <option value="ready">Ready to Activate</option>
              <option value="proof_pending">Social Proof to Verify</option>
              <option value="consent_pending">Parental Consent to Verify</option>
              <option value="payment_pending">Uniform Payment Pending</option>
              <option value="suspended">Suspended Members</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600">
              Filter by Chapter
            </label>
            <select
              value={chapterFilter}
              onChange={(e) => setChapterFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
            >
              <option value="all">All Chapters</option>
              <option value="men">Men&apos;s Chapter</option>
              <option value="women">Women&apos;s Chapter</option>
              <option value="youth">Youth Chapter</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing {filteredApplicants.length} of {applicants.length} members
          </span>
          {(search || statusFilter !== "all" || chapterFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setChapterFilter("all");
              }}
              className="font-semibold text-primary-green hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {filteredApplicants.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white-color p-8 text-center text-sm text-text-grey">
          No members match the search and filter criteria.
        </div>
      ) : (
        <ul className="grid gap-4">
          {filteredApplicants.map((a) => (
        <li
          key={a.userId}
          className="rounded-xl border border-primary-green/10 bg-white-color p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/admin/members/${a.userId}`}
                className="block truncate font-heading text-lg font-semibold text-card-heading hover:text-primary-gold"
              >
                {a.name}
              </Link>
              <p className="truncate text-sm text-text-grey">
                {a.email} · {a.country || "no country"} ·{" "}
                {a.whatsapp || "no WhatsApp"}
                {a.isMinor && " · under 18"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {a.chapter && (
                <span className="rounded-full bg-primary-green/10 px-2.5 py-1 text-xs font-semibold capitalize text-primary-green">
                  {a.chapter} Chapter
                </span>
              )}
              <span className="rounded-full border border-primary-gold/50 bg-primary-gold/10 px-3 py-1 text-xs font-semibold text-primary-gold">
                {a.status.replaceAll("_", " ")}
                {a.memberId && ` · ${a.memberId}`}
              </span>
            </div>
          </div>

          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs text-text-grey">
                Social proof{a.platform ? ` (${a.platform})` : ""}
              </dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge(a.proofStatus)}`}
                >
                  {a.proofStatus.replace("_", " ")}
                </span>
                {a.proofUrl && (
                  <a
                    href={a.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-primary-gold underline"
                  >
                    View file
                  </a>
                )}
              </dd>
              {a.proofStatus !== "not_submitted" && a.status !== "active" && (
                <div className="mt-2 flex gap-2">
                  <button
                    disabled={busy !== null}
                    onClick={() =>
                      call(
                        a.userId,
                        `${a.userId}p1`,
                        `/api/admin/members/${a.userId}/review`,
                        { item: "proof", decision: "verify" },
                      )
                    }
                    className={`${button} border-primary-green text-primary-green hover:bg-primary-green hover:text-white-color`}
                  >
                    Verify
                  </button>
                  <button
                    disabled={busy !== null}
                    onClick={() =>
                      call(
                        a.userId,
                        `${a.userId}p2`,
                        `/api/admin/members/${a.userId}/review`,
                        { item: "proof", decision: "reject" },
                      )
                    }
                    className={`${button} border-red-300 text-red-700 hover:bg-red-50`}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>

            <div>
              <dt className="text-xs text-text-grey">Parental consent</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2">
                {a.isMinor ? (
                  <>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge(a.consentStatus)}`}
                    >
                      {a.consentStatus.replace("_", " ")}
                    </span>
                    {a.consentUrl && (
                      <a
                        href={a.consentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-primary-gold underline"
                      >
                        View file
                      </a>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-text-grey">
                    Not needed (18 or over)
                  </span>
                )}
              </dd>
              {a.isMinor &&
                a.consentStatus !== "not_submitted" &&
                a.status !== "active" && (
                  <div className="mt-2 flex gap-2">
                    <button
                      disabled={busy !== null}
                      onClick={() =>
                        call(
                          a.userId,
                          `${a.userId}c1`,
                          `/api/admin/members/${a.userId}/review`,
                          { item: "consent", decision: "verify" },
                        )
                      }
                      className={`${button} border-primary-green text-primary-green hover:bg-primary-green hover:text-white-color`}
                    >
                      Verify
                    </button>
                    <button
                      disabled={busy !== null}
                      onClick={() =>
                        call(
                          a.userId,
                          `${a.userId}c2`,
                          `/api/admin/members/${a.userId}/review`,
                          { item: "consent", decision: "reject" },
                        )
                      }
                      className={`${button} border-red-300 text-red-700 hover:bg-red-50`}
                    >
                      Reject
                    </button>
                  </div>
                )}
            </div>

            <div>
              <dt className="text-xs text-text-grey">Uniform payment</dt>
              <dd className="mt-1">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${a.uniformPaid ? badge("verified") : badge("not_submitted")}`}
                >
                  {a.uniformPaid ? "confirmed" : "not paid"}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-primary-green/10 pt-4">
            <button
              disabled={!a.ready || a.status === "active" || busy !== null}
              onClick={() =>
                call(
                  a.userId,
                  `${a.userId}a`,
                  `/api/admin/members/${a.userId}/activate`,
                )
              }
              className="rounded-md bg-primary-green px-4 py-2 text-sm font-semibold text-white-color transition-colors hover:bg-primary-green-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              {a.status === "active" ? "Active" : "Activate member"}
            </button>
            <Link
              href={`/admin/members/${a.userId}`}
              className="text-sm font-semibold text-primary-gold hover:underline"
            >
              Full details →
            </Link>
            {!a.ready && a.status !== "active" && (
              <span className="text-xs text-text-grey">
                Cannot activate yet. Needs: {a.missing.join("; ")}.
              </span>
            )}
            {message?.id === a.userId && (
              <span
                role="status"
                className={`text-sm font-semibold ${message.ok ? "text-primary-green" : "text-red-700"}`}
              >
                {message.text}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
    )}
  </div>
  );
};

export default MembersTable;
