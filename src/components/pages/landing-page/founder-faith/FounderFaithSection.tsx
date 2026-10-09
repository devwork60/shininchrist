import Image from "next/image";
import UiIcons from "@/components/icons/UiIcons";
import AboutFounder from "./AboutFounder";
import StatementOfFaith from "./StatementOfFaith";

const Divider = () => (
  <div aria-hidden="true" className="relative flex items-center justify-center">
    <span className="h-px w-full bg-primary-gold/40 lg:h-full lg:w-px" />
    <span className="absolute bg-cream px-1 text-primary-gold">
      <UiIcons name="sparkle" />
    </span>
  </div>
);

const FounderFaithSection = () => (
  <section className="bg-cream pb-8 lg:pb-12">
    <div className="wrapper">
      <div className="relative overflow-hidden rounded-3xl border border-primary-gold/15 bg-white-color/50 p-6 shadow-sm md:p-10 lg:p-12">
        {/* faint dove-on-branch watermark (from the approved design) */}
        <Image
          src="/images/dove-on-branch.png"
          alt=""
          width={500}
          height={640}
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 right-4 hidden h-[140px] w-auto opacity-[0.16] sm:block lg:right-8 lg:h-[170px]"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          <AboutFounder />
          <Divider />
          <StatementOfFaith />
        </div>
      </div>
    </div>
  </section>
);

export default FounderFaithSection;
