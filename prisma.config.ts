import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

// Local development keeps its secrets in .env.local, which the Prisma CLI does not read by itself.
// On Vercel there is no such file: the same names come from the project's Environment Variables.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // CLI work (db pull, migrate) uses the session-mode pooler. "prisma generate", which Vercel runs at build time,
    // only reads the schema, so it must not fail when no database address is set.
    url:
      process.env.DIRECT_URL ??
      process.env.DATABASE_URL ??
      "postgresql://not-set@localhost:5432/not-set",
  },
});
