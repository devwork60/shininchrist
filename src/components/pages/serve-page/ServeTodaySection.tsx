import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import ButtonOutline from "@/components/button/ButtonOutline";
import ServeMottoCard from "./ServeMottoCard";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import { SERVE_TODAY } from "@/constant/serveData";

const ServeTodaySection = () => (
  <section className="bg-cream py-10 lg:py-14">
    <div className="wrapper grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.35fr_0.8fr] lg:gap-10">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl lg:aspect-[4/3] lg:rounded-none lg:[mask-image:linear-gradient(to_right,black_70%,transparent)]">
        <Image
          src={SERVE_TODAY.image}
          alt="Hands planting a seedling in soil"
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover"
        />
      </div>

      <div>
        <MainHeading className="!text-primary-green lg:!leading-tight">
          {SERVE_TODAY.title}
        </MainHeading>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-gold-bright">
          {SERVE_TODAY.tagline}
        </p>
        <Paragraph className="mt-4 lg:!text-lg lg:!leading-8">
          {SERVE_TODAY.description}
        </Paragraph>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-4">
          <ButtonSm
            url={SERVE_TODAY.primary.url}
            text={SERVE_TODAY.primary.text}
            bgColor="var(--gold-bright)"
            textColor="var(--white-color)"
            shape="rounded"
            iconRight={<span aria-hidden="true">→</span>}
          />
          <ButtonOutline
            url={SERVE_TODAY.secondary.url}
            text={SERVE_TODAY.secondary.text}
            borderColor="var(--primary-green)"
            shape="rounded"
          />
        </div>
      </div>

      <ServeMottoCard />
    </div>
  </section>
);

export default ServeTodaySection;
