import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/about/invite-mercy" },
  title: "Invite Mercy to Speak | ShininChrist",
  description:
    "Submit an invitation for Georgia “Mercy” Morris to speak at your church, conference, retreat, outreach, educational or media event.",
};

export default function InviteMercyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
