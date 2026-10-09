import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import OrderStatusControl from "@/components/pages/admin-page/OrderStatusControl";
import MainHeading from "@/components/pages/typography/MainHeading";
import { countryName } from "@/constant/countries";
import { getAdminUser } from "@/lib/auth";
import { getMemberDetail } from "@/lib/members-admin";

export const metadata: Metadata = {
  title: "Member details | ShininChrist Admin",
  robots: { index: false },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const date = (value: Date | null, withTime = false) =>
  value
    ? new Intl.DateTimeFormat(
        "en-US",
        withTime
          ? { dateStyle: "medium", timeStyle: "short" }
          : { dateStyle: "medium" },
      ).format(value)
    : "—";
const money = (value: number | null, currency: string) =>
  value === null
    ? "—"
    : new Intl.NumberFormat("en", { style: "currency", currency }).format(
        value,
      );
const words = (value: string | null) =>
  value ? value.replaceAll("_", " ") : "—";

const Panel = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-xl border border-primary-green/10 bg-white-color p-5">
    <h2 className="font-heading text-lg font-semibold text-primary-green">
      {title}
    </h2>
    <div className="mt-3">{children}</div>
  </section>
);

const Rows = ({ rows }: { rows: [string, React.ReactNode][] }) => (
  <dl className="grid gap-2 text-sm">
    {rows.map(([label, value]) => (
      <div key={label} className="grid grid-cols-[150px_1fr] gap-3">
        <dt className="text-text-grey">{label}</dt>
        <dd className="break-words text-text-dark">{value}</dd>
      </div>
    ))}
  </dl>
);

const FileLink = ({ url }: { url: string | null }) =>
  url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary-gold underline"
    >
      View file
    </a>
  ) : (
    <span className="text-text-grey">no file</span>
  );

const MemberDetailPage = async ({
  params,
}: PageProps<"/admin/members/[userId]">) => {
  const admin = await getAdminUser();
  if (!admin) notFound();

  const { userId } = await params;
  if (!UUID.test(userId)) notFound();
  const m = await getMemberDetail(userId);
  if (!m) notFound();

  const { profile, membership } = m;

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <div className="wrapper">
        <MainHeading
          as="h1"
          className="!text-primary-green !text-3xl lg:!text-[40px] lg:!leading-tight"
        >
          {profile.fullName ?? m.email}
        </MainHeading>
        <div className="mt-2">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/admin/members" },
              { label: "Members", href: "/admin/members" },
              {
                label: profile.fullName ?? m.email,
                href: `/admin/members/${userId}`,
              },
            ]}
          />
        </div>
        <Link
          href="/admin/members"
          className="mt-3 inline-block text-sm font-semibold text-primary-gold hover:underline"
        >
          ← Back to all members (verify and activate)
        </Link>

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
          <Panel title="Personal details">
            <Rows
              rows={[
                ["Full name", profile.fullName ?? "—"],
                ["Email", m.email],
                [
                  "Date of birth",
                  profile.dob
                    ? `${date(profile.dob)} (age ${profile.age})`
                    : "—",
                ],
                ["Gender", profile.gender ?? "—"],
                [
                  "Country",
                  profile.countryCode
                    ? `${countryName(profile.countryCode)} (${profile.countryCode})`
                    : "—",
                ],
                ["State / region", profile.state ?? "—"],
                ["WhatsApp", profile.whatsapp ?? "—"],
                ["Area of interest", profile.interest ?? "—"],
                ["Signed up", date(m.signedUpAt, true)],
              ]}
            />
          </Panel>

          <Panel title="Membership">
            <Rows
              rows={[
                ["Status", <strong key="s">{words(membership.status)}</strong>],
                ["Member ID", membership.memberId ?? "Not issued yet"],
                ["Chapter", membership.chapter ?? "—"],
                ["Roles", m.roles.map(words).join(", ") || "—"],
                ["Under 18", membership.isMinor ? "Yes" : "No"],
                [
                  "Social proof",
                  <span key="p">
                    {words(membership.proofStatus)}
                    {membership.platform
                      ? ` (${membership.platform})`
                      : ""} · <FileLink url={membership.proofUrl} />
                  </span>,
                ],
                [
                  "Parental consent",
                  membership.isMinor ? (
                    <span key="c">
                      {words(membership.consentStatus)} ·{" "}
                      <FileLink url={membership.consentUrl} />
                    </span>
                  ) : (
                    "Not needed"
                  ),
                ],
                [
                  "Activated",
                  membership.activatedAt
                    ? `${date(membership.activatedAt, true)} by ${membership.approvedBy ?? "an admin"}`
                    : "—",
                ],
                [
                  "Active sessions",
                  `${m.sessions.count}${m.sessions.lastActive ? `, last active ${date(m.sessions.lastActive, true)}` : ""}`,
                ],
              ]}
            />
            <p className="mt-3 text-xs text-text-grey">
              File links are private and expire after 10 minutes.
            </p>
          </Panel>

          <Panel title={`Uniform orders (${m.orders.length})`}>
            {m.orders.length === 0 ? (
              <p className="text-sm text-text-grey">No uniform order yet.</p>
            ) : (
              <ul className="grid gap-4">
                {m.orders.map((order) => (
                  <li
                    key={order.id}
                    className="rounded-lg border border-primary-green/10 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-card-heading">
                        {order.reference} · {words(order.status)}
                      </p>
                      <OrderStatusControl
                        orderId={order.id}
                        status={order.status}
                      />
                    </div>
                    <div className="mt-2">
                      <Rows
                        rows={[
                          ["Item", order.item],
                          ["Uniform", money(order.uniformCost, order.currency)],
                          [
                            "Delivery fee",
                            money(order.deliveryCost, order.currency),
                          ],
                          [
                            "Total",
                            <strong key="t">
                              {money(order.total, order.currency)}
                            </strong>,
                          ],
                          ["Deliver to", order.address],
                          ["Phone", order.phone],
                          ["Ordered", date(order.createdAt, true)],
                        ]}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title={`Payments (${m.payments.length})`}>
            {m.payments.length === 0 ? (
              <p className="text-sm text-text-grey">No payments yet.</p>
            ) : (
              <ul className="grid gap-3">
                {m.payments.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-lg border border-primary-green/10 p-3 text-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-card-heading">
                        {money(p.amount, p.currency)} · {p.purpose}
                      </span>
                      <span
                        className={
                          p.status === "confirmed"
                            ? "rounded-full bg-primary-green/15 px-2 py-0.5 text-xs font-semibold text-primary-green"
                            : "rounded-full bg-primary-gold/15 px-2 py-0.5 text-xs font-semibold text-primary-gold"
                        }
                      >
                        {words(p.status)}
                      </span>
                    </div>
                    <p className="mt-1 break-all text-xs text-text-grey">
                      {p.gateway} · {p.reference}
                      {p.verifiedAt &&
                        ` · verified ${date(p.verifiedAt, true)}`}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <div className="mt-5">
          <Panel title="Activity log">
            {m.activity.length === 0 ? (
              <p className="text-sm text-text-grey">
                No admin or payment actions recorded yet.
              </p>
            ) : (
              <ul className="divide-y divide-primary-green/10">
                {m.activity.map((entry, index) => (
                  <li
                    key={index}
                    className="flex flex-wrap justify-between gap-2 py-2 text-sm"
                  >
                    <span className="text-text-dark">
                      {words(entry.action.replace(".", " "))}{" "}
                      <span className="text-text-grey">· by {entry.actor}</span>
                    </span>
                    <span className="text-xs text-text-grey">
                      {date(entry.at, true)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </main>
  );
};

export default MemberDetailPage;
