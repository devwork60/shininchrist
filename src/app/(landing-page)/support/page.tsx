import type { Metadata } from "next";
import Link from "next/link";
import SimpleHero from "@/components/common-components/SimpleHero";
import SectionHeader from "@/components/common-components/SectionHeader";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";

export const metadata: Metadata = {
  alternates: { canonical: "/support" },
  title: "Technical Support | ShininChrist",
  description:
    "Get technical assistance with account login, Google authentication, membership verification, uniform orders, and library access.",
};

const TROUBLESHOOTING_CARDS = [
  {
    icon: (
      <svg className="h-6 w-6 text-primary-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Google Sign-in & Login",
    description:
      "Signing in authenticates your identity. If you experience an authentication loop or cannot sign in, clear your browser cookies or try in an Incognito window.",
    linkText: "Learn about Accounts",
    href: "/faqs",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-gold-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Pending Membership Status",
    description:
      "Your membership activates once YouTube subscription proof, parental consent (if under 18), and uniform payment are reviewed and verified by administrators.",
    linkText: "Check Join Status",
    href: "/join",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-primary-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Library Protected Access",
    description:
      "The Library is a protected resource center for ACTIVE members. Public visitors can preview resources, while downloads and studies unlock upon member activation.",
    linkText: "Visit Library",
    href: "/library",
  },
  {
    icon: (
      <svg className="h-6 w-6 text-gold-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: "Uniform Payments & Delivery",
    description:
      "Online payments through Paystack and direct bank transfers are tracked securely. You do not need to wait for physical delivery to receive digital member access.",
    linkText: "Payment FAQs",
    href: "/faqs",
  },
];

export default function SupportPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Technical", "Support"]}
        taglineLines={[
          "Need help with your account, login, or website features?",
          "Find fast answers or submit a support inquiry.",
        ]}
        image="/images/daily-hero-v2.webp"
      />

      <div className="wrapper py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Common Technical Topics"
            description="Prompt assistance to keep you connected."
            variant="label"
          />

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {TROUBLESHOOTING_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-stone-200 bg-white-color p-6 shadow-sm transition hover:border-gold-bright hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100">
                  {card.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-black-color md:text-lg">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 md:text-sm">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-4 inline-flex items-center text-xs font-semibold text-primary-green hover:underline"
                >
                  {card.linkText} →
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Support Actions */}
          <div className="mt-12 rounded-3xl border border-stone-200 bg-stone-50 p-8 md:p-10">
            <div className="text-center">
              <h3 className="text-xl font-bold text-black-color md:text-2xl">
                Still Experiencing An Issue?
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-stone-600 md:text-sm">
                Our support team is ready to investigate. You can report a bug directly,
                consult the full Knowledge Base FAQ, or send a general support ticket.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/report-an-issue"
                  className="rounded-full bg-primary-green px-6 py-3 text-xs font-semibold text-white-color transition hover:bg-primary-green-deep md:text-sm"
                >
                  Report an Issue
                </Link>
                <Link
                  href="/faqs"
                  className="rounded-full border border-stone-300 bg-white-color px-6 py-3 text-xs font-semibold text-stone-700 transition hover:bg-stone-100 md:text-sm"
                >
                  Browse FAQs
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full bg-gold-bright px-6 py-3 text-xs font-semibold text-black-color transition hover:bg-gold-bright/90 md:text-sm"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
