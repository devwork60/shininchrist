import dynamic from "next/dynamic";
import GiveHero from "@/components/pages/give-page/GiveHero";
import GiveStripSection from "@/components/pages/give-page/GiveStripSection";

// Below-the-fold dynamic imports
const WaysToGiveSection = dynamic(
  () => import("@/components/pages/give-page/WaysToGiveSection"),
);

const PaymentOptionsSection = dynamic(
  () => import("@/components/pages/give-page/PaymentOptionsSection"),
);

const GivingProcessSection = dynamic(
  () => import("@/components/pages/give-page/GivingProcessSection"),
);

const GivePage = () => {
  return (
    <main className="flex-1">
      <GiveHero />
      <GiveStripSection />
      <WaysToGiveSection />
      <PaymentOptionsSection />
      <GivingProcessSection />
    </main>
  );
};

export default GivePage;
