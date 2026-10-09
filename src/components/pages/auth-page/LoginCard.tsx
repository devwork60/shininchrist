import Image from "next/image";
import Link from "next/link";
import GoogleSignInButton from "@/components/common-components/GoogleSignInButton";
import AuthIcons from "@/components/icons/AuthIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { LOGIN_PAGE } from "@/constant/authData";

interface LoginCardProps {
  next?: string;
  failed?: boolean;
}

const LoginCard = ({ next = "/account", failed = false }: LoginCardProps) => (
  <section className="bg-cream py-10 lg:py-16">
    <div className="wrapper grid overflow-hidden rounded-2xl border border-primary-gold/20 bg-white-color shadow-sm lg:grid-cols-[1fr_1.1fr]">
      <div className="relative hidden bg-primary-green-deep p-10 text-white-color lg:flex lg:flex-col lg:justify-between">
        <Image
          src="/images/logo-transparent.png"
          alt="ShininChrist"
          width={1665}
          height={265}
          className="h-12 w-auto self-start brightness-[1.35] saturate-[1.2]"
        />
        <div>
          <p className="font-heading text-3xl leading-snug">
            {LOGIN_PAGE.panelTitle}
          </p>
          <span
            aria-hidden="true"
            className="mt-5 block h-1 w-14 bg-gold-bright"
          />
          <ul className="mt-6 grid gap-3">
            {LOGIN_PAGE.panelItems.map((item) => (
              <li
                key={item}
                className="grid grid-cols-[auto_1fr] items-center gap-3 text-sm"
              >
                <AuthIcons
                  name="check"
                  className="h-5 w-5 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 sm:p-10 lg:p-14">
        <MainHeading className="!text-[28px] !text-primary-green lg:!text-[34px] lg:!leading-tight">
          {LOGIN_PAGE.title}
        </MainHeading>
        <CardDescSm className="mt-2 !text-base">
          {LOGIN_PAGE.subtitle}
        </CardDescSm>

        <div className="mt-8">
          <GoogleSignInButton text={LOGIN_PAGE.google} next={next} />
          {failed && (
            <p role="alert" className="mt-3 text-sm text-red-700">
              Sign-in did not finish. Please try again.
            </p>
          )}
        </div>

        <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-text-grey">
          <span className="h-px flex-1 bg-primary-green/15" />
          {LOGIN_PAGE.divider}
          <span className="h-px flex-1 bg-primary-green/15" />
        </div>

        <ul className="mt-5 grid gap-3">
          {LOGIN_PAGE.notes.map((note) => (
            <li key={note} className="grid grid-cols-[auto_1fr] gap-3">
              <AuthIcons
                name="shield"
                className="mt-0.5 h-5 w-5 text-primary-green [&>svg]:h-full [&>svg]:w-full"
              />
              <CardDescSm className="!text-text-dark">{note}</CardDescSm>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-text-dark">
          {LOGIN_PAGE.joinPrompt}{" "}
          <Link
            href={LOGIN_PAGE.join.url}
            className="font-semibold text-primary-gold underline-offset-4 hover:underline"
          >
            {LOGIN_PAGE.join.text}
          </Link>
        </p>
      </div>
    </div>
  </section>
);

export default LoginCard;
