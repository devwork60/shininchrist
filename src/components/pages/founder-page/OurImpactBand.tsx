import AboutIcons from "@/components/icons/AboutIcons";
import ScriptText from "@/components/pages/typography/ScriptText";
import { FOUNDER_IMPACT, FOUNDER_VERSE } from "@/constant/founderPageData";

const OurImpactBand = () => (
  <section className="bg-cream pb-10 lg:pb-14">
    <div className="wrapper">
      <div className="grid items-center gap-4 rounded-xl bg-primary-green p-6 text-white-color lg:grid-cols-[auto_1fr] lg:gap-10 lg:px-10">
        <div className="flex items-center gap-4">
          <AboutIcons
            name="heart"
            className="h-14 w-14 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
          />
          <ScriptText className="!text-4xl !text-gold-bright lg:!text-5xl">
            {FOUNDER_IMPACT.title}
          </ScriptText>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-white-color/95 md:text-base">
            {FOUNDER_IMPACT.text}
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-bold uppercase tracking-wide text-gold-bright sm:grid-cols-4">
            {FOUNDER_IMPACT.labels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="mt-8 text-center">
        <blockquote className="mx-auto max-w-3xl font-heading text-lg italic leading-relaxed text-primary-green lg:text-xl">
          {FOUNDER_VERSE.text}
        </blockquote>
        <figcaption className="mt-2 text-sm text-text-dark">
          {FOUNDER_VERSE.ref}
        </figcaption>
      </figure>
    </div>
  </section>
);

export default OurImpactBand;
