import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/chapters/youth" },
  title: "Youth Chapter | ShininChrist",
  description:
    "Faith. Identity. Friendship. Future. Join the ShininChrist Youth Chapter.",
};

export default function YouthChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
