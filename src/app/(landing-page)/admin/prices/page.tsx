import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import PriceTable from "@/components/pages/admin-page/PriceTable";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { COUNTRIES } from "@/constant/countries";
import { getAdminUser } from "@/lib/auth";
import { listUniformPrices } from "@/lib/members-admin";

export const metadata: Metadata = {
  title: "Uniform prices | ShininChrist Admin",
  robots: { index: false },
};

const AdminPricesPage = async () => {
  // The proxy only checks "signed in". The admin role is checked here, on the server.
  const admin = await getAdminUser();
  if (!admin) notFound();

  const saved = await listUniformPrices();
  const rows = Object.entries(COUNTRIES).map(([name, code]) => ({
    name,
    code,
    price: saved.find((price) => price.countryCode === code) ?? null,
  }));

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Uniform prices
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Uniform prices", href: "/admin/prices" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Set the uniform price and delivery fee for each country. Applicants
          see the price for their own country when they pay, and the server
          always uses the price saved here. A country with no price cannot pay
          online yet. Paystack can charge in NGN or USD.
        </CardDescSm>
        <div className="mt-6">
          <PriceTable rows={rows} />
        </div>
      </div>
    </main>
  );
};

export default AdminPricesPage;
