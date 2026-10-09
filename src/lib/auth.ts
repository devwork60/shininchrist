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

  // Row Level Security lets a user read only their own roles.
  const { data } = await supabase.from("user_roles").select("role");
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
