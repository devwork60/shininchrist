import { randomUUID } from "node:crypto";
import { JoinInputError } from "@/lib/join";
import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";

/** Admin-only Library management. Callers MUST check getAdminUser() first. Files live in the PRIVATE library-files bucket. */

export const CONTENT_TYPES = [
  "Teaching",
  "Music",
  "Prayer",
  "Book",
  "Study guide",
  "Tool",
  "Other",
] as const;

/** Allowed file types: extension -> the content type the browser must declare. */
const FILE_TYPES: Record<string, string[]> = {
  pdf: ["application/pdf"],
  mp3: ["audio/mpeg"],
  m4a: ["audio/mp4", "audio/x-m4a"],
  mp4: ["video/mp4"],
  epub: ["application/epub+zip"],
  zip: ["application/zip"],
  doc: ["application/msword"],
  docx: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  png: ["image/png"],
};
const MAX_BYTES = 50 * 1024 * 1024;
const PATH_PATTERN = /^resources\/[0-9a-f-]{36}\.[a-z0-9]{2,5}$/;
const BUCKET = "library-files";

export interface AdminResource {
  id: string;
  title: string;
  description: string;
  contentType: string;
  collection: string;
  scripture: string;
  access: "free" | "contribution";
  published: boolean;
  fileName: string;
  fileSize: number | null;
  hasFile: boolean;
  downloads: number;
}

export const listAdminResources = async (): Promise<AdminResource[]> => {
  const [rows, counts] = await Promise.all([
    prisma.library_resources.findMany({ orderBy: { created_at: "desc" } }),
    prisma.resource_downloads.groupBy({
      by: ["resource_id"],
      _count: { _all: true },
    }),
  ]);
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    contentType: row.content_type ?? "Other",
    collection: row.collection ?? "",
    scripture: row.scripture ?? "",
    access: row.access,
    published: row.published,
    fileName: row.file_name ?? "",
    fileSize: row.file_size === null ? null : Number(row.file_size),
    hasFile: Boolean(row.file_path),
    downloads: counts.find((c) => c.resource_id === row.id)?._count._all ?? 0,
  }));
};

/** Checks a file's name, type and size and returns a one-time upload ticket (the file goes straight to storage). */
export const createUploadTarget = async (input: Record<string, unknown>) => {
  const fileName = String(input.fileName ?? "").trim();
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
  const allowed = FILE_TYPES[extension];
  if (!allowed)
    throw new JoinInputError(
      `That file type is not allowed. Use: ${Object.keys(FILE_TYPES).join(", ")}.`,
    );
  if (!allowed.includes(String(input.contentType ?? "")))
    throw new JoinInputError("The file does not match its type.");
  const size = Number(input.size);
  if (!Number.isFinite(size) || size <= 0 || size > MAX_BYTES)
    throw new JoinInputError("The file is too large (maximum 50 MB).");

  const path = `resources/${randomUUID()}.${extension}`;
  const { data, error } = await createAdminClient()
    .storage.from(BUCKET)
    .createSignedUploadUrl(path);
  if (error || !data) {
    console.error("[library] upload ticket failed:", error?.message);
    throw new Error("Could not start the upload");
  }
  return { path, token: data.token };
};

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "resource";

const text = (value: unknown, label: string, max: number, required = false) => {
  const clean = String(value ?? "").trim();
  if (required && clean.length < 2) throw new JoinInputError(`${label} is required.`);
  if (clean.length > max)
    throw new JoinInputError(`${label} is too long (maximum ${max} characters).`);
  return clean;
};

export const saveResource = async (adminId: string, input: Record<string, unknown>) => {
  const title = text(input.title, "Title", 120, true);
  const contentType = String(input.contentType ?? "");
  if (!(CONTENT_TYPES as readonly string[]).includes(contentType))
    throw new JoinInputError("Please choose a type.");
  const access = input.access === "contribution" ? "contribution" : "free";
  const published = input.published === true;
  const id = input.id ? String(input.id) : null;

  const existing = id
    ? await prisma.library_resources.findUnique({ where: { id } })
    : null;
  if (id && !existing) throw new JoinInputError("Resource not found.");

  // A new file was uploaded: it must be one of our upload tickets and really exist in storage.
  let file: { path: string; name: string; mime: string; size: number } | null = null;
  if (input.filePath) {
    const path = String(input.filePath);
    if (!PATH_PATTERN.test(path)) throw new JoinInputError("Please upload the file again.");
    const probe = await createAdminClient().storage.from(BUCKET).createSignedUrl(path, 5);
    if (probe.error) throw new JoinInputError("The uploaded file was not found. Please upload it again.");
    file = {
      path,
      name: text(input.fileName, "File name", 150, true),
      mime: text(input.mimeType, "File type", 100),
      size: Math.max(0, Math.floor(Number(input.fileSize) || 0)),
    };
  }
  if (published && !file && !existing?.file_path)
    throw new JoinInputError("Upload a file before publishing this resource.");

  const data = {
    title,
    description: text(input.description, "Description", 1000) || null,
    content_type: contentType,
    collection: text(input.collection, "Collection", 60) || null,
    scripture: text(input.scripture, "Scripture", 120) || null,
    access,
    published,
    published_at: published ? (existing?.published_at ?? new Date()) : null,
    ...(file
      ? { file_path: file.path, file_name: file.name, mime_type: file.mime, file_size: file.size }
      : {}),
  } as const;

  let saved;
  if (existing) {
    saved = await prisma.library_resources.update({ where: { id: existing.id }, data });
    if (file && existing.file_path)
      await createAdminClient().storage.from(BUCKET).remove([existing.file_path]);
  } else {
    let slug = slugify(title);
    if (await prisma.library_resources.findUnique({ where: { slug } }))
      slug = `${slug}-${randomUUID().slice(0, 6)}`;
    saved = await prisma.library_resources.create({ data: { ...data, slug } });
  }
  await prisma.audit_log.create({
    data: { actor_id: adminId, action: existing ? "library.update" : "library.create", target: saved.id },
  });
  return { id: saved.id };
};

export const deleteResource = async (adminId: string, id: string) => {
  const row = await prisma.library_resources.findUnique({ where: { id } });
  if (!row) throw new JoinInputError("Resource not found.");
  await prisma.library_resources.delete({ where: { id } });
  if (row.file_path)
    await createAdminClient().storage.from(BUCKET).remove([row.file_path]);
  await prisma.audit_log.create({
    data: { actor_id: adminId, action: "library.delete", target: id, details: { title: row.title } },
  });
};
