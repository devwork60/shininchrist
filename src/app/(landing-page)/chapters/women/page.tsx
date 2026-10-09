import dynamic from "next/dynamic";
import AudienceHero from "@/components/pages/chapter-audience/AudienceHero";
import {
  WOMEN_DAILY,
  WOMEN_FOCUS,
  WOMEN_HERO,
} from "@/constant/womenChapterData";

// Below the fold — loaded as a separate chunk
const FocusSection = dynamic(
  () => import("@/components/pages/chapter-audience/FocusSection"),
);

const DailyConnectSection = dynamic(
  () => import("@/components/pages/chapter-audience/DailyConnectSection"),
);

const WomenChapterPage = () => (
  <main className="flex-1">
    <AudienceHero {...WOMEN_HERO} />
    <FocusSection {...WOMEN_FOCUS} />
    <DailyConnectSection {...WOMEN_DAILY} />
  </main>
);

export default WomenChapterPage;
