import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily | ShininChrist",
  description:
    "A daily multimedia experience with Scripture, worship, practical teaching and prayer — for everyone, everywhere.",
};

export default function DailyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
