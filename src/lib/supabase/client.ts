import { createBrowserClient } from "@supabase/ssr";

/** Supabase client for the browser (client components). Uses only the public publishable key. */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
