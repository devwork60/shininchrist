import FocusIcons from "@/components/icons/FocusIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { FocusItemData } from "@/constant/chapterFocusTypes";

const FocusItem = ({ icon, title, description }: Omit<FocusItemData, "id">) => (
  <li className="flex items-start gap-4">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white-color">
      <FocusIcons name={icon} />
    </span>
    <div>
      <CardTitleSm className="!text-[var(--accent)]">{title}</CardTitleSm>
      <CardDescSm className="mt-0.5">{description}</CardDescSm>
    </div>
  </li>
);

export default FocusItem;
