import ResourceIcons from "@/components/icons/ResourceIcons";
import UiIcons from "@/components/icons/UiIcons";
import type { FormationStepData } from "@/constant/dailyData";

/** Small leading icon for a step button. */
const StepButtonIcon = ({
  icon,
}: {
  icon: FormationStepData["button"]["icon"];
}) => {
  switch (icon) {
    case "play":
      return <UiIcons name="playSmall" />;
    case "book":
      return <ResourceIcons name="read" className="[&>svg]:h-5 [&>svg]:w-5" />;
    case "doc":
      return <UiIcons name="doc" />;
    case "headphones":
      return (
        <ResourceIcons name="listen" className="[&>svg]:h-5 [&>svg]:w-5" />
      );
    default:
      return <UiIcons name="arrowRight" />;
  }
};

export default StepButtonIcon;
