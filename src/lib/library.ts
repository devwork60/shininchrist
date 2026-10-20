import { isActiveMember } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { assertPaystackConfigured } from "@/lib/payments/paystack";
import { PaymentInputError, checkout } from "@/lib/payments/service";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Member Library: what a member can see and download.
 *  - Free resources download straight away.
 *  - "Give what you can" resources accept any amount, INCLUDING zero. Zero downloads at once; anything above zero
 *    goes through Paystack and unlocks the download once the payment is confirmed.
 *  - Files stay private. The browser only ever receives a link that works for 60 seconds, created here after checks.
 */

export interface LibraryResourceView {
  id: string;
  title: string;
  description: string;
  contentType: string;
  collection: string;
  scripture: string;
  access: "free" | "contribution";
  fileName: string;
  fileSize: number | null;
  /** The member has already paid a contribution for this resource, so it downloads freely from now on. */
  contributed: boolean;
}

export type DownloadResult =
  | { kind: "download"; url: string }
  | { kind: "checkout"; url: string; accessCode: string; reference: string };

const DESIGNATION = "library:";
const SIGNED_LINK_SECONDS = 60;
const DOWNLOADS_PER_HOUR = 30;
const MAX_CONTRIBUTION = 10_000_000;
const MIN_CONTRIBUTION: Record<string, number> = { NGN: 100, USD: 1 };

/** Currency a member is charged in: the one their country is priced in, otherwise Naira. */
export const memberCurrency = async (userId: string) => {
  const profile = await prisma.profiles.findUnique({ where: { id: userId } });
  const price = profile?.country_code
    ? await prisma.uniform_prices.findUnique({
        where: { country_code: profile.country_code },
      })
    : null;
  return price?.currency.trim() === "USD" ? "USD" : "NGN";
};

export const listResources = async (
  userId: string,
): Promise<LibraryResourceView[]> => {
  const [rows, paid] = await Promise.all([
    prisma.library_resources.findMany({
      where: { published: true, file_path: { not: null } },
      orderBy: [{ published_at: "desc" }, { created_at: "desc" }],
    }),
    prisma.payments.findMany({
      where: {
        user_id: userId,
        status: "confirmed",
        designation: { startsWith: DESIGNATION },
      },
      select: { designation: true },
    }),
  ]);
  const contributed = new Set(
    paid.map((p) => (p.designation ?? "").slice(DESIGNATION.length)),
  );
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    contentType: row.content_type ?? "Resource",
    collection: row.collection ?? "",
    scripture: row.scripture ?? "",
    access: row.access,
    fileName: row.file_name ?? "",
    fileSize: row.file_size === null ? null : Number(row.file_size),
    contributed: contributed.has(row.id),
  }));
};

const parseAmount = (value: unknown) => {
  if (value === undefined || value === null || String(value).trim() === "")
    return 0;
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 0 || amount > MAX_CONTRIBUTION)
    throw new PaymentInputError("Please enter a valid amount (0 or more).");
  return Math.round(amount * 100) / 100;
};

const safeFileName = (name: string) =>
  name.replace(/[^\w.\- ()]+/g, "_").slice(0, 120) || "download";

/** Records the download, then returns a link that expires in 60 seconds. */
const issue = async (
  userId: string,
  resource: { id: string; file_path: string | null; file_name: string | null },
  contribution: number,
  paymentId: string | null,
): Promise<DownloadResult> => {
  if (!resource.file_path) throw new PaymentInputError("This file is not available.");
  const { data, error } = await createAdminClient()
    .storage.from("library-files")
    .createSignedUrl(resource.file_path, SIGNED_LINK_SECONDS, {
      download: safeFileName(resource.file_name ?? "download"),
    });
  if (error || !data) {
    console.error("[library] could not sign link:", error?.message);
    throw new Error("Could not prepare the download");
  }
  await prisma.resource_downloads.create({
    data: {
      resource_id: resource.id,
      user_id: userId,
      contribution,
      payment_id: paymentId,
    },
  });
  return { kind: "download", url: data.signedUrl };
};

export const requestDownload = async (
  user: { id: string; email: string; name: string; isAdmin: boolean },
  resourceId: string,
  amountInput: unknown,
  origin: string,
): Promise<DownloadResult> => {
  // Active members only (admins manage the content, so they may open it too).
  if (!user.isAdmin && !(await isActiveMember(user.id)))
    throw new PaymentInputError("The Library is for active members.");

  const resource = await prisma.library_resources.findUnique({
    where: { id: resourceId },
  });
  if (!resource || !resource.published || !resource.file_path)
    throw new PaymentInputError("This resource is not available.");

  const recent = await prisma.resource_downloads.count({
    where: {
      user_id: user.id,
      created_at: { gt: new Date(Date.now() - 60 * 60 * 1000) },
    },
  });
  if (recent >= DOWNLOADS_PER_HOUR)
    throw new PaymentInputError(
      "You have reached the download limit for this hour. Please try again later.",
    );

  if (resource.access === "free") return issue(user.id, resource, 0, null);

  // "Give what you can": a gift already received unlocks it for good.
  const gift = await prisma.payments.findFirst({
    where: {
      user_id: user.id,
      status: "confirmed",
      designation: `${DESIGNATION}${resource.id}`,
    },
    orderBy: { verified_at: "desc" },
  });
  if (gift) return issue(user.id, resource, Number(gift.amount), gift.id);

  const amount = parseAmount(amountInput);
  if (amount === 0) return issue(user.id, resource, 0, null);

  // A real contribution: pay first, download after the payment is verified.
  assertPaystackConfigured();
  const currency = await memberCurrency(user.id);
  const minimum = MIN_CONTRIBUTION[currency] ?? 1;
  if (amount < minimum)
    throw new PaymentInputError(
      `The smallest contribution is ${minimum} ${currency}. You can also choose 0 to download for free.`,
    );
  const payment = await prisma.payments.create({
    data: {
      purpose: "other",
      user_id: user.id,
      amount,
      currency,
      gateway: "paystack",
      status: "created",
      payer_name: user.name,
      payer_email: user.email,
      designation: `${DESIGNATION}${resource.id}`,
    },
  });
  const start = await checkout(
    payment.id,
    payment.internal_ref,
    user.email,
    amount,
    currency,
    origin,
    { purpose: "library", resource: resource.slug },
  );
  return {
    kind: "checkout",
    url: start.authorizationUrl,
    accessCode: start.accessCode,
    reference: start.reference,
  };
};
