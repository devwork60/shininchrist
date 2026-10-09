import GiveIcons from "@/components/icons/GiveIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import SubHeading from "@/components/pages/typography/SubHeading";
import NeedAssistanceCard from "./NeedAssistanceCard";
import QrCode from "@/components/common-components/QrCode";
import { GIVE_QR, GIVING_PROCESS, HOW_IT_WORKS } from "@/constant/giveData";

const GivingProcessSection = () => (
  <section id="giving-options" className="scroll-mt-24 bg-cream pb-10 lg:pb-14">
    <div className="wrapper grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1.5fr_1fr]">
      <div>
        <SubHeading className="!text-[28px] !text-primary-green lg:!text-[34px] lg:!leading-tight">
          {HOW_IT_WORKS.title}
        </SubHeading>
        <ol className="mt-5 grid gap-4">
          {HOW_IT_WORKS.steps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[auto_1fr] items-start gap-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-green font-bold text-white-color">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-card-heading">{step.title}</p>
                <CardDescSm>{step.text}</CardDescSm>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center gap-4">
          <QrCode value={GIVE_QR.url} label={GIVE_QR.title} size={88} />
          <div>
            <p className="text-sm font-bold text-primary-green">
              {GIVE_QR.title}
            </p>
            <CardDescSm>{GIVE_QR.text}</CardDescSm>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-primary-green/10 bg-white-color/70 p-5">
        <div className="flex items-center gap-3">
          <GiveIcons
            name="info"
            className="h-7 w-7 text-primary-green [&>svg]:h-full [&>svg]:w-full"
          />
          <p className="font-heading text-xl font-semibold text-card-heading">
            {GIVING_PROCESS.infoTitle}
          </p>
        </div>
        <ul className="mt-4 grid gap-2">
          {GIVING_PROCESS.importantInfo.map((info) => (
            <li key={info} className="grid grid-cols-[auto_1fr] gap-2">
              <GiveIcons
                name="check"
                className="mt-0.5 h-4 w-4 text-primary-green [&>svg]:h-full [&>svg]:w-full"
              />
              <CardDescSm className="!text-text-dark">{info}</CardDescSm>
            </li>
          ))}
        </ul>
      </div>

      <NeedAssistanceCard />
    </div>
  </section>
);

export default GivingProcessSection;
