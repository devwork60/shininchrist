import Link from "next/link";
import FooterIcons from "@/components/icons/FooterIcons";
import FooterHeading from "@/components/pages/typography/FooterHeading";
import type { FooterLink } from "@/constant/footerData";

interface FooterLinkColumnProps {
  title: string;
  links: FooterLink[];
}

/** Reusable titled list of links (Explore, Get Involved, Support). */
const FooterLinkColumn = ({ title, links }: FooterLinkColumnProps) => (
  <nav aria-label={title}>
    <FooterHeading>{title}</FooterHeading>
    <ul className="mt-4 space-y-2.5">
      {links.map(({ label, href, hasMenu }) => (
        <li key={label}>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-white-color/90 transition-colors hover:text-gold-bright lg:text-[15px]"
          >
            {label}
            {hasMenu && <FooterIcons name="chevron" />}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default FooterLinkColumn;
