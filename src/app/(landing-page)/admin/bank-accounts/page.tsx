import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import BankAccountForm from "@/components/pages/admin-page/BankAccountForm";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getAdminUser } from "@/lib/auth";
import { listBankAccounts } from "@/lib/payments/bank-accounts";

export const metadata: Metadata = {
  title: "Bank accounts | ShininChrist Admin",
  robots: { index: false },
};

const AdminBankAccountsPage = async () => {
  const admin = await getAdminUser();
  if (!admin) notFound();

  const accounts = await listBankAccounts();

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Bank accounts
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Bank accounts", href: "/admin/bank-accounts" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          These are the account details people see when they choose bank
          transfer. Customers see the account that matches the currency of
          their uniform price. Bank transfer stays unavailable for a currency
          until you save an account for it.
        </CardDescSm>
        <div className="mt-6">
          <BankAccountForm accounts={accounts} />
        </div>
      </div>
    </main>
  );
};

export default AdminBankAccountsPage;
