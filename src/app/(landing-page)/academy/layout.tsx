import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy | ShininChrist",
  description:
    "ShininChrist Academy provides Christ-centered education for all ages, equipping learners with knowledge, skills and character.",
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
