import GiveIcons from "@/components/icons/GiveIcons";
import ButtonSm from "@/components/button/ButtonSm";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import { GIVING_PROCESS } from "@/constant/giveData";

const { needAssistance: help } = GIVING_PROCESS;

const NeedAssistanceCard = () => (
  <div className="rounded-xl border border-primary-green/10 bg-white-color/70 p-5">
    <div className="flex items-center gap-3">
      <GiveIcons
        name="headset"
        className="h-10 w-10 shrink-0 text-primary-green [&>svg]:h-full [&>svg]:w-full"
      />
      <div>
        <p className="font-heading text-xl font-semibold text-card-heading">
          {help.title}
        </p>
        <CardDescSm>{help.subtitle}</CardDescSm>
      </div>
    </div>

    <div className="mt-4 grid">
      <ButtonSm
        url={help.cta.url}
        text={help.cta.text}
        bgColor="var(--primary-green)"
        textColor="var(--white-color)"
        shape="rounded"
        iconRight={<span aria-hidden="true">→</span>}
      />
    </div>

    <ul className="mt-4 grid gap-2">
      <li className="grid grid-cols-[auto_1fr] items-center gap-2">
        <GiveIcons
          name="mail"
          className="h-5 w-5 text-primary-green [&>svg]:h-full [&>svg]:w-full"
        />
        <CardDescSm className="!text-text-dark">Email: {help.email}</CardDescSm>
      </li>
      <li className="grid grid-cols-[auto_1fr] items-center gap-2">
        <GiveIcons
          name="chat"
          className="h-5 w-5 text-primary-green [&>svg]:h-full [&>svg]:w-full"
        />
        <CardDescSm className="!text-text-dark">
          WhatsApp: {help.whatsapp}
        </CardDescSm>
      </li>
    </ul>
    <p className="mt-4 font-heading text-sm italic text-text-dark">
      {help.footerText}
    </p>
  </div>
);

export default NeedAssistanceCard;
