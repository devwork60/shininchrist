import dynamic from "next/dynamic";
import HeroSection from "@/components/pages/landing-page/HeroSection";

// Below the fold — loaded as separate chunks
const VisionMissionSection = dynamic(
  () =>
    import("@/components/pages/landing-page/vision-mission/VisionMissionSection"),
);
const FrameworkSection = dynamic(
  () => import("@/components/pages/landing-page/framework/FrameworkSection"),
);
const StatementOfFaithSection = dynamic(
  () =>
    import("@/components/pages/landing-page/statement-of-faith/StatementOfFaithSection"),
);
const FounderFaithSection = dynamic(
  () =>
    import("@/components/pages/landing-page/founder-faith/FounderFaithSection"),
);
const PathwaySection = dynamic(
  () => import("@/components/pages/landing-page/pathways/PathwaySection"),
);

const Home = () => (
  <main className="flex-1">
    <HeroSection />
    <VisionMissionSection />
    <FrameworkSection />
    <StatementOfFaithSection />
    <FounderFaithSection />
    <PathwaySection />
  </main>
);

export default Home;
