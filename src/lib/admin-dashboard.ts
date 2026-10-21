import { prisma } from "@/lib/prisma";

export interface AdminStats {
  totalMembers: number;
  activeMembers: number;
  pendingMembers: number;
  totalOrders: number;
  pendingOrders: number;
  totalSubmissions: number;
  newSubmissions: number;
  totalPayments: number;
  pendingPayments: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    const [
      totalMembers,
      activeMembers,
      pendingMembers,
      totalOrders,
      pendingOrders,
      totalSubmissions,
      newSubmissions,
      totalPayments,
      pendingPayments,
    ] = await Promise.all([
      prisma.memberships.count(),
      prisma.memberships.count({ where: { status: "active" } }),
      prisma.memberships.count({
        where: {
          status: {
            in: [
              "started",
              "form_completed",
              "subscription_pending",
              "subscription_verified",
              "consent_pending",
              "consent_verified",
              "uniform_payment_pending",
              "payment_confirmed",
              "approved",
            ],
          },
        },
      }),
      prisma.uniform_orders.count(),
      prisma.uniform_orders.count({
        where: {
          status: {
            in: ["requested", "payment_pending", "paid", "preparing"],
          },
        },
      }),
      prisma.form_submissions.count(),
      prisma.form_submissions.count({ where: { status: "submitted" } }),
      prisma.payments.count({ where: { status: "confirmed" } }),
      prisma.payments.count({ where: { status: "pending_verification" } }),
    ]);

    return {
      totalMembers,
      activeMembers,
      pendingMembers,
      totalOrders,
      pendingOrders,
      totalSubmissions,
      newSubmissions,
      totalPayments,
      pendingPayments,
    };
  } catch {
    return {
      totalMembers: 0,
      activeMembers: 0,
      pendingMembers: 0,
      totalOrders: 0,
      pendingOrders: 0,
      totalSubmissions: 0,
      newSubmissions: 0,
      totalPayments: 0,
      pendingPayments: 0,
    };
  }
};

export const getRecentAdminActivity = async () => {
  try {
    const [recentPayments, recentSubmissions, recentOrders] = await Promise.all([
      prisma.payments.findMany({
        take: 4,
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          internal_ref: true,
          payer_name: true,
          payer_email: true,
          amount: true,
          currency: true,
          purpose: true,
          status: true,
          created_at: true,
        },
      }),
      prisma.form_submissions.findMany({
        take: 4,
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          type: true,
          name: true,
          email: true,
          status: true,
          created_at: true,
        },
      }),
      prisma.uniform_orders.findMany({
        take: 4,
        orderBy: { created_at: "desc" },
        select: {
          id: true,
          reference: true,
          uniform_type: true,
          size: true,
          quantity: true,
          status: true,
          delivery_city: true,
          created_at: true,
          users: {
            select: {
              raw_user_meta_data: true,
            },
          },
        },
      }),
    ]);

    return { recentPayments, recentSubmissions, recentOrders };
  } catch {
    return { recentPayments: [], recentSubmissions: [], recentOrders: [] };
  }
};
