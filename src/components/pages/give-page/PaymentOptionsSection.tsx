import AboutIcons from "@/components/icons/AboutIcons";
import GiveIcons from "@/components/icons/GiveIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import ScriptText from "@/components/pages/typography/ScriptText";
import { GIFT_DIFFERENCE, PAYMENT_OPTIONS } from "@/constant/giveData";

const panel = "rounded-xl border border-primary-green/10 bg-white-color/70 p-5";

const PaymentOptionsSection = () => (
  <section className="bg-cream pb-6">
    <div className="wrapper grid grid-cols-1 gap-6 lg:grid-cols-[2.6fr_1fr]">
      <div className={panel}>
        <h2 className="font-heading text-2xl font-semibold text-primary-green">
          {PAYMENT_OPTIONS.title}
        </h2>
        <CardDescSm className="mt-1">{PAYMENT_OPTIONS.subtitle}</CardDescSm>
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
          {PAYMENT_OPTIONS.methods.map(({ id, name, role, detail }) => (
            <li
              key={id}
              className="px-3 text-center lg:border-r lg:border-primary-green/15 lg:last:border-r-0"
            >
              <div className="flex h-10 items-center justify-center text-lg font-bold text-card-heading">
                {id === "bank" ? (
                  <AboutIcons
                    name="home"
                    className="h-8 w-8 text-primary-green [&>svg]:h-full [&>svg]:w-full"
                  />
                ) : (
                  name
                )}
              </div>
              <p className="mt-2 text-xs font-bold leading-snug text-card-heading">
                {id === "bank" ? name : role}
              </p>
              <CardDescSm className="mt-1 !text-xs !leading-4">
                {id === "bank" ? `${role}. ${detail}` : detail}
              </CardDescSm>
            </li>
          ))}
        </ul>
      </div>

      <div className={panel}>
        <h2 className="font-heading text-2xl font-semibold text-primary-green">
          {GIFT_DIFFERENCE.title}
        </h2>
        <ul className="mt-3 grid gap-1.5">
          {GIFT_DIFFERENCE.points.map((point) => (
            <li key={point} className="grid grid-cols-[auto_1fr] gap-2">
              <GiveIcons
                name="check"
                className="mt-0.5 h-4 w-4 text-primary-green [&>svg]:h-full [&>svg]:w-full"
              />
              <CardDescSm className="!text-text-dark">{point}</CardDescSm>
            </li>
          ))}
        </ul>
        <ScriptText className="mt-3 text-right !text-2xl">
          {GIFT_DIFFERENCE.thanks}
        </ScriptText>
      </div>
    </div>
  </section>
);

export default PaymentOptionsSection;
