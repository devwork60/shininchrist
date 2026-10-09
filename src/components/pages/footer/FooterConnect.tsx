import Link from "next/link";
import SocialIcons from "@/components/icons/SocialIcons";
import FooterHeading from "@/components/pages/typography/FooterHeading";
import FooterText from "@/components/pages/typography/FooterText";
import {
  FOOTER_CONNECT,
  SOCIAL_LINKS,
  TELEGRAM_LINK,
} from "@/constant/footerData";

const FooterConnect = () => (
  <div>
    <FooterHeading>{FOOTER_CONNECT.heading}</FooterHeading>
    <FooterText className="mt-2 max-w-[300px]">
      {FOOTER_CONNECT.intro}
    </FooterText>

    <ul className="mt-5 grid max-w-[340px] grid-cols-5 gap-x-2">
      {SOCIAL_LINKS.filter((link) => link.enabled).map((link) => (
        <li key={link.id}>
          <Link
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 text-[11px] text-white-color/90 transition-opacity hover:opacity-80"
          >
            <SocialIcons
              name={link.icon}
              className="[&>svg]:h-10 [&>svg]:w-10 2xl:[&>svg]:h-[52px] 2xl:[&>svg]:w-[52px]"
            />
            <span className="text-[11px] leading-none">{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>

    <span
      aria-hidden="true"
      className="mx-auto mt-5 block h-0.5 w-14 bg-gold-bright"
    />

    {TELEGRAM_LINK.enabled && (
      <Link
        href={TELEGRAM_LINK.url}
        className="mt-4 flex items-center justify-center gap-3 text-white-color/90"
      >
        <SocialIcons name={TELEGRAM_LINK.icon} />
        <FooterText as="span">{TELEGRAM_LINK.label}</FooterText>
      </Link>
    )}

    <p className="mt-5 text-center font-script text-3xl text-gold-bright">
      “ {FOOTER_CONNECT.quote} ”
    </p>
    <span
      aria-hidden="true"
      className="mx-auto mt-1 block h-0.5 w-28 bg-gold-bright"
    />
  </div>
);

export default FooterConnect;
