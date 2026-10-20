import { prisma } from "@/lib/prisma";

/** Admin-only: the most recent payments of every kind (uniform, donations, Library contributions). Callers check getAdminUser(). */

export interface LedgerRow {
  id: string;
  at: Date;
  kind: string;
  payer: string;
  email: string;
  method: string;
  amount: number;
  currency: string;
  status: string;
  reference: string;
}

export const listLedger = async (): Promise<LedgerRow[]> => {
  const rows = await prisma.payments.findMany({
    // "created" rows are checkouts that were never opened: they are noise, not payments.
    where: { status: { not: "created" } },
    orderBy: { created_at: "desc" },
    take: 60,
  });
  return rows.map((p) => ({
    id: p.id,
    at: p.created_at,
    kind:
      p.purpose === "donation"
        ? `Donation${p.designation ? `: ${p.designation}` : ""}`
        : p.purpose === "uniform"
          ? "Uniform"
          : p.designation?.startsWith("library:")
            ? "Library contribution"
            : p.purpose,
    payer: p.payer_name ?? "",
    email: p.payer_email ?? "",
    method: p.gateway === "bank_transfer" ? "Bank transfer" : "Card (Paystack)",
    amount: Number(p.amount),
    currency: p.currency.trim(),
    status: p.status === "confirmed" ? "Paid" : p.status.replaceAll("_", " "),
    reference: p.internal_ref,
  }));
};
