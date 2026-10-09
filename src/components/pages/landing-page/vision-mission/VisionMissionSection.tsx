import BorderedSection from "@/components/common-components/BorderedSection";
import { VISION_MISSION } from "@/constant/homeAddonsData";
import VisionMissionCard from "./VisionMissionCard";

const { vision, mission } = VISION_MISSION;

const VisionMissionSection = () => (
  <div className="-mt-[50px] bg-cream pt-[78px]">
    <BorderedSection id={VISION_MISSION.id} title={VISION_MISSION.title}>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-10">
        <VisionMissionCard {...vision} />
        <VisionMissionCard {...mission} />
      </div>
    </BorderedSection>
  </div>
);

export default VisionMissionSection;
