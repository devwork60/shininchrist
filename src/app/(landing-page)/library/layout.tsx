import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library | ShininChrist",
  description:
    "Explore a rich collection of Christ-centered resources to help you grow in purpose, deepen your faith, make wise choices, find hope, and live well every day.",
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
