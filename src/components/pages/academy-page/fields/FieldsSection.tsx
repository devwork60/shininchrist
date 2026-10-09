import ButtonSm from "@/components/button/ButtonSm";
import UiIcons from "@/components/icons/UiIcons";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import { FIELDS, FIELDS_CTA, FIELDS_HEADER } from "@/constant/academyData";
import FieldItem from "./FieldItem";

const FieldsSection = () => (
  <section id="fields" className="bg-cream py-10 lg:py-12">
    <div className="wrapper text-center">
      <BlockHeading className="!text-primary-green-deep">
        {FIELDS_HEADER.heading}
      </BlockHeading>
      <CardDescSm className="mt-2 !text-text-dark">
        {FIELDS_HEADER.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </CardDescSm>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-0 sm:grid-cols-3">
        {FIELDS.map(({ id, ...field }) => (
          <FieldItem key={id} {...field} className="mb-8" />
        ))}
      </div>

      <div className="flex justify-center">
        <ButtonSm
          url={FIELDS_CTA.url}
          text={FIELDS_CTA.text}
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

export default FieldsSection;
