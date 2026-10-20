import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/store" },
  title: "Store | ShininChrist",
  description:
    "Books, music, merchandise and resources. Shop with purpose at the ShininChrist Store.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
