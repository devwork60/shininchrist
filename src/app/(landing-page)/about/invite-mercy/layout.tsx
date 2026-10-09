import type { Metadata } from "next";

export const metadata: Metadata = {
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
