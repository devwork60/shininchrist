import { compose, dateTime, esc, money, type Row } from "./layout";

/** Wording of every email. Text typed by people (names, reasons) is always escaped with esc(). */

export interface Rendered {
  subject: string;
  html: string;
  text: string;
}

const make = (subject: string, body: Parameters<typeof compose>[0]): Rendered => ({
  subject,
  ...compose(body),
});

const first = (name: string) => esc(name.trim().split(/\s+/)[0] || "friend");

// ---------------------------------------------------------------- to the member / donor

export const welcome = (name: string) =>
  make("Welcome to ShininChrist", {
    heading: `Welcome, ${first(name)}!`,
    intro:
      "Your ShininChrist account has been created. To become an active member, complete your registration: your details, your subscription proof, and your uniform.",
    note: "Signing in does not make you a member yet. Your membership becomes active after an admin has checked everything.",
    cta: { label: "Complete your registration", path: "/join" },
  });

export const profileComplete = (name: string) =>
  make("Your profile is complete", {
    heading: "Your profile is complete",
    intro: `Thank you, ${first(name)}. We have saved your registration details. Next, upload your subscription proof and order your uniform.`,
    cta: { label: "Continue registration", path: "/join" },
  });

export const itemResult = (
  name: string,
  item: "proof" | "consent",
  verified: boolean,
) => {
  const label = item === "proof" ? "subscription proof" : "parental consent form";
  return verified
    ? make(`Your ${label} was approved`, {
        heading: "Approved",
        intro: `Good news, ${first(name)}: your ${label} has been verified.`,
        cta: { label: "See your progress", path: "/account" },
      })
    : make(`Your ${label} needs attention`, {
        heading: "Please upload it again",
        intro: `Hello ${first(name)}, we could not accept your ${label}. Please upload a clear, complete file again.`,
        cta: { label: "Upload again", path: "/join" },
      });
};

export interface PaymentFacts {
  reference: string;
  amount: number;
  currency: string;
  method: "card" | "bank_transfer";
  at: Date;
  item?: string;
}

const paymentRows = (p: PaymentFacts): Row[] => [
  ...(p.item ? [{ label: "For", value: p.item }] : []),
  { label: "Amount", value: money(p.amount, p.currency) },
  {
    label: "Method",
    value: p.method === "card" ? "Card (Paystack)" : "Bank transfer",
  },
  { label: "Reference", value: p.reference },
  { label: "Date", value: dateTime(p.at) },
];

/** Receipt: sent once, only after the payment is verified. */
export const receipt = (name: string, p: PaymentFacts) =>
  make(`Payment received: ${money(p.amount, p.currency)}`, {
    heading: "Payment received",
    intro: `Thank you, ${first(name)}. Your payment has been confirmed. Keep this email as your receipt.`,
    rows: paymentRows(p),
    cta: { label: "View my account", path: "/account" },
  });

export const donationReceipt = (name: string, p: PaymentFacts) =>
  make(`Thank you for your gift: ${money(p.amount, p.currency)}`, {
    heading: "Thank you for giving",
    intro: `Dear ${first(name)}, we received your gift. May the Lord bless you. Keep this email as your receipt.`,
    rows: paymentRows(p),
  });

export const transferSubmitted = (name: string, p: PaymentFacts) =>
  make("We received your payment proof", {
    heading: "Payment proof received",
    intro: `Thank you, ${first(name)}. An admin will check your receipt against our bank account. We will email you as soon as it is approved. Your order is not confirmed until then.`,
    rows: paymentRows(p),
    cta: { label: "Check the status", path: "/account" },
  });

export const transferRejected = (name: string, reason: string) =>
  make("Your payment proof was not accepted", {
    heading: "Payment proof not accepted",
    intro: `Hello ${first(name)}, we could not confirm your bank transfer.`,
    rows: [{ label: "Reason", value: reason }],
    note: "Please upload a new, clear receipt. Your order is still saved.",
    cta: { label: "Upload a new receipt", path: "/join" },
  });

export const membershipApproved = (name: string, memberId: string) =>
  make("Your ShininChrist membership is active", {
    heading: "Welcome to the family!",
    intro: `Congratulations, ${first(name)}. Your membership has been approved and is now active. You can now open the member Library and the Daily pages.`,
    rows: [{ label: "Your Member ID", value: memberId }],
    cta: { label: "Open My Account", path: "/account" },
  });

export const membershipSuspended = (name: string, reason: string) =>
  make("Your ShininChrist membership has been suspended", {
    heading: "Membership suspended",
    intro: `Hello ${first(name)}, your membership has been suspended, so member-only pages are closed for now.`,
    rows: [{ label: "Reason", value: reason }],
    note: "If you think this is a mistake, please reply to this email or contact us.",
  });

export const membershipReinstated = (name: string) =>
  make("Your ShininChrist membership is active again", {
    heading: "Welcome back",
    intro: `Hello ${first(name)}, your membership has been reinstated. Member pages are open again.`,
    cta: { label: "Open My Account", path: "/account" },
  });

const ORDER_WORDS: Record<string, string> = {
  preparing: "is being prepared",
  shipped: "has been shipped",
  delivered: "has been delivered",
};

export const orderUpdate = (name: string, orderRef: string, status: string) =>
  make(`Your uniform order ${ORDER_WORDS[status] ?? "was updated"}`, {
    heading: "Order update",
    intro: `Hello ${first(name)}, your uniform order ${ORDER_WORDS[status] ?? "was updated"}.`,
    rows: [{ label: "Order", value: orderRef }],
    cta: { label: "Track my order", path: "/account" },
  });

// ---------------------------------------------------------------- to the admins

export const adminAlert = (
  subject: string,
  intro: string,
  rows: Row[],
  path: string,
  ctaLabel: string,
) =>
  make(`[ShininChrist admin] ${subject}`, {
    heading: subject,
    intro: esc(intro),
    rows,
    cta: { label: ctaLabel, path },
  });
