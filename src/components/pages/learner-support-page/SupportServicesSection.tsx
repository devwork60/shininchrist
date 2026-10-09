import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import {
  LEARNER_SUPPORT_CTA,
  SUPPORT_SERVICES,
} from "@/constant/learnerSupportData";
import SupportServiceItem from "./SupportServiceItem";

const SupportServicesSection = () => (
  <section className="bg-cream py-10 lg:py-14">
    <div className="wrapper-narrow">
      <ul className="mx-auto grid max-w-xl gap-5">
        {SUPPORT_SERVICES.map(({ id, ...service }) => (
          <SupportServiceItem key={id} {...service} />
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <ButtonSm
          url={LEARNER_SUPPORT_CTA.url}
          text={LEARNER_SUPPORT_CTA.text}
          bgColor="var(--gold-bright)"
          textColor="var(--primary-green-deep)"
          shape="rounded"
          className="w-auto"
          padding="px-8 py-3"
          paddingMd="md:px-8 md:py-3"
          paddingLg="lg:px-10 lg:py-3.5"
          iconRight={<UiIcons name="arrowRight" />}
        />
      </div>
    </div>
  </section>
);

export default SupportServicesSection;
