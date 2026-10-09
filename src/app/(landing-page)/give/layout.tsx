import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give | ShininChrist Ministry",
  description:
    "Sow today and change lives tomorrow. Partner with ShininChrist through financial gifts, in-kind donations, property, and major assets to support gospel advancement, education, and community outreach.",
};

export default function GiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
