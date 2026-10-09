import type { CSSProperties } from "react";
import SupportIcons from "@/components/icons/SupportIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { SupportServiceData } from "@/constant/learnerSupportData";

const SupportServiceItem = ({
  icon,
  title,
  description,
  accent,
}: Omit<SupportServiceData, "id">) => (
  <li
    style={{ "--accent": accent } as CSSProperties}
    className="flex items-center gap-4"
  >
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white-color">
      <SupportIcons name={icon} />
    </span>
    <div>
      <CardTitleSm className="!text-[var(--accent)]">{title}</CardTitleSm>
      <CardDescSm className="mt-0.5 !text-text-dark">{description}</CardDescSm>
    </div>
  </li>
);

export default SupportServiceItem;
