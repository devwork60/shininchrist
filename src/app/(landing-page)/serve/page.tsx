import dynamic from "next/dynamic";
import ServeHero from "@/components/pages/serve-page/ServeHero";
import ServePillarsStrip from "@/components/pages/serve-page/ServePillarsStrip";

const ServeTodaySection = dynamic(
  () => import("@/components/pages/serve-page/ServeTodaySection"),
);
const WaysSection = dynamic(
  () => import("@/components/pages/serve-page/WaysSection"),
);
const ServeCtaBanner = dynamic(
  () => import("@/components/pages/serve-page/ServeCtaBanner"),
);

const ServePage = () => (
  <main className="flex-1">
    <ServeHero />
    <ServePillarsStrip />
    <ServeTodaySection />
    <WaysSection />
    <ServeCtaBanner />
  </main>
);

export default ServePage;
