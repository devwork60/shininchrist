import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import DailyEntriesForm from "@/components/pages/admin-page/content/DailyEntriesForm";
import DailyTodayForm from "@/components/pages/admin-page/content/DailyTodayForm";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getAdminUser } from "@/lib/auth";
import { getDailyEntries, getDailyToday } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Daily content | ShininChrist Admin",
  robots: { index: false },
};

const AdminDailyPage = async () => {
  // The proxy only checks "signed in". The admin role is checked here, on the server.
  const admin = await getAdminUser();
  if (!admin) notFound();

  const [today, { entries }] = await Promise.all([getDailyToday(), getDailyEntries()]);

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Daily content
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Daily", href: "/admin/daily" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          Change what appears on ShininChrist Daily: the activities and their order, the
          watch and listen buttons, and the dated devotionals, reflections and assignments
          members read. Changes appear on the public site as soon as you save.
        </CardDescSm>
        <div className="mt-6 grid gap-6">
          <DailyTodayForm initial={today} />
          <DailyEntriesForm initial={entries} />
        </div>
      </div>
    </main>
  );
};

export default AdminDailyPage;
