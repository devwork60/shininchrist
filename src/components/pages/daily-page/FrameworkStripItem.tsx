import FrameworkIcons from "@/components/icons/FrameworkIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { DailyFrameworkItem } from "@/constant/dailyData";

const FrameworkStripItem = ({
  icon,
  title,
  description,
  className,
}: Omit<DailyFrameworkItem, "id"> & { className?: string }) => (
  <li
    className={`flex items-center justify-center gap-4 px-4 py-5 ${className ?? ""}`}
  >
    <FrameworkIcons
      name={icon}
      className="shrink-0 text-primary-green [&>svg]:h-10 [&>svg]:w-10 [&>svg]:stroke-[1.4]"
    />
    <div>
      <CardTitleSm className="!text-primary-green">{title}</CardTitleSm>
      <CardDescSm className="!leading-snug">{description}</CardDescSm>
    </div>
  </li>
);

export default FrameworkStripItem;
