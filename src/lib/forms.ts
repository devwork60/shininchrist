import { prisma } from "@/lib/prisma";
import { notifyFormSubmission } from "@/lib/email/notify";
import type { submission_status, submission_type } from "@/generated/prisma/enums";
import { SUBMISSION_LABELS } from "@/constant/submissionTypes";

export { SUBMISSION_LABELS };

export interface SubmitFormInput {
  type:
    | "invite_mercy"
    | "volunteer_time"
    | "volunteer_skills"
    | "serve_prayer"
    | "field_service"
    | "partner"
    | "give_in_kind"
    | "give_property"
    | "contact"
    | "other";
  name?: string;
  email?: string;
  data: Record<string, unknown>;
  filePaths?: string[];
  userId?: string;
}

export const saveFormSubmission = async (input: SubmitFormInput) => {
  const { type, data, filePaths = [], userId } = input;

  // Extract name and email from known common fields in the payload if not directly passed
  const name =
    input.name?.trim() ||
    String(data.fullName || data.name || data.contactPerson || data.representative || "").trim() ||
    "Anonymous";

  const email =
    input.email?.trim() ||
    String(data.email || data.emailAddress || data.contactEmail || "").trim() ||
    "no-email@provided.org";

  const typeLabel = SUBMISSION_LABELS[type] ?? type;

  // Save into database
  const submission = await prisma.form_submissions.create({
    data: {
      type,
      name,
      email,
      data: data as never,
      file_paths: filePaths,
      user_id: userId ?? null,
      status: "submitted",
    },
  });

  // Pick up to 4 key summary fields for the email notification
  const summaryRows: { label: string; value: string }[] = [];
  if (data.phone) summaryRows.push({ label: "Phone", value: String(data.phone) });
  if (data.organization) summaryRows.push({ label: "Organization", value: String(data.organization) });
  if (data.eventDate) summaryRows.push({ label: "Event Date", value: String(data.eventDate) });
  if (data.subject) summaryRows.push({ label: "Subject", value: String(data.subject) });
  if (data.issueType) summaryRows.push({ label: "Issue Type", value: String(data.issueType) });

  // Fire email alert to admins
  await notifyFormSubmission(
    typeLabel,
    submission.reference,
    name,
    email,
    summaryRows,
  );

  return submission;
};

export interface SubmissionFilter {
  type?: string;
  status?: string;
  search?: string;
}

export const listSubmissions = async (filter?: SubmissionFilter) => {
  const where: {
    type?: submission_type;
    status?: submission_status;
    OR?: Array<{
      name?: { contains: string; mode: "insensitive" };
      email?: { contains: string; mode: "insensitive" };
      reference?: { contains: string; mode: "insensitive" };
    }>;
  } = {};

  if (filter?.type && filter.type !== "all") {
    where.type = filter.type as submission_type;
  }
  if (filter?.status && filter.status !== "all") {
    where.status = filter.status as submission_status;
  }
  if (filter?.search) {
    const s = filter.search.trim();
    where.OR = [
      { name: { contains: s, mode: "insensitive" } },
      { email: { contains: s, mode: "insensitive" } },
      { reference: { contains: s, mode: "insensitive" } },
    ];
  }

  const rows = await prisma.form_submissions.findMany({
    where,
    orderBy: { created_at: "desc" },
    take: 100,
  });

  return rows.map((row) => ({
    id: row.id,
    reference: row.reference,
    type: row.type,
    typeLabel: SUBMISSION_LABELS[row.type] ?? row.type,
    status: row.status,
    name: row.name ?? "—",
    email: row.email ?? "—",
    data: row.data as Record<string, unknown>,
    filePaths: row.file_paths,
    adminNotes: row.admin_notes,
    createdAt: row.created_at.toISOString(),
  }));
};

export const updateSubmissionStatus = async (
  id: string,
  status:
    | "submitted"
    | "under_review"
    | "accepted"
    | "declined"
    | "scheduled"
    | "completed",
  adminNotes?: string,
) => {
  return prisma.form_submissions.update({
    where: { id },
    data: {
      status,
      admin_notes: adminNotes !== undefined ? adminNotes : undefined,
      updated_at: new Date(),
    },
  });
};
