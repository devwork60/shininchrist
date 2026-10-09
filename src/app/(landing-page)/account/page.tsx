import { redirect } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import AccountProfileCard from "@/components/pages/account-page/AccountProfileCard";
import MembershipStatusCard from "@/components/pages/account-page/MembershipStatusCard";
import SecurityCard from "@/components/pages/account-page/SecurityCard";
import UniformOrderCard from "@/components/pages/account-page/UniformOrderCard";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getUserSessions } from "@/lib/sessions";

/** How many of the 7 steps in MEMBERSHIP_STEPS each status has reached. */
const STEPS_DONE: Record<string, number> = {
  started: 1,
  form_completed: 2,
  subscription_pending: 2,
  subscription_verified: 3,
  consent_pending: 3,
  consent_verified: 4,
  uniform_payment_pending: 4,
  payment_confirmed: 5,
  approved: 6,
  active: 7,
  suspended: 0,
};

const LABELS: Record<string, string> = {
  started: "Registration started",
  form_completed: "Form completed",
  subscription_pending: "Subscription proof pending",
  subscription_verified: "Subscription verified",
  consent_pending: "Parental consent pending",
  consent_verified: "Parental consent verified",
  uniform_payment_pending: "Awaiting uniform payment",
  payment_confirmed: "Payment confirmed",
  approved: "Approved",
  active: "Active member",
  suspended: "Suspended",
};

const AccountPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const [profile, membership, sessions] = await Promise.all([
    prisma.profiles.findUnique({ where: { id: user.id } }),
    prisma.memberships.findUnique({ where: { user_id: user.id } }),
    getUserSessions(user.id),
  ]);

  const status = membership?.status ?? "started";
  const format = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const chapter = membership?.chapter
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
            name={profile?.full_name ?? user.name}
            email={user.email}
            memberId={membership?.member_id ?? null}
            country={profile?.country_code ?? null}
            chapter={chapter}
          />
          <div className="grid gap-6">
            <MembershipStatusCard
              status={LABELS[status] ?? status}
              completed={STEPS_DONE[status] ?? 1}
            />
            {/* Sample until the uniform order backend exists. */}
            <UniformOrderCard />
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
