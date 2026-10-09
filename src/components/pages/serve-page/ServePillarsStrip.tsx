import ServeIcons from "@/components/icons/ServeIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import { SERVE_PILLARS } from "@/constant/serveData";

const ServePillarsStrip = () => (
  <section className="border-b border-primary-gold/20 bg-white-color">
    <div className="wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {SERVE_PILLARS.map((pillar) => (
        <div
          key={pillar.title}
          className="flex items-center justify-center gap-3 border-primary-gold/20 py-5 sm:odd:border-r lg:border-r lg:last:border-r-0"
        >
          <ServeIcons
            name={pillar.icon}
            className="h-9 w-9 shrink-0 text-primary-green [&>svg]:h-full [&>svg]:w-full"
          />
          <div>
            <CardTitleSm>{pillar.title}</CardTitleSm>
            <CardDescSm>{pillar.text}</CardDescSm>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ServePillarsStrip;
