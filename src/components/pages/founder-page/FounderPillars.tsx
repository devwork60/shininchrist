import AboutIcons from "@/components/icons/AboutIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import { FOUNDER_PILLARS } from "@/constant/founderPageData";

/** Three text cards. Subgrid keeps the headings and body aligned across cards. */
const FounderPillars = () => (
  <section className="bg-cream pb-6">
    <div className="wrapper grid grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-3 lg:gap-y-0">
      {FOUNDER_PILLARS.map(({ id, icon, title, text }) => (
        <article
          key={id}
          className="row-span-2 grid grid-rows-subgrid gap-y-0 rounded-xl border border-primary-gold/20 bg-white-color/70 p-5"
        >
          <div className="flex items-center gap-3">
            <AboutIcons
              name={icon}
              className="h-12 w-12 shrink-0 rounded-full bg-primary-green p-3 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
            />
            <h2 className="font-heading text-lg font-semibold leading-tight text-card-heading">
              {title}
            </h2>
          </div>
          <CardDescSm className="mt-4 !leading-6 !text-text-dark">
            {text}
          </CardDescSm>
        </article>
      ))}
    </div>
  </section>
);

export default FounderPillars;
