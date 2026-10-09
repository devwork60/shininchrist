import { defineConfig, env } from "prisma/config";

// Prisma CLI does not read .env.local by itself (Next.js does), so load it here.
process.loadEnvFile(".env.local");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // The CLI (db pull, migrate) uses the session-mode pooler. The app uses DATABASE_URL (see src/lib/prisma.ts).
  datasource: { url: env("DIRECT_URL") },
});
