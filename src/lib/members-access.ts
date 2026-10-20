import { JoinInputError } from "@/lib/join";
import { prisma } from "@/lib/prisma";

/**
 * Admin-only role changes and member suspension. Callers MUST check getAdminUser() first and pass the actor.
 * Rules that protect the site:
 *  - Nobody changes their own roles or suspends themselves (no accidental lock-out).
 *  - Only a Super Admin can give or remove the Admin role, or suspend an admin.
 *  - A Super Admin's roles are never changed from the app (database only).
 *  - Suspending removes the member's access straight away: status, role and every signed-in session.
 */

export interface Actor {
  id: string;
  isSuperAdmin: boolean;
}

/** Roles an admin can switch on and off. "active_member" follows activation / suspension; "super_admin" is database-only. */
export const ASSIGNABLE_ROLES = ["learner", "teacher", "admin"] as const;
type AssignableRole = (typeof ASSIGNABLE_ROLES)[number];

const MAX_REASON = 500;

const rolesOf = async (userId: string) =>
  (await prisma.user_roles.findMany({ where: { user_id: userId } })).map(
    (row) => row.role as string,
  );

const requireMember = async (userId: string) => {
  const profile = await prisma.profiles.findUnique({ where: { id: userId } });
  if (!profile) throw new JoinInputError("Member not found.");
  return profile;
};

/** Blocks changes to people the actor is not allowed to touch. */
const assertCanManage = (actor: Actor, userId: string, targetRoles: string[]) => {
  if (userId === actor.id)
    throw new JoinInputError("You cannot change your own access.");
  if (targetRoles.includes("super_admin"))
    throw new JoinInputError(
      "A Super Admin can only be changed in the database.",
    );
  if (targetRoles.includes("admin") && !actor.isSuperAdmin)
    throw new JoinInputError("Only a Super Admin can change an admin.");
};

export const setMemberRole = async (
  actor: Actor,
  userId: string,
  role: unknown,
  grant: unknown,
) => {
  if (!(ASSIGNABLE_ROLES as readonly string[]).includes(String(role)))
    throw new JoinInputError("That role cannot be changed here.");
  const target = role as AssignableRole;
  if (typeof grant !== "boolean")
    throw new JoinInputError("Invalid request.");

  await requireMember(userId);
  const current = await rolesOf(userId);
  assertCanManage(actor, userId, current);
  if (target === "admin" && !actor.isSuperAdmin)
    throw new JoinInputError("Only a Super Admin can give or remove Admin.");

  if (grant) {
    await prisma.user_roles.upsert({
      where: { user_id_role: { user_id: userId, role: target } },
      create: { user_id: userId, role: target },
      update: {},
    });
  } else {
    await prisma.user_roles.deleteMany({
      where: { user_id: userId, role: target },
    });
  }
  await prisma.audit_log.create({
    data: {
      actor_id: actor.id,
      action: grant ? "role.grant" : "role.revoke",
      target: userId,
      details: { role: target },
    },
  });
};

export const suspendMember = async (
  actor: Actor,
  userId: string,
  reason: unknown,
) => {
  const text = String(reason ?? "").trim();
  if (text.length < 3)
    throw new JoinInputError("Please give a reason for the suspension.");
  if (text.length > MAX_REASON)
    throw new JoinInputError(`The reason is too long (maximum ${MAX_REASON}).`);

  await requireMember(userId);
  assertCanManage(actor, userId, await rolesOf(userId));
  const membership = await prisma.memberships.findUnique({
    where: { user_id: userId },
  });
  if (membership?.status !== "active")
    throw new JoinInputError("Only an active member can be suspended.");

  await prisma.$transaction([
    prisma.memberships.update({
      where: { user_id: userId },
      data: {
        status: "suspended",
        suspended_at: new Date(),
        suspended_by: actor.id,
        suspended_reason: text,
      },
    }),
    prisma.user_roles.deleteMany({
      where: { user_id: userId, role: "active_member" },
    }),
    // Ends every signed-in session, so the member is logged out on all devices.
    prisma.sessions.deleteMany({ where: { user_id: userId } }),
    prisma.audit_log.create({
      data: {
        actor_id: actor.id,
        action: "membership.suspend",
        target: userId,
        details: { reason: text },
      },
    }),
  ]);
};

export const reinstateMember = async (actor: Actor, userId: string) => {
  await requireMember(userId);
  assertCanManage(actor, userId, await rolesOf(userId));
  const membership = await prisma.memberships.findUnique({
    where: { user_id: userId },
  });
  if (membership?.status !== "suspended")
    throw new JoinInputError("This member is not suspended.");

  await prisma.$transaction([
    prisma.memberships.update({
      where: { user_id: userId },
      data: {
        status: "active",
        suspended_at: null,
        suspended_by: null,
        suspended_reason: null,
      },
    }),
    prisma.user_roles.upsert({
      where: { user_id_role: { user_id: userId, role: "active_member" } },
      create: { user_id: userId, role: "active_member" },
      update: {},
    }),
    prisma.audit_log.create({
      data: {
        actor_id: actor.id,
        action: "membership.reinstate",
        target: userId,
      },
    }),
  ]);
};
