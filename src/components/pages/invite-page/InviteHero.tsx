import Image from "next/image";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import QuoteText from "@/components/pages/typography/QuoteText";
import { INVITE_HERO } from "@/constant/inviteMercyData";

const InviteHero = () => (
  <section className="bg-[linear-gradient(180deg,#efe9d8,var(--background-cream))] pb-24 lg:pb-32">
    <div className="wrapper grid grid-cols-1 items-center gap-6 pt-10 lg:grid-cols-[1.15fr_0.9fr_0.9fr] lg:pt-14">
      <div>
        <HeroHeading compact className="!text-primary-green">
          {INVITE_HERO.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </HeroHeading>
        <span
          aria-hidden="true"
          className="mt-4 block h-1 w-16 bg-gold-bright"
        />
        <p className="mt-4 font-heading text-xl font-medium leading-snug text-card-heading">
          {INVITE_HERO.tagline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <Paragraph className="mt-3 max-w-md lg:!text-base lg:!leading-7 !text-text-dark">
          {INVITE_HERO.description}
        </Paragraph>
      </div>

      <div className="relative mx-auto aspect-[300/286] w-full max-w-[340px] [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
        <Image
          src={INVITE_HERO.image}
          alt="Georgia “Mercy” Morris"
          fill
          priority
          sizes="340px"
          className="object-cover"
        />
      </div>

      <div className="lg:pl-6">
        <QuoteText className="!text-2xl !leading-snug !text-card-heading">
          “{INVITE_HERO.quote}”
        </QuoteText>
        <p className="mt-4 font-heading text-base text-text-dark">
          {INVITE_HERO.quoteBy.map((line, index) => (
            <span key={line} className="block">
              {index === 0 && "— "}
              {line}
            </span>
          ))}
        </p>
        <span
          aria-hidden="true"
          className="mt-3 block h-1 w-16 bg-gold-bright"
        />
      </div>
    </div>
  </section>
);

export default InviteHero;
