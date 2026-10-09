import ButtonSm from "@/components/button/ButtonSm";
import FooterIcons from "@/components/icons/FooterIcons";
import FooterHeading from "@/components/pages/typography/FooterHeading";
import FooterText from "@/components/pages/typography/FooterText";
import { FOOTER_CONTACT } from "@/constant/footerData";

const FooterContact = () => (
  <div>
    <FooterHeading>{FOOTER_CONTACT.heading}</FooterHeading>
    <FooterText className="mt-2">{FOOTER_CONTACT.intro}</FooterText>

    <ul className="mt-4 space-y-3.5">
      {FOOTER_CONTACT.items.map(({ icon, lines }) => (
        <li key={lines[0]} className="flex items-start gap-3">
          <FooterIcons
            name={icon}
            className="mt-0.5 shrink-0 text-gold-bright"
          />
          <div>
            {lines.map((line) => (
              <FooterText key={line} className="!leading-[1.5]">
                {line}
              </FooterText>
            ))}
          </div>
        </li>
      ))}
    </ul>

    <div className="mt-5">
      <ButtonSm
        url={FOOTER_CONTACT.cta.url}
        text={FOOTER_CONTACT.cta.text}
        bgColor="var(--gold-bright)"
        textColor="var(--primary-green-deep)"
        className="w-full !rounded-lg"
        icon={<FooterIcons name="mail" className="[&>svg]:h-5 [&>svg]:w-5" />}
      />
    </div>
  </div>
);

export default FooterContact;
