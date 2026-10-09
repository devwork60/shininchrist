import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today’s Faith Formation | ShininChrist Daily",
  description:
    "Follow today’s six steps: Worship, The Word, Explore the Word, Live the Word, Prayer, and Go & Shine.",
};

export default function TodayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
