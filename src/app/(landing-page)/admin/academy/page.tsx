import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import AcademyCoursesForm from "@/components/pages/admin-page/content/AcademyCoursesForm";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getAdminUser } from "@/lib/auth";
import { getAcademyCourses } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Academy courses | ShininChrist Admin",
  robots: { index: false },
};

const AdminAcademyPage = async () => {
  // The proxy only checks "signed in". The admin role is checked here, on the server.
  const admin = await getAdminUser();
  if (!admin) notFound();

  const courses = await getAcademyCourses();

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Academy courses
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Academy", href: "/admin/academy" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Create and edit Academy courses, and add or update each course’s lessons, learning
          resources and assignments. Changes appear on the public site as soon as you save.
        </CardDescSm>
        <p className="mt-3 text-sm text-text-dark">
          Students send their assignments to you here:{" "}
          <Link href="/admin/submissions" className="font-semibold text-primary-green underline">
            open Form Submissions
          </Link>{" "}
          and filter by “Academy Assignment”. Set a status and add notes when you have reviewed one.
        </p>
        <div className="mt-6">
          <AcademyCoursesForm initial={courses} />
        </div>
      </div>
    </main>
  );
};

export default AdminAcademyPage;
