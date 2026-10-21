import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import MainHeading from "@/components/pages/typography/MainHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import UiIcons from "@/components/icons/UiIcons";
import AuthIcons from "@/components/icons/AuthIcons";
import { getAdminUser } from "@/lib/auth";
import { getAdminStats, getRecentAdminActivity } from "@/lib/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Command Center | ShininChrist",
  robots: { index: false },
};

const HUBS = [
  {
    title: "Members & Chapters",
    description:
      "Review applicants, assign chapter placements (Men, Women, Youth), update roles, and manage active status.",
    href: "/admin/members",
    icon: "users" as const,
    badge: "Membership",
  },
  {
    title: "Uniform Orders Ledger",
    description:
      "Full order tracking, size specifications, packaging, shipping updates, and city-by-city delivery.",
    href: "/admin/orders",
    icon: "cart" as const,
    badge: "Fulfillment",
  },
  {
    title: "Regional Pricing & Delivery",
    description:
      "Manage uniform costs, delivery surcharges, and country availability settings.",
    href: "/admin/prices",
    icon: "creditCard" as const,
    badge: "Pricing",
  },
  {
    title: "Payments & Proof Review",
    description:
      "Inspect card transactions via Paystack, verify bank transfer proofs, and issue payment approvals.",
    href: "/admin/payments",
    icon: "shield" as const,
    badge: "Finance",
  },
  {
    title: "Form Submissions Inbox",
    description:
      "Access incoming contact messages, volunteer applications, prayer requests, and partnership proposals.",
    href: "/admin/submissions",
    icon: "mail" as const,
    badge: "Inbox",
  },
  {
    title: "Site Content & Announcements",
    description:
      "Edit the Homepage Hero, active announcement banner, FAQ database, Invite Mercy page, and global footer.",
    href: "/admin/content",
    icon: "sparkle" as const,
    badge: "Content",
  },
  {
    title: "Digital Library Resources",
    description:
      "Upload and manage educational, biblical, and cultural publications, study PDFs, and track user downloads.",
    href: "/admin/library",
    icon: "book" as const,
    badge: "Publishing",
  },
  {
    title: "Designated Bank Accounts",
    description:
      "Maintain active bank coordinates displayed to members for manual donations and uniform wire transfers.",
    href: "/admin/bank-accounts",
    icon: "home" as const,
    badge: "Banking",
  },
  {
    title: "Session Control & Security",
    description:
      "Monitor concurrent user and administrator logins, view IP origins, and terminate unauthorized sessions.",
    href: "/admin/sessions",
    icon: "shield" as const,
    badge: "Security",
  },
];

export default async function AdminDashboardPage() {
  const admin = await getAdminUser();
  if (!admin) notFound();

  const [stats, activity] = await Promise.all([
    getAdminStats(),
    getRecentAdminActivity(),
  ]);

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        {/* Header & Welcome */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-black/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-gold/40 bg-white px-3 py-1 text-xs font-semibold text-primary-gold shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Administrator Control Center
            </div>
            <MainHeading as="h1" className="mt-2 !text-primary-green lg:!leading-tight">
              Admin Portal
            </MainHeading>
            <p className="mt-1 text-sm text-text-dark">
              Signed in as <span className="font-semibold text-primary-green">{admin.name || admin.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="rounded-xl border border-primary-green/30 bg-white px-4 py-2 text-xs font-semibold text-primary-green hover:bg-primary-green hover:text-white transition-colors"
            >
              Switch to Member View
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Admin Portal", href: "/admin" },
            ]}
          />
        </div>

        {/* Metric Cards Row */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Members */}
          <Link
            href="/admin/members"
            className="group rounded-2xl border border-primary-gold/25 bg-white p-5 shadow-xs hover:border-primary-gold hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-grey">
                Members
              </span>
              <div className="rounded-full bg-cream p-2 text-primary-green group-hover:bg-primary-gold group-hover:text-white transition-colors">
                <UiIcons name="users" />
              </div>
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-card-heading">
              {stats.totalMembers}
            </p>
            <p className="mt-1 text-xs text-text-grey">
              <span className="font-semibold text-emerald-700">{stats.activeMembers} active</span> ·{" "}
              <span className="font-semibold text-amber-700">{stats.pendingMembers} pending review</span>
            </p>
          </Link>

          {/* Orders */}
          <Link
            href="/admin/orders"
            className="group rounded-2xl border border-primary-gold/25 bg-white p-5 shadow-xs hover:border-primary-gold hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-grey">
                Uniform Orders
              </span>
              <div className="rounded-full bg-cream p-2 text-primary-green group-hover:bg-primary-gold group-hover:text-white transition-colors">
                <UiIcons name="cart" />
              </div>
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-card-heading">
              {stats.totalOrders}
            </p>
            <p className="mt-1 text-xs text-text-grey">
              <span className="font-semibold text-amber-700">{stats.pendingOrders} awaiting fulfillment</span>
            </p>
          </Link>

          {/* Submissions */}
          <Link
            href="/admin/submissions"
            className="group rounded-2xl border border-primary-gold/25 bg-white p-5 shadow-xs hover:border-primary-gold hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-grey">
                Submissions
              </span>
              <div className="rounded-full bg-cream p-2 text-primary-green group-hover:bg-primary-gold group-hover:text-white transition-colors">
                <UiIcons name="mail" />
              </div>
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-card-heading">
              {stats.totalSubmissions}
            </p>
            <p className="mt-1 text-xs text-text-grey">
              <span className="font-semibold text-blue-700">{stats.newSubmissions} unread / new</span>
            </p>
          </Link>

          {/* Payments */}
          <Link
            href="/admin/payments"
            className="group rounded-2xl border border-primary-gold/25 bg-white p-5 shadow-xs hover:border-primary-gold hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-text-grey">
                Payments
              </span>
              <div className="rounded-full bg-cream p-2 text-primary-green group-hover:bg-primary-gold group-hover:text-white transition-colors">
                <UiIcons name="creditCard" />
              </div>
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-card-heading">
              {stats.totalPayments}
            </p>
            <p className="mt-1 text-xs text-text-grey">
              <span className="font-semibold text-amber-700">{stats.pendingPayments} proofs to verify</span>
            </p>
          </Link>
        </div>

        {/* 9 Main Operational Hubs */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary-green">
                Management Modules
              </h2>
              <p className="text-xs text-text-grey mt-0.5">
                Centralized administration for all platform operations
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HUBS.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-xs hover:border-primary-gold hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary-gold/15 px-2.5 py-0.5 text-[11px] font-bold text-primary-gold uppercase">
                      {hub.badge}
                    </span>
                    <div className="text-primary-green group-hover:text-primary-gold transition-colors">
                      <UiIcons name={hub.icon} />
                    </div>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-card-heading group-hover:text-primary-green transition-colors">
                    {hub.title}
                  </h3>
                  <CardDescSm className="mt-2 line-clamp-3 text-xs leading-relaxed text-text-dark">
                    {hub.description}
                  </CardDescSm>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-3 text-xs font-semibold text-primary-green group-hover:text-primary-gold">
                  <span>Open {hub.badge}</span>
                  <span className="transform transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Platform Activity Stream */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <h3 className="font-heading text-lg font-bold text-primary-green">
                Recent Uniform Orders
              </h3>
              <Link href="/admin/orders" className="text-xs font-semibold text-primary-gold hover:underline">
                View All →
              </Link>
            </div>
            <div className="mt-4 divide-y divide-black/5">
              {activity.recentOrders.length === 0 ? (
                <p className="py-4 text-center text-xs text-text-grey">No recent orders.</p>
              ) : (
                activity.recentOrders.map((ord) => (
                  <div key={ord.id} className="flex items-center justify-between py-3 text-xs">
                    <div>
                      <p className="font-semibold text-card-heading">{ord.reference}</p>
                      <p className="text-text-grey">
                        {ord.uniform_type} ({ord.size}) × {ord.quantity} · {ord.delivery_city}
                      </p>
                    </div>
                    <span className="rounded-full bg-cream px-2 py-0.5 font-semibold text-primary-green uppercase text-[10px]">
                      {ord.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Form Submissions */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <h3 className="font-heading text-lg font-bold text-primary-green">
                Recent Inquiries & Submissions
              </h3>
              <Link href="/admin/submissions" className="text-xs font-semibold text-primary-gold hover:underline">
                View All →
              </Link>
            </div>
            <div className="mt-4 divide-y divide-black/5">
              {activity.recentSubmissions.length === 0 ? (
                <p className="py-4 text-center text-xs text-text-grey">No recent submissions.</p>
              ) : (
                activity.recentSubmissions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between py-3 text-xs">
                    <div>
                      <p className="font-semibold text-card-heading">{sub.name}</p>
                      <p className="text-text-grey">{sub.type} · {sub.email}</p>
                    </div>
                    <span className="rounded-full bg-cream px-2 py-0.5 font-semibold text-primary-green uppercase text-[10px]">
                      {sub.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
