import ButtonSm from "@/components/button/ButtonSm";
import ResourceIcons from "@/components/icons/ResourceIcons";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardHeading from "@/components/pages/typography/CardHeading";
import { LIBRARY_CTA } from "@/constant/libraryCtaData";

const LibraryCtaSection = () => (
  <section className="bg-cream pb-10 lg:pb-12">
    <div className="wrapper">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-primary-green px-6 py-8 text-center text-white-color shadow-md lg:flex-row lg:gap-10 lg:px-10 lg:py-6 lg:text-left">
        <ResourceIcons
          name="read"
          className="shrink-0 text-gold-bright [&>svg]:h-16 [&>svg]:w-16 lg:[&>svg]:h-20 lg:[&>svg]:w-20"
        />

        <CardHeading className="!text-white-color lg:max-w-[420px]">
          {LIBRARY_CTA.title}
        </CardHeading>

        <div className="flex-1 border-gold-bright/50 lg:border-l lg:pl-8">
          <CardDescSm className="mx-auto max-w-[360px] !text-white-color/90 lg:mx-0">
            {LIBRARY_CTA.description}
          </CardDescSm>
        </div>

        <ButtonSm
          url={LIBRARY_CTA.cta.url}
          text={LIBRARY_CTA.cta.text}
          bgColor="var(--gold-bright)"
          textColor="var(--primary-green-deep)"
          className="shrink-0"
          iconRight={<UiIcons name="arrowRight" />}
        />
      </div>
    </div>
  </section>
);

export default LibraryCtaSection;
