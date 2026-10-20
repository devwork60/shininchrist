import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import FooterContentForm from "@/components/pages/admin-page/content/FooterContentForm";
import HeaderContentForm from "@/components/pages/admin-page/content/HeaderContentForm";
import InviteContentForm from "@/components/pages/admin-page/content/InviteContentForm";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getAdminUser } from "@/lib/auth";
import { getEditorContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Site content | ShininChrist Admin",
  robots: { index: false },
};

const AdminContentPage = async () => {
  // The proxy only checks "signed in". The admin role is checked here, on the server.
  const admin = await getAdminUser();
  if (!admin) notFound();

  const content = await getEditorContent();

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Site content
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Site content", href: "/admin/content" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Edit the Invite Mercy page, the footer and the header menu. Changes
          appear on the public site as soon as you save. Links must be a page on
          this site (/page), a web address (https://…), mailto: or tel:.
        </CardDescSm>
        <div className="mt-6 grid gap-6">
          <InviteContentForm initial={content.invite_mercy} />
          <FooterContentForm initial={content.footer} />
          <HeaderContentForm initial={content.header} />
        </div>
      </div>
    </main>
  );
};

export default AdminContentPage;
