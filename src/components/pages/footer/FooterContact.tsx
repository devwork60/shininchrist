import ButtonSm from "@/components/button/ButtonSm";
import FooterIcons from "@/components/icons/FooterIcons";
import FooterHeading from "@/components/pages/typography/FooterHeading";
import FooterText from "@/components/pages/typography/FooterText";
import { emailHref, whatsappHref } from "@/constant/contactInfo";
import { FOOTER_CONTACT } from "@/constant/footerData";

interface FooterContactProps {
  email: string;
  whatsapp: string;
}

const LINK =
  "underline-offset-4 transition-colors hover:text-gold-bright hover:underline";

/**
 * The email and WhatsApp number are editable in the admin; the other lines stay as designed.
 * The email opens the mail app and the WhatsApp number opens a WhatsApp chat.
 */
const FooterContact = ({ email, whatsapp }: FooterContactProps) => (
  <div>
    <FooterHeading>{FOOTER_CONTACT.heading}</FooterHeading>
    <FooterText className="mt-2">{FOOTER_CONTACT.intro}</FooterText>

    <ul className="mt-4 space-y-3.5">
      {FOOTER_CONTACT.items.map(({ icon, lines: designLines }) => {
        const lines =
          icon === "mail"
            ? [designLines[0], email]
            : icon === "chat"
              ? [designLines[0], whatsapp]
              : designLines;
        const hrefFor = (index: number) =>
          index === 1 && icon === "mail"
            ? emailHref(email)
            : index === 1 && icon === "chat"
              ? whatsappHref(whatsapp)
              : null;
        return (
          <li key={designLines[0]} className="flex items-start gap-3">
            <FooterIcons
              name={icon}
              className="mt-0.5 shrink-0 text-gold-bright"
            />
            <div>
              {lines.map((line, index) => {
                const href = hrefFor(index);
                return (
                  <FooterText key={line} className="!leading-[1.5] [overflow-wrap:anywhere]">
                    {href ? (
                      <a
                        href={href}
                        className={LINK}
                        {...(icon === "chat"
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {line}
                      </a>
                    ) : (
                      line
                    )}
                  </FooterText>
                );
              })}
            </div>
          </li>
        );
      })}
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
