import BenefitIcons from "@/components/icons/BenefitIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { BenefitData } from "@/constant/academyData";

const BenefitItem = ({ icon, title, description }: Omit<BenefitData, "id">) => (
  <li className="flex items-center gap-2.5">
    <BenefitIcons
      name={icon}
      className="shrink-0 text-primary-green-deep [&>svg]:h-8 [&>svg]:w-8"
    />
    <div>
      <CardTitleSm className="!text-[13px] !text-primary-green-deep">
        {title}
      </CardTitleSm>
      <CardDescSm className="!text-xs !leading-snug !text-text-dark">
        {description}
      </CardDescSm>
    </div>
  </li>
);

export default BenefitItem;
