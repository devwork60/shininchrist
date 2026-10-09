import TeacherIcons from "@/components/icons/TeacherIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { TeacherPointData } from "@/constant/teachersData";

const TeacherPoint = ({
  icon,
  title,
  description,
}: Omit<TeacherPointData, "id">) => (
  <li className="flex items-start gap-4">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--academy-navy)] text-white-color">
      <TeacherIcons name={icon} />
    </span>
    <div>
      <CardTitleSm className="!text-[var(--academy-navy)]">{title}</CardTitleSm>
      <CardDescSm className="mt-0.5 !text-text-dark">{description}</CardDescSm>
    </div>
  </li>
);

export default TeacherPoint;
