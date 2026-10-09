import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | ShininChrist Academy",
  description:
    "Explore, learn, grow and make an impact. Browse ShininChrist Academy courses by field of learning.",
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
