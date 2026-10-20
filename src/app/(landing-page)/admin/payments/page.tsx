import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import PaymentReviewList from "@/components/pages/admin-page/PaymentReviewList";
import PaymentsLedger from "@/components/pages/admin-page/PaymentsLedger";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getAdminUser } from "@/lib/auth";
import { listLedger } from "@/lib/payments/ledger";
import { listManualPayments } from "@/lib/payments/manual-review";

export const metadata: Metadata = {
  title: "Payments | ShininChrist Admin",
  robots: { index: false },
};

const AdminPaymentsPage = async () => {
  // The proxy only checks "signed in". The admin role is checked here, on the server.
  const admin = await getAdminUser();
  if (!admin) notFound();

  const [rows, ledger] = await Promise.all([listManualPayments(), listLedger()]);

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Payment verification
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Payments", href: "/admin/payments" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Check each bank-transfer receipt against your bank, then approve or
          reject it. Approving marks the uniform order as paid. Receipt links
          expire after 10 minutes. Card payments, donations and Library contributions are confirmed
          automatically by Paystack and listed in the table below.
        </CardDescSm>
        <div className="mt-6">
          <PaymentReviewList rows={rows} />
        </div>
        <div className="mt-10">
          <PaymentsLedger rows={ledger} />
        </div>
      </div>
    </main>
  );
};

export default AdminPaymentsPage;
