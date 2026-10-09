import { prisma } from "@/lib/prisma";

export interface DeviceSession {
  id: string;
  userAgent: string;
  ip: string;
  lastActive: Date | null;
}

export interface UserSessionRow {
  id: string;
  name: string;
  email: string;
  roles: string[];
  sessions: number;
  lastActive: Date | null;
}

/** Turns "Mozilla/5.0 (Windows NT ...) Chrome/..." into a short label like "Chrome on Windows". */
export const describeDevice = (userAgent: string | null) => {
  const ua = userAgent ?? "";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /Chrome\//.test(ua)
      ? "Chrome"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Safari\//.test(ua)
          ? "Safari"
          : "Browser";
  const os = /Windows/.test(ua)
    ? "Windows"
    : /iPhone|iPad/.test(ua)
      ? "iOS"
      : /Android/.test(ua)
        ? "Android"
        : /Mac OS/.test(ua)
          ? "macOS"
          : /Linux/.test(ua)
            ? "Linux"
            : "unknown device";
  return `${browser} on ${os}`;
};

/** Sessions of one user (for the My Account "Security and devices" card). */
export const getUserSessions = async (
  userId: string,
): Promise<DeviceSession[]> => {
  const rows = await prisma.sessions.findMany({
    where: { user_id: userId },
    orderBy: { updated_at: "desc" },
  });
  return rows.map((row) => ({
    id: row.id,
    userAgent: describeDevice(row.user_agent),
    ip: row.ip ?? "",
    lastActive: row.refreshed_at ?? row.updated_at ?? row.created_at,
  }));
};

/** All users with their session counts (admin only: callers must check the role first). */
export const listUserSessions = async (): Promise<UserSessionRow[]> => {
  const [profiles, roles, sessions] = await Promise.all([
    prisma.profiles.findMany({ orderBy: { created_at: "desc" }, take: 200 }),
    prisma.user_roles.findMany(),
    prisma.sessions.groupBy({
      by: ["user_id"],
      _count: { _all: true },
      _max: { updated_at: true },
    }),
  ]);

  return profiles.map((profile) => {
    const stat = sessions.find((s) => s.user_id === profile.id);
    return {
      id: profile.id,
      name: profile.full_name ?? profile.email,
      email: profile.email,
      roles: roles.filter((r) => r.user_id === profile.id).map((r) => r.role),
      sessions: stat?._count._all ?? 0,
      lastActive: stat?._max.updated_at ?? null,
    };
  });
};
