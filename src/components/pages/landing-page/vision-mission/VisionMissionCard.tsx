import AboutIcons, { type AboutIconName } from "@/components/icons/AboutIcons";
import CardHeading from "@/components/pages/typography/CardHeading";
import CardDesc from "@/components/pages/typography/CardDesc";
import UiIcons from "@/components/icons/UiIcons";

interface VisionMissionCardProps {
  icon: AboutIconName;
  title: string;
  text: string;
}

/** White card: green icon circle, uppercase title with gold diamond, text, curved green/gold base. */
const VisionMissionCard = ({ icon, title, text }: VisionMissionCardProps) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-primary-gold/20 bg-white-color text-center shadow-sm">
    <div className="flex-1 px-6 pb-6 pt-8 lg:px-10">
      <AboutIcons
        name={icon}
        className="mx-auto block h-16 w-16 rounded-full bg-primary-green p-4 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
      />
      <CardHeading className="mt-4 uppercase tracking-wide !text-primary-green">
        {title}
      </CardHeading>
      <div
        aria-hidden="true"
        className="mx-auto mt-2 flex w-28 items-center gap-2 text-primary-gold"
      >
        <span className="h-px flex-1 bg-primary-gold/70" />
        <UiIcons name="sparkle" />
        <span className="h-px flex-1 bg-primary-gold/70" />
      </div>
      <CardDesc className="mt-4 !text-text-dark">{text}</CardDesc>
    </div>
    <div
      aria-hidden="true"
      className="h-8 rounded-t-[100%] border-t-4 border-primary-gold bg-primary-green"
    />
  </article>
);

export default VisionMissionCard;
