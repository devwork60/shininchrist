import dynamic from "next/dynamic";
import ChaptersHero from "@/components/pages/chapters-page/ChaptersHero";

// Below the fold — loaded as a separate chunk
const ChaptersAboutSection = dynamic(
  () => import("@/components/pages/chapters-page/about/ChaptersAboutSection"),
);

const ExperienceSection = dynamic(
  () => import("@/components/pages/chapters-page/experience/ExperienceSection"),
);

const ChaptersCtaSection = dynamic(
  () => import("@/components/pages/chapters-page/cta/ChaptersCtaSection"),
);

const ChaptersPage = () => (
  <main className="flex-1">
    <ChaptersHero />
    <ChaptersAboutSection />
    <ExperienceSection />
    <ChaptersCtaSection />
  </main>
);

export default ChaptersPage;
