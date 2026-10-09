import dynamic from "next/dynamic";
import AudienceHero from "@/components/pages/chapter-audience/AudienceHero";
import { MEN_DAILY, MEN_FOCUS, MEN_HERO } from "@/constant/menChapterData";

// Below the fold — loaded as a separate chunk
const FocusSection = dynamic(
  () => import("@/components/pages/chapter-audience/FocusSection"),
);

const DailyConnectSection = dynamic(
  () => import("@/components/pages/chapter-audience/DailyConnectSection"),
);

const MenChapterPage = () => (
  <main className="flex-1">
    <AudienceHero {...MEN_HERO} />
    <FocusSection {...MEN_FOCUS} />
    <DailyConnectSection {...MEN_DAILY} />
  </main>
);

export default MenChapterPage;
