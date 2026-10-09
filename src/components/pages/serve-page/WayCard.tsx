import Image from "next/image";
import ButtonOutline from "@/components/button/ButtonOutline";
import ServeIcons from "@/components/icons/ServeIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { WayToServe } from "@/constant/serveData";

/** Photo, round icon, title, description, button. Subgrid keeps rows aligned across cards. */
const WayCard = ({ way }: { way: WayToServe }) => (
  <article className="row-span-5 grid grid-rows-subgrid gap-y-0 overflow-hidden rounded-xl bg-white-color shadow-[0_2px_12px_rgba(29,61,46,0.08)]">
    <div className="relative aspect-[16/10]">
      <Image
        src={way.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
    <div className="-mt-6 flex justify-center">
      <ServeIcons
        name={way.icon}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white-color p-3 text-primary-green shadow-md [&>svg]:h-full [&>svg]:w-full"
      />
    </div>
    <CardTitleSm className="px-4 pt-3 text-center !font-heading !text-lg">
      {way.title}
    </CardTitleSm>
    <CardDescSm className="px-4 pb-5 pt-2 text-center">
      {way.description}
    </CardDescSm>
    <div className="px-4 pb-5 text-center">
      <ButtonOutline
        url={way.cta.url}
        text={way.cta.text}
        borderColor="var(--primary-green)"
        shape="rounded"
        className="w-full !px-3 !py-2 !text-sm"
      />
    </div>
  </article>
);

export default WayCard;
