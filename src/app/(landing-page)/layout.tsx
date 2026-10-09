import type { Metadata } from "next";
import Footer from "@/components/pages/footer/Footer";

export const metadata: Metadata = {
  title: "ShininChrist",
  description:
    "A global ministry, community and compassionate nonprofit organization, advancing the gospel of Jesus Christ through spiritual, educational and cultural literacy.",
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
