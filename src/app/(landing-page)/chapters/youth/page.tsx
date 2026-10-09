import dynamic from "next/dynamic";
import AudienceHero from "@/components/pages/chapter-audience/AudienceHero";
import {
  YOUTH_DAILY,
  YOUTH_FOCUS,
  YOUTH_HERO,
} from "@/constant/youthChapterData";

// Below the fold — loaded as a separate chunk per architecture rules in SKILL.md
const FocusSection = dynamic(
  () => import("@/components/pages/chapter-audience/FocusSection"),
);

const DailyConnectSection = dynamic(
  () => import("@/components/pages/chapter-audience/DailyConnectSection"),
);

const YouthChapterPage = () => (
  <main className="flex-1">
    <AudienceHero {...YOUTH_HERO} />
    <FocusSection {...YOUTH_FOCUS} />
    <DailyConnectSection {...YOUTH_DAILY} />
  </main>
);

export default YouthChapterPage;
