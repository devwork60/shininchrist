import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/chapters/men" },
  title: "Men’s Chapter | ShininChrist",
  description:
    "Faith. Brotherhood. Responsibility. Purpose. Join the ShininChrist Men’s Chapter.",
};

export default function MenChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
