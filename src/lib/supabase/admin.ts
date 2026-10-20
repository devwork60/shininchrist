import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client with the SECRET key. SERVER ONLY: never import this from a "use client" file, and never send
 * what it returns to the browser except a short-lived link. It is used for exactly two jobs: signing short
 * download links for private library files (after our own membership/contribution checks) and managing those files.
 */
export const createAdminClient = () => {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!url || !key) {
    throw new Error("SUPABASE_SECRET_KEY is not set (needed for Library files)");
  }
  return createClient(url, key, { auth: { persistSession: false } });
};
