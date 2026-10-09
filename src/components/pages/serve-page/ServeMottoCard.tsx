import ServeIcons from "@/components/icons/ServeIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import QuoteText from "@/components/pages/typography/QuoteText";
import { SERVE_MOTTO } from "@/constant/serveData";

const ServeMottoCard = () => (
  <div className="rounded-xl bg-primary-green-deep p-6 text-center text-white-color lg:p-8">
    <div className="flex items-center justify-center gap-3">
      <ServeIcons
        name="leaf"
        className="block h-8 w-8 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
      />
      <p className="font-heading text-lg font-semibold">{SERVE_MOTTO.label}</p>
    </div>
    <QuoteText className="mt-4 !not-italic !text-xl lg:!text-2xl">
      {SERVE_MOTTO.text}
    </QuoteText>
    <span
      aria-hidden="true"
      className="mx-auto my-4 block h-1 w-16 bg-gold-bright"
    />
    <CardDescSm className="!text-white-color/90">{SERVE_MOTTO.note}</CardDescSm>
    <p className="mt-1 text-xs text-white-color/80">{SERVE_MOTTO.verse}</p>
  </div>
);

export default ServeMottoCard;
