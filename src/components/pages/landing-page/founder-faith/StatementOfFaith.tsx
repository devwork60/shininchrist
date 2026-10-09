import ButtonOutline from "@/components/button/ButtonOutline";
import UiIcons from "@/components/icons/UiIcons";
import SubHeading from "@/components/pages/typography/SubHeading";
import {
  FAITH_CTA,
  FAITH_HEADING,
  FAITH_ITEMS,
} from "@/constant/founderFaithData";
import FaithItem from "./FaithItem";

const StatementOfFaith = () => (
  <div className="w-full max-w-[460px] text-left lg:justify-self-start lg:pl-8">
    <SubHeading>{FAITH_HEADING}</SubHeading>

    <ul className="mt-5 space-y-3.5">
      {FAITH_ITEMS.map(({ id, ...item }) => (
        <FaithItem key={id} {...item} />
      ))}
    </ul>

    <div className="mt-6">
      <ButtonOutline
        url={FAITH_CTA.url}
        text={FAITH_CTA.text}
        borderColor="var(--primary-green)"
        textColor="var(--white-color)"
        shape="rounded"
        icon={<UiIcons name="book" />}
      />
    </div>
  </div>
);

export default StatementOfFaith;
