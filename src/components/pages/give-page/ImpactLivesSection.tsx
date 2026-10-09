import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import QuoteText from "@/components/pages/typography/QuoteText";
import { IMPACT_LIVES_SECTION } from "@/constant/giveData";

const ImpactLivesSection = () => (
  <section className="bg-cream pb-6 pt-2 lg:pb-8">
    <div className="wrapper grid grid-cols-1 gap-6 lg:grid-cols-[2.6fr_1fr]">
      <div>
        <MainHeading className="!text-[28px] !text-primary-green lg:!text-[34px] lg:!leading-tight">
          {IMPACT_LIVES_SECTION.title}
        </MainHeading>
        <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {IMPACT_LIVES_SECTION.items.map((item) => (
            <li key={item.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 15vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-center font-heading text-base font-semibold leading-snug text-card-heading">
                {item.title}
              </p>
              <CardDescSm className="text-center">{item.subtext}</CardDescSm>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-primary-green/10 bg-white-color/70 p-6 text-center">
        <QuoteText className="!text-xl !font-semibold !text-card-heading lg:!text-2xl">
          {IMPACT_LIVES_SECTION.quoteCard.quote}
        </QuoteText>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-text-dark">
          {IMPACT_LIVES_SECTION.quoteCard.reference}
        </p>
        <div className="mt-6">
          <ButtonSm
            url={IMPACT_LIVES_SECTION.quoteCard.ctaUrl}
            text={IMPACT_LIVES_SECTION.quoteCard.ctaText}
            bgColor="var(--primary-green)"
            textColor="var(--white-color)"
            shape="rounded"
            iconRight={<span aria-hidden="true">→</span>}
          />
        </div>
      </div>
    </div>
  </section>
);

export default ImpactLivesSection;
