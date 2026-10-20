import { prisma } from "@/lib/prisma";
import { isMailConfigured, sendMail } from "./mailer";
import { adminAlert, type Rendered } from "./templates";

/**
 * Sends an email for each event in the platform. Rules that keep it safe:
 *  - It NEVER throws, so a mail problem can never fail a payment, sign-in or approval.
 *  - Every email has a dedupe key stored in email_log (unique), so retries and double clicks send it once.
 *  - With no SMTP settings it does nothing (and logs a warning), so the site works before mail is set up.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const deliver = async (
  key: string,
  template: string,
  to: string | string[],
  rendered: Rendered,
) => {
  try {
    if (!isMailConfigured()) {
      console.warn(`[email] mail is not configured, skipped "${template}"`);
      return;
    }
    const recipients = [...new Set([to].flat().map((a) => a.trim()))].filter(
      (a) => EMAIL.test(a),
    );
    if (recipients.length === 0) return;

    // Claim the key. If it already exists and was sent (or is in flight), stop; a failed one may be retried.
    const existing = await prisma.email_log.findUnique({
      where: { dedupe_key: key },
    });
    if (existing && existing.status !== "failed") return;
    const row = existing
      ? await prisma.email_log.update({
          where: { id: existing.id },
          data: { status: "pending", error: null },
        })
      : await prisma.email_log
          .create({
            data: {
              dedupe_key: key,
              template,
              recipient: recipients.join(", "),
            },
          })
          .catch((error) => {
            // Another request claimed it first: that one sends it.
            if ((error as { code?: string }).code === "P2002") return null;
            throw error;
          });
    if (!row) return;

    const result = await sendMail({ to: recipients, ...rendered });
    await prisma.email_log.update({
      where: { id: row.id },
      data:
        result.status === "sent"
          ? { status: "sent", sent_at: new Date() }
          : {
              status: "failed",
              error: result.status === "failed" ? result.error.slice(0, 500) : "not configured",
            },
    });
    if (result.status === "failed")
      console.error(`[email] "${template}" failed:`, result.error);
  } catch (error) {
    console.error(`[email] "${template}" error:`, error);
  }
};

/** Admins who get the "needs your attention" emails: ADMIN_NOTIFY_EMAIL, or else every admin account. */
const adminEmails = async () => {
  const fromEnv = process.env.ADMIN_NOTIFY_EMAIL?.split(",") ?? [];
  if (fromEnv.some((a) => a.trim())) return fromEnv;
  const admins = await prisma.user_roles.findMany({
    where: { role: { in: ["admin", "super_admin"] } },
    select: { user_id: true },
  });
  const profiles = await prisma.profiles.findMany({
    where: { id: { in: admins.map((a) => a.user_id) } },
    select: { email: true },
  });
  return profiles.map((p) => p.email);
};

export const alertAdmins = async (
  key: string,
  subject: string,
  intro: string,
  rows: { label: string; value: string }[],
  path: string,
  ctaLabel: string,
) => {
  try {
    const to = await adminEmails();
    await deliver(
      `admin:${key}`,
      "admin_alert",
      to,
      adminAlert(subject, intro, rows, path, ctaLabel),
    );
  } catch (error) {
    console.error("[email] admin alert error:", error);
  }
};

export const person = async (userId: string) => {
  const profile = await prisma.profiles.findUnique({ where: { id: userId } });
  return { name: profile?.full_name ?? "", email: profile?.email ?? "" };
};

