import { createClient } from "@/lib/supabase/server";
import { JoinInputError } from "@/lib/join";

const MAX_BYTES = 10 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "application/pdf": "pdf",
};

/**
 * Stores an upload in a PRIVATE bucket under the user's own folder and returns its storage path.
 * The path is saved in the database; the file itself is only readable by admins through signed links.
 * Storage rules (migration 0002) also enforce the folder, the size and the file types.
 */
export const uploadPrivateFile = async (
  bucket: "proofs" | "consents",
  userId: string,
  value: FormDataEntryValue | null,
) => {
  if (!(value instanceof File) || value.size === 0) {
    throw new JoinInputError("Please choose a file to upload.");
  }
  if (value.size > MAX_BYTES)
    throw new JoinInputError("The file is too large (maximum 10 MB).");
  const extension = TYPES[value.type];
  if (!extension)
    throw new JoinInputError("Only JPG, PNG or PDF files are allowed.");

  // A random name: the original file name is never trusted or used in the path.
  const path = `${userId}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const supabase = await createClient();
  const { error } = await supabase.storage.from(bucket).upload(path, value, {
    contentType: value.type,
    upsert: false,
  });
  if (error) {
    console.error("[upload] failed:", error.message);
    throw new Error("Upload failed");
  }
  return path;
};
