import { createBrowserClient } from "@supabase/ssr";

/** Supabase client for the browser (client components). Uses only the public publishable key. */
export const createClient = () => {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    "";

  return createBrowserClient(url, key);
};
