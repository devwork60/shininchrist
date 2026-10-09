import {
  FOOTER_EXPLORE,
  FOOTER_INVOLVED,
  FOOTER_SUPPORT,
} from "@/constant/footerData";
import FooterBottomBar from "./FooterBottomBar";
import FooterBrand from "./FooterBrand";
import FooterConnect from "./FooterConnect";
import FooterContact from "./FooterContact";
import FooterLinkColumn from "./FooterLinkColumn";

const GOLD_BAND =
  "h-3 bg-[linear-gradient(90deg,#8a6208_0%,#e8c15a_25%,#b07e0a_50%,#e8c15a_75%,#8a6208_100%)] sm:h-4";

const COLUMN = "xl:border-l xl:border-gold-bright/60 xl:pl-6";

const Footer = () => (
  <footer className="bg-primary-green-deep text-white-color">
    <div className="bg-[radial-gradient(ellipse_at_bottom_left,rgba(29,61,46,0.55),transparent_55%)]">
      <div className="wrapper-wide grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.7fr_1.05fr_1.2fr_1.25fr_1.55fr_2.4fr] xl:gap-5 xl:py-14">
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1 xl:pr-4">
          <FooterBrand />
        </div>
        <div className={COLUMN}>
          <FooterLinkColumn title="Explore" links={FOOTER_EXPLORE} />
        </div>
        <div className={COLUMN}>
          <FooterLinkColumn title="Get Involved" links={FOOTER_INVOLVED} />
        </div>
        <div className={COLUMN}>
          <FooterLinkColumn title="Support" links={FOOTER_SUPPORT} />
        </div>
        <div className={COLUMN}>
          <FooterContact />
        </div>
        <div className={COLUMN}>
          <FooterConnect />
        </div>
      </div>
    </div>
    <FooterBottomBar />
    <div aria-hidden="true" className={GOLD_BAND} />
  </footer>
);

export default Footer;
