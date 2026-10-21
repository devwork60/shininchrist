import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import AllOrdersTable from "@/components/pages/admin-page/AllOrdersTable";
import { getAdminUser } from "@/lib/auth";
import { listAllUniformOrders } from "@/lib/members-admin";

export const metadata: Metadata = {
  title: "Uniform Orders | ShininChrist Admin",
  robots: { index: false },
};

export default async function AdminOrdersPage() {
  const admin = await getAdminUser().catch(() => null);
  if (!admin) notFound();

  const orders = await listAllUniformOrders();

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Uniform Orders Ledger
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Uniform Orders", href: "/admin/orders" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Track and fulfill all membership uniform requests across all members.
          Move paid orders through packing, shipping, and delivery fulfillment stages.
        </CardDescSm>

        <div className="mt-8">
          <AllOrdersTable initialOrders={orders} />
        </div>
      </div>
    </main>
  );
}
