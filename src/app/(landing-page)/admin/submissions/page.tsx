import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import SubmissionsList from "@/components/pages/admin-page/SubmissionsList";
import { getAdminUser } from "@/lib/auth";
import { listSubmissions } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Form Submissions | ShininChrist Admin",
  robots: { index: false },
};

export default async function AdminSubmissionsPage() {
  const admin = await getAdminUser().catch(() => null);
  if (!admin) notFound();

  const rows = await listSubmissions();

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Form Submissions & Inquiries
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Submissions", href: "/admin/submissions" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Review incoming forms from across the website, including Invite Mercy speaking requests,
          Volunteer and Skills applications, Prayer commitments, Field Mission registrations,
          Partnership inquiries, and In-Kind or Property donation proposals.
        </CardDescSm>

        <div className="mt-8">
          <SubmissionsList initialRows={rows} />
        </div>
      </div>
    </main>
  );
}
