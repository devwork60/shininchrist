import Link from "next/link";
import clsx from "clsx";
import ApplicationForm from "@/components/common-components/application-form/ApplicationForm";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import type { FormConfig } from "@/constant/forms/formTypes";

interface LinkItem {
  label: string;
  href: string;
}

interface FormPageShellProps {
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  breadcrumb: LinkItem[];
  config: FormConfig;
  /** Tabs switch between sibling forms (e.g. Time / Skills / Prayer). */
  tabs?: LinkItem[];
  /** "Other ways to ..." links shown under the form. */
  related?: { title: string; links: LinkItem[] };
}

/** Shared layout for the Serve and Give form pages: green hero, optional tabs, form, related links. */
const FormPageShell = ({
  eyebrow,
  heroTitle,
  heroText,
  breadcrumb,
  config,
  tabs,
  related,
}: FormPageShellProps) => (
  <main className="flex-1 bg-cream">
    <section className="bg-primary-green-deep text-white-color">
      <div className="wrapper py-10 lg:py-14">
        <div className="[&_a]:text-white-color/70 [&_li>span]:text-gold-bright">
          <Breadcrumb items={breadcrumb} />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-bright">
          {eyebrow}
        </p>
        <HeroHeading compact className="mt-2">
          {heroTitle}
        </HeroHeading>
        <span
          aria-hidden="true"
          className="mt-4 block h-1 w-14 bg-gold-bright"
        />
        <Paragraph className="mt-4 max-w-2xl !text-white-color/90 lg:!text-lg lg:!leading-8">
          {heroText}
        </Paragraph>
      </div>
    </section>

    <div className="wrapper-narrow py-8 lg:py-12">
      {tabs && (
        <nav
          aria-label="Ways to volunteer"
          className="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-3"
        >
          {tabs.map(({ label, href }) => {
            const active = href === breadcrumb[breadcrumb.length - 1].href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "rounded-md border px-4 py-3 text-center text-sm font-semibold transition-colors",
                  active
                    ? "border-primary-green bg-primary-green text-white-color"
                    : "border-primary-green/25 bg-white-color text-text-dark hover:border-primary-gold hover:text-primary-gold",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}

      <ApplicationForm config={config} />

      {related && (
        <div className="mt-10 rounded-xl border border-primary-gold/25 bg-white-color/70 p-6">
          <h2 className="font-heading text-xl font-semibold text-primary-green">
            {related.title}
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {related.links.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-semibold text-primary-gold underline-offset-4 hover:underline"
                >
                  {label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </main>
);

export default FormPageShell;
