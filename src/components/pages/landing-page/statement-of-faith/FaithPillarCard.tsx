import AboutIcons from "@/components/icons/AboutIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import type { FaithPillar } from "@/constant/homeAddonsData";

const FaithPillarCard = ({
  icon,
  title,
  subtitle,
  text,
  reference,
}: Omit<FaithPillar, "id">) => (
  <li className="px-3 py-2 text-center lg:border-r lg:border-primary-gold/25 lg:last:border-r-0">
    <AboutIcons
      name={icon}
      className="mx-auto block h-14 w-14 rounded-full bg-primary-green p-3.5 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
    />
    <h3 className="mt-3 text-sm font-bold uppercase leading-snug tracking-wide text-card-heading">
      {title}
    </h3>
    {subtitle && (
      <p className="mt-0.5 text-xs font-semibold uppercase text-text-dark">
        {subtitle}
      </p>
    )}
    <CardDescSm className="mt-3 !text-[13px] !leading-5">{text}</CardDescSm>
    {reference && (
      <p className="mt-2 text-xs font-semibold text-primary-gold">
        {reference}
      </p>
    )}
  </li>
);

export default FaithPillarCard;
