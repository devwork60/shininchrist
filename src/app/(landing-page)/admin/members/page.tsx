import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import MembersTable from "@/components/pages/admin-page/MembersTable";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getAdminUser } from "@/lib/auth";
import { listApplicants } from "@/lib/members-admin";

export const metadata: Metadata = {
  title: "Members | ShininChrist Admin",
  robots: { index: false },
};

const AdminMembersPage = async () => {
  // The proxy only checks "signed in". The admin role is checked here, on the server.
  const admin = await getAdminUser();
  if (!admin) notFound();

  const applicants = await listApplicants();

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Members
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Members", href: "/admin/members" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Check each applicant&apos;s proof, parental consent and uniform
          payment, then activate them. File links expire after 10 minutes.
        </CardDescSm>
        <div className="mt-6">
          <MembersTable applicants={applicants} />
        </div>
      </div>
    </main>
  );
};

export default AdminMembersPage;
