import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session Control | ShininChrist Admin",
  robots: { index: false },
};

export default function AdminSessionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
