import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive | ShininChrist Daily",
  description:
    "Explore previous Daily Faith Formation entries. For active ShininChrist members.",
  robots: { index: false },
};

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
