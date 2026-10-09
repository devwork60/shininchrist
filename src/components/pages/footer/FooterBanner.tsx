import { FOOTER_BANNER } from "@/constant/footerData";

const FooterBanner = () => (
  <div className="bg-[linear-gradient(90deg,#b88a1c_0%,#ecd079_18%,#c99a2e_40%,#e8c866_62%,#c99a2e_82%,#e6c35f_100%)] text-[#1b1608]">
    <div className="wrapper-wide flex flex-col items-start gap-2 py-3 text-left lg:flex-row lg:items-center lg:justify-between lg:py-3.5">
      <div>
        <p className="text-base font-extrabold uppercase tracking-[0.5px] sm:text-xl lg:text-[26px] lg:leading-tight">
          {FOOTER_BANNER.title}
        </p>
        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.3em] sm:text-xs lg:text-[13px]">
          {FOOTER_BANNER.subtitle}
        </p>
      </div>
      <ul className="flex items-center justify-start whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide lg:justify-end lg:text-[13px]">
        {FOOTER_BANNER.tags.map((tag) => (
          <li
            key={tag}
            className="px-2 first:pl-0 lg:first:pl-2 not-first:border-l not-first:border-[#1b1608]/60"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FooterBanner;
