import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/common-components/SectionHeader";
import ResourceIcons from "@/components/icons/ResourceIcons";
import UiIcons from "@/components/icons/UiIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardHeading from "@/components/pages/typography/CardHeading";
import {
  ACADEMY_RESOURCES_BANNER,
  ACADEMY_RESOURCES_HEADING,
} from "@/constant/academyResourcesData";

const AcademyResourcesSection = () => (
  <section className="bg-cream pb-8 lg:pb-10">
    <div className="wrapper">
      <SectionHeader variant="label" title={ACADEMY_RESOURCES_HEADING} />

      <div className="mt-4 flex flex-col overflow-hidden rounded-2xl bg-primary-green text-white-color shadow-md lg:flex-row lg:items-center">
        <div className="relative h-40 shrink-0 lg:h-[108px] lg:w-[230px]">
          <Image
            src={ACADEMY_RESOURCES_BANNER.image}
            alt={ACADEMY_RESOURCES_BANNER.imageAlt}
            fill
            sizes="(min-width: 1024px) 230px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex-1 px-5 py-5 lg:px-8">
          <CardHeading className="!text-white-color">
            {ACADEMY_RESOURCES_BANNER.title}
          </CardHeading>
          <CardDescSm className="mt-2 max-w-[620px] !text-white-color/90">
            {ACADEMY_RESOURCES_BANNER.description}
          </CardDescSm>
        </div>

        <Link
          href={ACADEMY_RESOURCES_BANNER.cta.url}
          className="flex items-center gap-4 border-t border-gold-bright/50 px-5 py-5 text-gold-bright transition-opacity hover:opacity-85 lg:mr-4 lg:border-l lg:border-t-0 lg:px-8"
        >
          <ResourceIcons name="cap" />
          <span className="max-w-[130px] text-base font-semibold leading-snug">
            {ACADEMY_RESOURCES_BANNER.cta.text}
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-bright text-primary-green-deep">
            <UiIcons name="arrowRight" />
          </span>
        </Link>
      </div>
    </div>
  </section>
);

export default AcademyResourcesSection;
