import { createClient } from "@/lib/supabase/server";
import { JoinInputError } from "@/lib/join";

type Bucket = "proofs" | "consents" | "receipts" | "site-media";

interface Rules {
  maxBytes: number;
  maxLabel: string;
  types: Record<string, string>;
  allowedLabel: string;
}

const RULES: Record<Bucket, Rules> = {
  proofs: {
    maxBytes: 10 * 1024 * 1024,
    maxLabel: "10 MB",
    types: { "image/jpeg": "jpg", "image/png": "png", "application/pdf": "pdf" },
    allowedLabel: "JPG, PNG or PDF",
  },
  consents: {
    maxBytes: 10 * 1024 * 1024,
    maxLabel: "10 MB",
    types: { "image/jpeg": "jpg", "image/png": "png", "application/pdf": "pdf" },
    allowedLabel: "JPG, PNG or PDF",
  },
  "site-media": {
    maxBytes: 4 * 1024 * 1024,
    maxLabel: "4 MB",
    types: { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" },
    allowedLabel: "JPG, PNG or WebP",
  },
  receipts: {
    // Vercel rejects request bodies over about 4.5 MB, so the app limit stays below that.
    maxBytes: 4 * 1024 * 1024,
    maxLabel: "4 MB",
    types: { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" },
    allowedLabel: "JPG, PNG or WebP",
  },
};

/** The real type of a file from its first bytes, so a renamed text file cannot pass as an image. */
const sniffType = async (file: File) => {
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const at = (i: number, text: string) =>
    [...text].every((char, k) => b[i + k] === char.charCodeAt(0));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b[0] === 0x89 && at(1, "PNG")) return "image/png";
  if (at(0, "RIFF") && at(8, "WEBP")) return "image/webp";
  if (at(0, "%PDF")) return "application/pdf";
  return null;
};

/** Checks a chosen file against the bucket's rules. Throws a readable error; call before creating any records. */
export const validateUpload = async (
  bucket: Bucket,
  value: FormDataEntryValue | null,
): Promise<File> => {
  const rules = RULES[bucket];
  if (!(value instanceof File) || value.size === 0) {
    throw new JoinInputError("Please choose a file to upload.");
  }
  if (value.size > rules.maxBytes)
    throw new JoinInputError(
      `The file is too large (maximum ${rules.maxLabel}).`,
    );
  if (!rules.types[value.type])
    throw new JoinInputError(`Only ${rules.allowedLabel} files are allowed.`);
  if ((await sniffType(value)) !== value.type)
    throw new JoinInputError(`Only real ${rules.allowedLabel} files are allowed.`);
  return value;
};

/**
 * Stores an upload in a PRIVATE bucket under the user's own folder and returns its storage path.
 * The path is saved in the database; the file itself is only readable by admins through signed links.
 * Storage rules (migrations 0002 and 0003) also enforce the folder, the size and the file types.
 */
export const uploadPrivateFile = async (
  bucket: Bucket,
  userId: string,
  value: FormDataEntryValue | null,
) => {
  const file = await validateUpload(bucket, value);
  const extension = RULES[bucket].types[file.type];

  // A random name: the original file name is never trusted or used in the path.
  const path = `${userId}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const supabase = await createClient();
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    console.error("[upload] failed:", error.message);
    throw new Error("Upload failed");
  }
  return path;
};
