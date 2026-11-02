import clsx from "clsx";
import Link from "next/link";
import ResourceIcons from "@/components/icons/ResourceIcons";
import SocialIcons from "@/components/icons/SocialIcons";
import UiIcons from "@/components/icons/UiIcons";
import Eyebrow from "@/components/pages/typography/Eyebrow";
import QuoteText from "@/components/pages/typography/QuoteText";
import type { DailyTodayContent } from "@/lib/site-content-schema";
import ShareButton from "./ShareButton";

const BASE =
  "flex items-center gap-3 rounded-xl px-5 py-4 text-base font-semibold transition-colors";

const TONES = {
  green: "bg-primary-green text-white-color hover:opacity-90",
  gold: "bg-gold-bright text-primary-green-deep hover:opacity-90",
  grey: "bg-black/5 text-text-dark hover:bg-black/10",
  mint: "bg-primary-green/10 text-primary-green hover:bg-primary-green/15",
} as const;

const OPTION_TONE = {
  youtube: TONES.green,
  facebook: TONES.mint,
  instagram: TONES.mint,
  tiktok: TONES.mint,
  audio: TONES.gold,
} as const;

const OptionIcon = ({ id }: { id: DailyTodayContent["viewOptions"][number]["id"] }) => {
  if (id === "youtube") return <UiIcons name="playSmall" />;
  if (id === "audio")
    return <ResourceIcons name="listen" className="[&>svg]:h-6 [&>svg]:w-6" />;
  return <SocialIcons name={id} className="[&>svg]:h-6 [&>svg]:w-6" />;
};

/** The right-hand column: today's verse, the ways to watch or listen, share, and join. */
const TodaySidebar = ({ content }: { content: DailyTodayContent }) => (
  <aside className="space-y-3 lg:sticky lg:top-[90px] lg:self-start">
    <div className="rounded-2xl bg-primary-green px-6 py-6 text-center text-white-color shadow-md">
      <p className="flex items-center justify-center gap-2 font-sans text-sm font-semibold text-gold-bright">
        <UiIcons name="leaf" />
        Today’s Verse
      </p>
      <QuoteText className="mt-3 !not-italic lg:!text-2xl">
        {content.verse}
      </QuoteText>
      {content.verseReference && (
        <Eyebrow as="span" className="mt-3 block !text-white-color">
          {content.verseReference}
        </Eyebrow>
      )}
    </div>

    {content.viewOptions
      .filter((option) => option.enabled && option.url)
      .map((option) => (
        <Link
          key={option.id}
          href={option.url}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(BASE, OPTION_TONE[option.id])}
        >
          <OptionIcon id={option.id} />
          {option.label}
        </Link>
      ))}

    <ShareButton label="Share This Daily" className={clsx(BASE, TONES.grey, "w-full text-left")} />

    <Link href="/join" className={clsx(BASE, TONES.mint, "mt-5")}>
      <UiIcons name="shield" />
      Join ShininChrist
    </Link>
  </aside>
);

export default TodaySidebar;
