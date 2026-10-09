import Image from "next/image";
import Link from "next/link";
import ButtonOutline from "@/components/button/ButtonOutline";
import ButtonSm from "@/components/button/ButtonSm";
import AboutIcons from "@/components/icons/AboutIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardHeading from "@/components/pages/typography/CardHeading";
import { INVITE_SIDEBAR as side } from "@/constant/inviteMercyData";

const panel = "rounded-xl border border-primary-green/10 bg-white-color/70 p-5";

const InviteSidebar = () => (
  <aside className="grid content-start gap-5">
    <div className={panel}>
      <CardHeading className="!text-xl !text-primary-green">
        {side.founderTitle}
      </CardHeading>
      <div className="mt-3 grid grid-cols-[80px_1fr] items-center gap-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-primary-gold/50">
          <Image
            src={side.founderImage}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-heading text-sm font-semibold leading-tight text-card-heading">
            {side.founderName.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <CardDescSm className="mt-1 !text-xs !leading-4">
            {side.founderRoles}
          </CardDescSm>
        </div>
      </div>
      <CardDescSm className="mt-3 !text-text-dark">
        {side.founderText}
      </CardDescSm>
      <div className="mt-4 grid">
        <ButtonSm
          url={side.cta.url}
          text={side.cta.text}
          bgColor="var(--primary-green)"
          textColor="var(--white-color)"
          shape="rounded"
          icon={
            <AboutIcons
              name="people"
              className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
            />
          }
        />
      </div>
    </div>

    <div className={panel}>
      <CardHeading className="!text-xl !text-primary-green">
        {side.relatedTitle}
      </CardHeading>
      <ul className="mt-3 grid gap-3">
        {side.related.map(({ icon, text, url }) => (
          <li key={text}>
            <Link
              href={url}
              className="grid grid-cols-[auto_1fr] items-center gap-3 text-sm font-medium text-text-dark transition-colors hover:text-primary-gold"
            >
              <AboutIcons
                name={icon}
                className="h-6 w-6 text-primary-green [&>svg]:h-full [&>svg]:w-full"
              />
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    <div className={panel}>
      <CardHeading className="!text-xl !text-primary-green">
        {side.reachTitle}
      </CardHeading>
      <CardDescSm className="mt-2">{side.reachText}</CardDescSm>
      <div className="mt-4 grid">
        <ButtonOutline
          url={side.reachCta.url}
          text={side.reachCta.text}
          borderColor="var(--primary-green)"
          shape="rounded"
          icon={
            <AboutIcons
              name="mail"
              className="h-5 w-5 [&>svg]:h-full [&>svg]:w-full"
            />
          }
        />
      </div>
    </div>
  </aside>
);

export default InviteSidebar;
