import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import ResourceManager from "@/components/pages/admin-page/library/ResourceManager";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getAdminUser } from "@/lib/auth";
import { listAdminResources } from "@/lib/library-admin";

export const metadata: Metadata = {
  title: "Library resources | ShininChrist Admin",
  robots: { index: false },
};

const AdminLibraryPage = async () => {
  // The proxy only checks "signed in". The admin role is checked here, on the server.
  const admin = await getAdminUser();
  if (!admin) notFound();

  const resources = await listAdminResources();

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Library resources
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Library", href: "/admin/library" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Add the files members can download. Mark each one <strong>Free</strong>{" "}
          or <strong>Give what you can</strong> (members choose any amount,
          including 0). A resource appears in the member Library only when it is
          published and has a file. Files are private and are never public links.
        </CardDescSm>
        <div className="mt-6">
          <ResourceManager resources={resources} />
        </div>
      </div>
    </main>
  );
};

export default AdminLibraryPage;
