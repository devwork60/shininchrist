import dynamic from "next/dynamic";
import FounderHero from "@/components/pages/founder-page/FounderHero";
import FounderProfile from "@/components/pages/founder-page/FounderProfile";

const FounderPillars = dynamic(
  () => import("@/components/pages/founder-page/FounderPillars"),
);
const FounderVideo = dynamic(
  () => import("@/components/pages/founder-page/FounderVideo"),
);
const OurImpactBand = dynamic(
  () => import("@/components/pages/founder-page/OurImpactBand"),
);

const FounderPage = () => (
  <main className="flex-1">
    <FounderHero />
    <FounderProfile />
    <FounderPillars />
    <FounderVideo />
    <OurImpactBand />
  </main>
);

export default FounderPage;
