import { siteUrl } from "@/lib/site-origin";

/** Shared look for every email, plus the escaping that keeps user-typed text from becoming HTML. */

/** Escapes text typed by a person (a name, a rejection reason) before it goes into an HTML email. */
export const esc = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export { siteUrl };

export const money = (amount: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(amount);

export const dateTime = (value: Date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(value) + " UTC";

export interface Row {
  label: string;
  value: string;
}

interface Body {
  heading: string;
  intro: string;
  rows?: Row[];
  note?: string;
  cta?: { label: string; path: string };
}

/** One email in both HTML and plain-text form, so every mail client can read it. */
export const compose = ({ heading, intro, rows = [], note, cta }: Body) => {
  const link = cta ? `${siteUrl()}${cta.path}` : null;
  const table = rows.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0;border:1px solid #e6dcc3;border-radius:8px;background:#faf6ea">${rows
        .map(
          (row) =>
            `<tr><td style="padding:9px 14px;color:#6b6b6b;font-size:14px">${esc(row.label)}</td><td style="padding:9px 14px;text-align:right;font-weight:600;font-size:14px;color:#1b3a2d">${esc(row.value)}</td></tr>`,
        )
        .join("")}</table>`
    : "";
  const html = `<!doctype html><html><body style="margin:0;background:#f3efe4;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:#1b3a2d;padding:18px 24px;color:#ffffff;font-size:20px;font-weight:700">ShininChrist</td></tr>
<tr><td style="padding:26px 24px;color:#2a2a2a;font-size:15px;line-height:1.6">
<h1 style="margin:0 0 10px;font-size:22px;color:#1b3a2d">${esc(heading)}</h1>
<p style="margin:0">${intro}</p>${table}
${note ? `<p style="margin:0 0 6px;color:#555">${note}</p>` : ""}
${cta && link ? `<p style="margin:20px 0 0"><a href="${esc(link)}" style="display:inline-block;background:#b8860b;color:#ffffff;text-decoration:none;padding:11px 20px;border-radius:6px;font-weight:700;font-size:14px">${esc(cta.label)}</a></p>` : ""}
</td></tr>
<tr><td style="padding:14px 24px;background:#faf6ea;color:#888;font-size:12px">This is an automated message from ShininChrist. Please do not share it: it may contain details about your account.</td></tr>
</table></td></tr></table></body></html>`;

  const strip = (text: string) => text.replace(/<[^>]+>/g, "");
  const text = [
    heading,
    "",
    strip(intro),
    ...(rows.length ? ["", ...rows.map((row) => `${row.label}: ${row.value}`)] : []),
    ...(note ? ["", strip(note)] : []),
    ...(link ? ["", `${cta?.label}: ${link}`] : []),
    "",
    "ShininChrist",
  ].join("\n");

  return { html, text };
};
