import Image from "next/image";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import { FOUNDER_HERO } from "@/constant/founderPageData";

const FounderHero = () => (
  <section className="relative isolate overflow-hidden border-b-4 border-primary-gold bg-white-color">
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%] md:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
    >
      <Image
        src={FOUNDER_HERO.image}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 62vw, 100vw"
        className="object-cover object-right"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-white-color/80 md:hidden"
    />

    <div className="wrapper flex min-h-[280px] flex-col justify-center py-10 lg:min-h-[340px]">
      <HeroHeading className="!font-heading !leading-[1.05] !text-primary-green">
        <span className="block italic">{FOUNDER_HERO.titleTop}</span>
        <span className="block italic !text-gold-bright lg:ml-24">
          {FOUNDER_HERO.titleAccent}
        </span>
      </HeroHeading>
      <p className="mt-4 text-sm font-semibold uppercase leading-relaxed tracking-wide text-text-dark md:text-base">
        {FOUNDER_HERO.roles.map((role) => (
          <span key={role} className="block">
            {role}
          </span>
        ))}
      </p>
    </div>
  </section>
);

export default FounderHero;
