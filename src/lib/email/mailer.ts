import nodemailer, { type Transporter } from "nodemailer";

/**
 * The ONLY file that talks to a mail server. It uses plain SMTP, so any provider works (Gmail, Zoho, Brevo,
 * Resend's SMTP, the client's own mail host). Server-only: the credentials never reach the browser.
 *
 *   SMTP_HOST, SMTP_PORT (587 or 465), SMTP_USER, SMTP_PASS, MAIL_FROM, optional MAIL_REPLY_TO
 */

export interface Mail {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
}

export type SendResult =
  | { status: "sent" }
  | { status: "not_configured" }
  | { status: "failed"; error: string };

const config = () => {
  const host = process.env.SMTP_HOST?.trim();
  const from = (process.env.MAIL_FROM ?? process.env.SMTP_USER)?.trim();
  if (!host || !from) return null;
  return {
    host,
    from,
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER?.trim(),
    pass: process.env.SMTP_PASS,
    replyTo: process.env.MAIL_REPLY_TO?.trim() || undefined,
  };
};

export const isMailConfigured = () => config() !== null;

let transporter: Transporter | null = null;

const getTransporter = (settings: NonNullable<ReturnType<typeof config>>) => {
  transporter ??= nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    // Port 465 is SSL from the start; 587 upgrades with STARTTLS automatically.
    secure: settings.port === 465,
    auth: settings.user ? { user: settings.user, pass: settings.pass } : undefined,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });
  return transporter;
};

/** Sends one email. Never throws: the caller (a payment, a sign-in) must not fail because mail did. */
export const sendMail = async (mail: Mail): Promise<SendResult> => {
  const settings = config();
  if (!settings) return { status: "not_configured" };
  try {
    await getTransporter(settings).sendMail({
      from: settings.from,
      replyTo: settings.replyTo,
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    });
    return { status: "sent" };
  } catch (error) {
    return {
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown mail error",
    };
  }
};
