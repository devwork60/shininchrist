import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export type Role =
  "pending" | "active_member" | "learner" | "teacher" | "admin" | "super_admin";

/** The signed-in user (verified by Supabase) with their roles, or null. Server-only. */
export const getCurrentUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Row Level Security lets an ADMIN read everyone's roles, so always ask for this user's own rows explicitly.
  // Without the filter an admin would appear to hold every role in the system (including super_admin).
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);
  const roles = (data ?? []).map((row) => row.role as Role);

  return {
    id: user.id,
    email: user.email ?? "",
    name:
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      user.email ??
      "",
    roles,
    isAdmin: roles.includes("admin") || roles.includes("super_admin"),
  };
};

/** Same as getCurrentUser but returns null unless the user is an admin. Always call this in admin API routes and pages. */
export const getAdminUser = async () => {
  const user = await getCurrentUser();
  return user?.isAdmin ? user : null;
};

/**
 * True only for an ACTIVE member (an admin has approved the registration). Signing in with Google, or an
 * unfinished profile, is not enough. Same rule as the database's is_active_member().
 */
export const isActiveMember = async (userId: string) =>
  (await prisma.memberships.count({
    where: { user_id: userId, status: "active" },
  })) > 0;

/**
 * Who may see member-only pages (Library, Daily This Week, Daily Archive): an ACTIVE member, or an admin who
 * manages the content. Checked on the server for each request, so locked content is never sent to anyone else.
 * "signedIn" lets the page tell a visitor to log in and a signed-in person to finish joining.
 */
export const getMemberAccess = async () => {
  const user = await getCurrentUser();
  if (!user) return { signedIn: false, allowed: false, userId: null };
  const allowed = user.isAdmin || (await isActiveMember(user.id));
  return { signedIn: true, allowed, userId: user.id };
};
