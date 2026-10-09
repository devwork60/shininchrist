import clsx from "clsx";
import Image from "next/image";
import ButtonSm from "@/components/button/ButtonSm";
import GiveIcons from "@/components/icons/GiveIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import type { GiveWayCardData } from "@/constant/giveData";

/** Coloured header, photo, gold button, check list. Subgrid aligns rows across cards. */
const GiveWayCard = ({ card }: { card: GiveWayCardData }) => (
  <article className="row-span-4 grid grid-rows-subgrid gap-y-0 overflow-hidden rounded-xl bg-white-color shadow-[0_2px_12px_rgba(29,61,46,0.1)]">
    <div
      className={clsx(
        "flex items-center gap-4 px-5 py-4 text-white-color",
        card.tone === "gold" ? "bg-primary-gold" : "bg-primary-green",
      )}
    >
      <GiveIcons
        name={card.icon}
        className="h-12 w-12 shrink-0 [&>svg]:h-full [&>svg]:w-full"
      />
      <div>
        <h3 className="font-heading text-xl font-semibold leading-tight">
          {card.title}
        </h3>
        <p className="mt-1 text-sm leading-snug text-white-color/90">
          {card.headerDesc}
        </p>
      </div>
    </div>

    <div className="relative aspect-[16/8]">
      <Image
        src={card.image}
        alt={card.imageAlt}
        fill
        sizes="(min-width: 1024px) 30vw, 100vw"
        className="object-cover"
      />
    </div>

    <div className="px-5 pt-5 text-center">
      <ButtonSm
        url={card.cta.url}
        text={card.cta.text}
        bgColor="var(--gold-bright)"
        textColor="var(--card-heading)"
        shape="rounded"
        padding="px-5 py-2"
        paddingMd="md:px-5 md:py-2"
        paddingLg="lg:px-6 lg:py-2.5"
        iconRight={<span aria-hidden="true">→</span>}
      />
    </div>

    <div className="px-5 pb-5 pt-4">
      <ul className="grid gap-2">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="grid grid-cols-[auto_1fr] gap-2">
            <GiveIcons
              name="check"
              className="mt-0.5 h-4 w-4 text-primary-green [&>svg]:h-full [&>svg]:w-full"
            />
            <CardDescSm className="!text-text-dark">{bullet}</CardDescSm>
          </li>
        ))}
      </ul>
      {card.footerNote && (
        <CardDescSm className="mt-4 !text-xs">{card.footerNote}</CardDescSm>
      )}
    </div>
  </article>
);

export default GiveWayCard;
