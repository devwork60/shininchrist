import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assessments | ShininChrist Academy",
  description:
    "Examination preparation for WAEC, NECO, UTME/JAMB, GCE, CXC/CSEC and CAPE. Be prepared. Be confident. Go further.",
};

export default function AssessmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
