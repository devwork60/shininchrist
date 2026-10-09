import type { Metadata } from "next";

export const metadata: Metadata = {
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
