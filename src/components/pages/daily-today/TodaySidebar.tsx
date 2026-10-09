import clsx from "clsx";
import Link from "next/link";
import ResourceIcons from "@/components/icons/ResourceIcons";
import UiIcons from "@/components/icons/UiIcons";
import Eyebrow from "@/components/pages/typography/Eyebrow";
import QuoteText from "@/components/pages/typography/QuoteText";
import { TODAY_PAGE } from "@/constant/dailyData";

const TONES = {
  green: "bg-primary-green text-white-color hover:opacity-90",
  gold: "bg-gold-bright text-primary-green-deep hover:opacity-90",
  grey: "bg-black/5 text-text-dark hover:bg-black/10",
  mint: "bg-primary-green/10 text-primary-green hover:bg-primary-green/15",
} as const;

type ActionIconName = (typeof TODAY_PAGE.actions)[number]["icon"];

const ActionIcon = ({ icon }: { icon: ActionIconName }) => {
  if (icon === "play") return <UiIcons name="playSmall" />;
  if (icon === "headphones")
    return <ResourceIcons name="listen" className="[&>svg]:h-6 [&>svg]:w-6" />;
  if (icon === "share") return <UiIcons name="share" />;
  return <UiIcons name="shield" />;
};

const TodaySidebar = () => (
  <aside className="space-y-3 lg:sticky lg:top-[90px] lg:self-start">
    <div className="rounded-2xl bg-primary-green px-6 py-6 text-center text-white-color shadow-md">
      <p className="flex items-center justify-center gap-2 font-sans text-sm font-semibold text-gold-bright">
        <UiIcons name="leaf" />
        {TODAY_PAGE.verseLabel}
      </p>
      <QuoteText className="mt-3 !not-italic lg:!text-2xl">
        {TODAY_PAGE.verse}
      </QuoteText>
      <Eyebrow as="span" className="mt-3 block !text-white-color">
        {TODAY_PAGE.verseReference}
      </Eyebrow>
    </div>

    {TODAY_PAGE.actions.map((action) => (
      <Link
        key={action.id}
        href={action.url}
        className={clsx(
          "flex items-center gap-3 rounded-xl px-5 py-4 text-base font-semibold transition-colors",
          TONES[action.tone],
          action.id === "join" && "mt-5",
        )}
      >
        <ActionIcon icon={action.icon} />
        {action.text}
      </Link>
    ))}
  </aside>
);

export default TodaySidebar;
