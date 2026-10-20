import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/academy/learner-support" },
  title: "Learner Support | ShininChrist Academy",
  description:
    "Guidance. Resources. Encouragement. Always. Academic support, mentorship, study resources and more for ShininChrist Academy learners.",
};

export default function LearnerSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
