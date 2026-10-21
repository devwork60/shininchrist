import type { NextConfig } from "next";

/**
 * The environment files use the plain names (SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, PAYSTACK_PUBLIC_KEY).
 * The browser can only read variables that Next.js copies into the page, so we copy exactly these three PUBLIC
 * values here. Secrets (SUPABASE_SECRET_KEY, PAYSTACK_SECRET_KEY, DATABASE_URL, DIRECT_URL) are never listed
 * and stay on the server. A NEXT_PUBLIC_ name, if someone sets one, takes priority.
 */
/** Photos uploaded in the admin (public site-media bucket) are served from the Supabase project's address. */
const supabaseHost = (() => {
  try {
    return new URL(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "",
    ).hostname;
  } catch {
    return "";
  }
})();

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.paystack.com https://js.paystack.co;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: ${supabaseHost ? `https://${supabaseHost}` : ""} https://*.supabase.co;
  font-src 'self' data:;
  connect-src 'self' https://api.paystack.co https://checkout.paystack.com ${supabaseHost ? `https://${supabaseHost}` : ""} https://*.supabase.co wss://*.supabase.co ${isDev ? "ws: wss: http://localhost:*" : ""};
  frame-src 'self' https://checkout.paystack.com;
  media-src 'self' ${supabaseHost ? `https://${supabaseHost}` : ""} https://*.supabase.co blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self' https://checkout.paystack.com;
  frame-ancestors 'self';
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    cpus: 1,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/site-media/**",
          },
        ]
      : [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
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
