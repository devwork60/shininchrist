import Link from "next/link";
import FooterText from "@/components/pages/typography/FooterText";
import { FOOTER_BRAND, FOOTER_LEGAL } from "@/constant/footerData";

const FooterBottomBar = () => (
  <div className="border-t border-gold-bright/80 bg-black/25">
    <div className="wrapper-wide flex flex-col items-center gap-4 py-5 lg:flex-row lg:justify-between">
      <FooterText>
        © {new Date().getFullYear()} ShininChrist. All Rights Reserved.
      </FooterText>

      <ul className="grid w-full max-w-md grid-cols-2 gap-y-3 text-center sm:max-w-xl sm:grid-cols-3 lg:flex lg:w-auto lg:max-w-none lg:items-center lg:justify-center">
        {FOOTER_LEGAL.map(({ label, href }) => (
          <li
            key={label}
            className="border-gold-bright/60 lg:px-4 lg:not-first:border-l"
          >
            <Link
              href={href}
              className="text-sm text-white-color/90 transition-colors hover:text-gold-bright"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="font-script text-2xl text-gold-bright">
        {FOOTER_BRAND.script}
      </p>
    </div>
  </div>
);

export default FooterBottomBar;
