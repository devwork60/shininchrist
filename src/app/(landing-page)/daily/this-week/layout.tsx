import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This Week | ShininChrist Daily",
  description:
    "Catch up or revisit this week’s Daily Faith Formation entries. For active ShininChrist members.",
  robots: { index: false },
};

export default function ThisWeekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
