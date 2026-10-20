import { prisma } from "@/lib/prisma";
import { PaymentInputError } from "./service";

/** Admin-managed bank accounts shown to people who pay by bank transfer. Callers MUST check getAdminUser() first. */

export const BANK_CURRENCIES = ["NGN", "USD"] as const;

export interface BankAccountRow {
  currency: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  instructions: string;
  active: boolean;
}

export const listBankAccounts = async (): Promise<BankAccountRow[]> => {
  const rows = await prisma.bank_accounts.findMany();
  return rows.map((row) => ({
    currency: row.currency,
    bankName: row.bank_name,
    accountTitle: row.account_title,
    accountNumber: row.account_number,
    instructions: row.instructions ?? "",
    active: row.active,
  }));
};

const text = (value: unknown, label: string, max: number) => {
  const clean = String(value ?? "").trim();
  if (!clean) throw new PaymentInputError(`${label} is required.`);
  if (clean.length > max)
    throw new PaymentInputError(`${label} is too long (maximum ${max}).`);
  return clean;
};

export const saveBankAccount = async (
  adminId: string,
  input: Record<string, unknown>,
) => {
  const currency = String(input.currency ?? "").toUpperCase();
  if (!(BANK_CURRENCIES as readonly string[]).includes(currency))
    throw new PaymentInputError("Choose NGN or USD.");
  const instructions = String(input.instructions ?? "").trim();
  if (instructions.length > 1000)
    throw new PaymentInputError("The instructions are too long.");

  const data = {
    bank_name: text(input.bankName, "Bank name", 120),
    account_title: text(input.accountTitle, "Account title", 120),
    account_number: text(input.accountNumber, "Account number or IBAN", 60),
    instructions: instructions || null,
    active: input.active !== false,
    updated_by: adminId,
    updated_at: new Date(),
  };
  await prisma.bank_accounts.upsert({
    where: { currency },
    create: { currency, ...data },
    update: data,
  });
  await prisma.audit_log.create({
    data: { actor_id: adminId, action: "bank_account.save", target: currency },
  });
};
