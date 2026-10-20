import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/chapters/women" },
  title: "Women’s Chapter | ShininChrist",
  description:
    "Faith. Sisterhood. Growth. Influence. Join the ShininChrist Women’s Chapter.",
};

export default function WomenChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
