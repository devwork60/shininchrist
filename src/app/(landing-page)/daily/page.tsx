import dynamic from "next/dynamic";
import DailyHero from "@/components/pages/daily-page/DailyHero";

const FrameworkStrip = dynamic(
  () => import("@/components/pages/daily-page/FrameworkStrip"),
);

const FormationSection = dynamic(
  () => import("@/components/pages/daily-page/formation/FormationSection"),
);

const DailyBannerSection = dynamic(
  () => import("@/components/pages/daily-page/banner/DailyBannerSection"),
);

// Re-render hourly so the date and verse stay current
export const revalidate = 3600;

const DailyPage = () => (
  <main className="flex-1">
    <DailyHero />
    <FrameworkStrip />
    <FormationSection />
    <DailyBannerSection />
  </main>
);

export default DailyPage;
