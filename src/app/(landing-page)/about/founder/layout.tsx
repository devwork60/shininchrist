import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/about/founder" },
  title: "About Our Founder | ShininChrist",
  description:
    "Meet Georgia “Mercy” Morris: missionary, evangelist, author, educator, U.S. Army veteran and Founder of ShininChrist.",
};

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
