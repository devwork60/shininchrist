import AboutIcons from "@/components/icons/AboutIcons";
import AuthIcons from "@/components/icons/AuthIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import { JOIN_NOTES, JOIN_SSO, JOIN_WELCOME } from "@/constant/joinData";

const PILLAR_ICONS = ["heart", "people", "globe", "cross"] as const;

const JoinClosingBands = () => (
  <section className="bg-cream pb-10 lg:pb-14">
    <div className="wrapper grid gap-5">
      <div className="grid items-center gap-3 rounded-xl bg-primary-green p-6 text-white-color md:grid-cols-[auto_1fr] md:gap-6">
        <AuthIcons
          name="google"
          className="h-14 w-14 rounded-full bg-white-color p-3 [&>svg]:h-full [&>svg]:w-full"
        />
        <div>
          <h2 className="font-heading text-xl text-gold-bright">
            {JOIN_SSO.title}
          </h2>
          <p className="mt-1 text-sm text-white-color/90">{JOIN_SSO.text}</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-primary-green/10 bg-white-color/70 p-6">
          <h2 className="font-heading text-xl font-semibold text-card-heading">
            {JOIN_NOTES.title}
          </h2>
          <ul className="mt-4 grid gap-3">
            {JOIN_NOTES.items.map((item) => (
              <li key={item} className="grid grid-cols-[auto_1fr] gap-3">
                <AuthIcons
                  name="shield"
                  className="mt-0.5 h-5 w-5 text-primary-green [&>svg]:h-full [&>svg]:w-full"
                />
                <CardDescSm className="!text-text-dark">{item}</CardDescSm>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-primary-green p-6 text-center text-white-color">
          <h2 className="font-heading text-2xl text-gold-bright">
            {JOIN_WELCOME.title}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white-color/90">
            {JOIN_WELCOME.text}
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {JOIN_WELCOME.pillars.map((pillar, index) => (
              <li key={pillar} className="text-sm font-medium">
                <AboutIcons
                  name={PILLAR_ICONS[index]}
                  className="mx-auto mb-1 block h-9 w-9 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
                />
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid items-center gap-2 rounded-xl border border-primary-gold/30 bg-white-color/70 px-6 py-4 text-center md:grid-cols-[auto_1fr_auto] md:text-left">
        <p className="font-heading text-lg font-semibold text-card-heading">
          {JOIN_WELCOME.tagline}
        </p>
        <p className="text-sm text-text-dark">{JOIN_WELCOME.taglineText}</p>
        <p className="font-heading text-lg italic text-primary-green">
          {JOIN_WELCOME.thanks}
        </p>
      </div>
    </div>
  </section>
);

export default JoinClosingBands;
