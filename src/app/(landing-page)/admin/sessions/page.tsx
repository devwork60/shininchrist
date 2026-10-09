import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import AdminSessionsTable from "@/components/pages/admin-page/AdminSessionsTable";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getAdminUser } from "@/lib/auth";
import { listUserSessions } from "@/lib/sessions";

const AdminSessionsPage = async () => {
  // The proxy only checks "signed in". The admin role is checked here, on the server.
  const admin = await getAdminUser();
  if (!admin) notFound();

  const format = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const rows = (await listUserSessions()).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    roles: row.roles,
    sessions: row.sessions,
    lastActive: row.lastActive ? format.format(row.lastActive) : "Never",
  }));

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          Session Control
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/sessions" },
              { label: "Sessions", href: "/admin/sessions" },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 max-w-2xl !text-base !text-text-dark">
          See who is signed in and end every session for a user if their account
          may be at risk.
        </CardDescSm>
        <div className="mt-6">
          <AdminSessionsTable initialRows={rows} />
        </div>
      </div>
    </main>
  );
};

export default AdminSessionsPage;
