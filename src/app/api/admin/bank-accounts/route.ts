import { NextResponse, type NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { listBankAccounts, saveBankAccount } from "@/lib/payments/bank-accounts";
import { paymentErrorResponse } from "@/lib/payments/http";

/** Admin only: read the bank accounts shown to people who pay by transfer. */
export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  return NextResponse.json({ accounts: await listBankAccounts() });
}

/** Admin only: create or update the bank account for one currency. */
export async function POST(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    await saveBankAccount(admin.id, await request.json());
    return NextResponse.json({ ok: true });
  } catch (error) {
    return paymentErrorResponse(error);
  }
}
