import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/academy/teachers" },
  title: "Teachers | ShininChrist Academy",
  description:
    "Learn from dedicated educators who are committed to your success. Experienced. Passionate. Committed to your growth.",
};

export default function TeachersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
