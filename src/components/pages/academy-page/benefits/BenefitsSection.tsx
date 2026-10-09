import ScriptText from "@/components/pages/typography/ScriptText";
import { BENEFITS, BENEFITS_SCRIPT } from "@/constant/academyData";
import BenefitItem from "./BenefitItem";

const BenefitsSection = () => (
  <section className="border-y border-primary-gold/20 bg-[#f1ecdf] py-6">
    <div className="wrapper grid items-center gap-6 xl:grid-cols-[1fr_170px] xl:gap-4">
      <ul className="grid gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {BENEFITS.map(({ id, ...benefit }) => (
          <BenefitItem key={id} {...benefit} />
        ))}
      </ul>

      <div className="text-center xl:text-right">
        <ScriptText className="-rotate-6 !text-2xl lg:!text-[26px]">
          {BENEFITS_SCRIPT.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </ScriptText>
        <span
          aria-hidden="true"
          className="mx-auto mt-1 block h-0.5 w-24 -rotate-6 bg-gold-bright xl:ml-auto xl:mr-0"
        />
      </div>
    </div>
  </section>
);

export default BenefitsSection;
