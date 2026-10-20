import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/serve" },
  title: "Serve | ShininChrist Ministry",
  description:
    "Use your gifts, time, talents, and compassion to serve with ShininChrist. Discover volunteer teaching, creative media, chapter leadership, digital support, and ministry opportunities.",
};

export default function ServeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
