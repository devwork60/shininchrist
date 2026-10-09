import dynamic from "next/dynamic";
import JoinHero from "@/components/pages/join-page/JoinHero";
import JoinStepsGlance from "@/components/pages/join-page/JoinStepsGlance";

const JoinWizard = dynamic(
  () => import("@/components/pages/join-page/JoinWizard"),
);
const JoinClosingBands = dynamic(
  () => import("@/components/pages/join-page/JoinClosingBands"),
);

const JoinPage = () => (
  <main className="flex-1">
    <JoinHero />
    <JoinStepsGlance />
    <div className="wrapper-narrow pb-10 lg:pb-14">
      <JoinWizard />
    </div>
    <JoinClosingBands />
  </main>
);

export default JoinPage;
