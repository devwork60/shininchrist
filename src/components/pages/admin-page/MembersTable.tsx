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

  if (applicants.length === 0) {
    return <p className="text-sm text-text-dark">No applicants yet.</p>;
  }

  return (
    <ul className="grid gap-4">
      {applicants.map((a) => (
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
            <span className="rounded-full border border-primary-gold/50 bg-primary-gold/10 px-3 py-1 text-xs font-semibold text-primary-gold">
              {a.status.replaceAll("_", " ")}
              {a.memberId && ` · ${a.memberId}`}
            </span>
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
                Needs: verified proof{a.isMinor ? ", verified consent" : ""} and
                a confirmed uniform payment.
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
  );
};

export default MembersTable;
