import Image from "next/image";
import Link from "next/link";
import FooterText from "@/components/pages/typography/FooterText";
import { FOOTER_BRAND } from "@/constant/footerData";

const FooterBrand = () => (
  <div>
    <Link href="/" aria-label="ShininChrist home" className="inline-block">
      <Image
        src="/images/logo-transparent.png"
        alt="ShininChrist"
        width={1665}
        height={265}
        className="h-14 w-auto brightness-[1.35] saturate-[1.2] sm:h-16 xl:h-[68px]"
      />
    </Link>

    <p className="mt-4 max-w-[330px] font-heading text-xl leading-snug text-white-color sm:text-[22px]">
      {FOOTER_BRAND.motto}
    </p>
    <span aria-hidden="true" className="mt-4 block h-0.5 w-12 bg-gold-bright" />

    <FooterText className="mt-4 max-w-[330px]">
      {FOOTER_BRAND.description}
    </FooterText>

    <p className="mt-6 font-script text-3xl text-gold-bright">
      {FOOTER_BRAND.script}
    </p>
  </div>
);

export default FooterBrand;
