import FaithIcons from "@/components/icons/FaithIcons";
import CardDesc from "@/components/pages/typography/CardDesc";
import type { FaithItemData } from "@/constant/founderFaithData";

const FaithItem = ({ icon, text }: Omit<FaithItemData, "id">) => (
  <li className="flex items-start gap-3.5">
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-green text-primary-gold">
      <FaithIcons name={icon} />
    </span>
    <CardDesc className="!text-[15px] !leading-6 !text-text-dark">
      {text}
    </CardDesc>
  </li>
);

export default FaithItem;
