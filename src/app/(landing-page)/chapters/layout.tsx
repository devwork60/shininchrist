import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chapters | ShininChrist",
  description:
    "ShininChrist Chapters are places where people connect, encourage one another, grow in faith, develop life skills, serve their communities, and enjoy meaningful experiences together.",
};

export default function ChaptersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
