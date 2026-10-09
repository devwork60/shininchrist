import { redirect } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import AccountProfileCard from "@/components/pages/account-page/AccountProfileCard";
import MembershipStatusCard from "@/components/pages/account-page/MembershipStatusCard";
import SecurityCard from "@/components/pages/account-page/SecurityCard";
import UniformOrderCard from "@/components/pages/account-page/UniformOrderCard";
import MainHeading from "@/components/pages/typography/MainHeading";
import {
  STATUS_LABELS,
  buildChecklist,
  getOrderView,
} from "@/lib/account-view";
import { getCurrentUser } from "@/lib/auth";
import { getJoinStatus } from "@/lib/join";
import { getUserSessions } from "@/lib/sessions";

const AccountPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const [status, order, sessions] = await Promise.all([
    getJoinStatus(user.id, user.email),
    getOrderView(user.id),
    getUserSessions(user.id),
  ]);

  const { membership, profile } = status;
  const format = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const chapter = membership.chapter
    ? membership.chapter[0].toUpperCase() + membership.chapter.slice(1)
    : null;

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading as="h1" className="!text-primary-green lg:!leading-tight">
          My Account
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "My Account", href: "/account" },
            ]}
          />
        </div>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          <AccountProfileCard
            name={profile.fullName ?? user.name}
            email={user.email}
            memberId={membership.memberId}
            country={profile.country}
            chapter={chapter}
          />
          <div className="grid gap-6">
            <MembershipStatusCard
              status={STATUS_LABELS[membership.status] ?? membership.status}
              active={membership.status === "active"}
              items={buildChecklist(status)}
            />
            <UniformOrderCard order={order} />
            <SecurityCard
              sessions={sessions.map((session) => ({
                id: session.id,
                device: session.userAgent,
                ip: session.ip,
                lastActive: session.lastActive
                  ? format.format(session.lastActive)
                  : "",
              }))}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
