import type { NextConfig } from "next";

/**
 * The environment files use the plain names (SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, PAYSTACK_PUBLIC_KEY).
 * The browser can only read variables that Next.js copies into the page, so we copy exactly these three PUBLIC
 * values here. Secrets (SUPABASE_SECRET_KEY, PAYSTACK_SECRET_KEY, DATABASE_URL, DIRECT_URL) are never listed
 * and stay on the server. A NEXT_PUBLIC_ name, if someone sets one, takes priority.
 */
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.SUPABASE_PUBLISHABLE_KEY ??
      "",
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ??
      process.env.PAYSTACK_PUBLIC_KEY ??
      "",
  },
};

export default nextConfig;
