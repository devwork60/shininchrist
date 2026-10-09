import GiveIcons from "@/components/icons/GiveIcons";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import { GIVE_STRIP } from "@/constant/giveData";

const GiveStripSection = () => (
  <section className="border-b border-primary-gold/20 bg-white-color">
    <div className="wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
      {GIVE_STRIP.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-center gap-3 py-5"
        >
          <GiveIcons
            name={item.icon}
            className="h-9 w-9 shrink-0 text-primary-green [&>svg]:h-full [&>svg]:w-full"
          />
          <CardTitleSm>
            {item.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </CardTitleSm>
        </div>
      ))}
    </div>
  </section>
);

export default GiveStripSection;
