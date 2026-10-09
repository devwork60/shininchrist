import Image from "next/image";
import clsx from "clsx";
import ButtonOutline from "@/components/button/ButtonOutline";
import PathwayIcons from "@/components/icons/PathwayIcons";
import UiIcons from "@/components/icons/UiIcons";
import CardDesc from "@/components/pages/typography/CardDesc";
import CardHeading from "@/components/pages/typography/CardHeading";
import type { PathwayCardData } from "@/constant/pathwayData";

const PathwayCard = ({
  icon,
  title,
  description,
  image,
  imageAlt,
  buttonText,
  url,
  tone,
}: Omit<PathwayCardData, "id">) => {
  const isGreen = tone === "green";

  return (
    <article
      className={clsx(
        "relative mb-4 mt-10 row-span-4 grid grid-rows-subgrid rounded-2xl shadow-md",
        isGreen ? "bg-primary-green" : "bg-primary-gold",
      )}
    >
      <span
        className={clsx(
          "absolute -top-[35px] left-1/2 z-10 flex h-[100px] w-[100px] -translate-x-1/2 items-center justify-center rounded-full border-2",
          isGreen
            ? "border-primary-gold/60 bg-primary-green text-primary-gold"
            : "border-white-color/60 bg-primary-gold text-white-color",
        )}
      >
        <PathwayIcons name={icon} />
      </span>

      <div className="relative h-[110px] w-full overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <CardHeading className="px-5 pt-4 text-center !text-white-color">
        {title}
      </CardHeading>
      <div className="px-5 pt-2 text-center">
        <CardDesc className="mx-auto max-w-[250px] !text-white-color/90">
          {description}
        </CardDesc>
      </div>

      <div className="flex items-end justify-center px-5 pb-6 pt-5">
        <ButtonOutline
          url={url}
          text={buttonText}
          borderColor="var(--white-color)"
          defaultTextColor="var(--white-color)"
          textColor={isGreen ? "var(--primary-green)" : "var(--primary-gold)"}
          shape="rounded"
          iconRight={<UiIcons name="arrowRight" />}
        />
      </div>
    </article>
  );
};

export default PathwayCard;
