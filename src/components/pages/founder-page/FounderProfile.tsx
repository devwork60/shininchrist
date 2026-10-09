import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import AboutIcons from "@/components/icons/AboutIcons";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import { FOUNDER_PROFILE } from "@/constant/founderPageData";
import EducationService from "./EducationService";

const FounderProfile = () => (
  <section className="bg-cream py-8 lg:py-12">
    <div className="wrapper grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:gap-10">
      <div className="grid content-start gap-6">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border-2 border-primary-gold/60">
          <Image
            src={FOUNDER_PROFILE.portrait}
            alt={FOUNDER_PROFILE.portraitAlt}
            fill
            priority
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover object-[35%_center]"
          />
        </div>
        <figure className="relative rounded-xl border border-primary-gold/40 bg-white-color/70 p-6 text-center">
          <AboutIcons
            name="quote"
            className="absolute left-4 top-3 h-7 w-7 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
          />
          <blockquote className="pt-4 font-heading text-lg italic leading-relaxed text-card-heading">
            {FOUNDER_PROFILE.quote}
          </blockquote>
          <figcaption className="mt-3 text-right font-heading italic text-text-dark">
            {FOUNDER_PROFILE.quoteBy}
          </figcaption>
        </figure>
      </div>

      <div>
        <MainHeading className="!text-[28px] !text-primary-green md:!text-[32px] lg:!text-[38px] lg:!leading-tight">
          {FOUNDER_PROFILE.name}
        </MainHeading>
        <span
          aria-hidden="true"
          className="mt-2 block h-px w-full bg-primary-gold/50"
        />
        <p className="mt-3 font-heading text-lg font-semibold italic leading-snug text-primary-gold lg:text-xl">
          {FOUNDER_PROFILE.subtitle}
        </p>
        <div className="mt-4 grid gap-3">
          {FOUNDER_PROFILE.paragraphs.map((paragraph) => (
            <Paragraph
              key={paragraph}
              className="lg:!text-base lg:!leading-7 !text-text-dark"
            >
              {paragraph}
            </Paragraph>
          ))}
        </div>
        <div className="mt-5 mb-6">
          <ButtonSm
            url={FOUNDER_PROFILE.inviteCta.url}
            text={FOUNDER_PROFILE.inviteCta.text}
            bgColor="var(--primary-green)"
            textColor="var(--white-color)"
            shape="rounded"
            icon={
              <AboutIcons
                name="people"
                className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
              />
            }
          />
        </div>
        <EducationService />
      </div>
    </div>
  </section>
);

export default FounderProfile;
