import type { Metadata } from "next";
import Link from "next/link";
import SimpleHero from "@/components/common-components/SimpleHero";
import SectionHeader from "@/components/common-components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/site-map" },
  title: "Site Map | ShininChrist",
  description: "Complete index of all public pages, programs, and resources across the ShininChrist website.",
};

const SECTIONS = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About ShininChrist", href: "/about" },
      { label: "Meet the Founder", href: "/about/founder" },
      { label: "Invite Mercy to Speak", href: "/about/invite-mercy" },
      { label: "Join ShininChrist", href: "/join" },
      { label: "Member Login", href: "/login" },
      { label: "Site Search", href: "/search" },
    ],
  },
  {
    title: "Chapters & Daily",
    links: [
      { label: "Chapters Overview", href: "/chapters" },
      { label: "Men's Chapter", href: "/chapters/men" },
      { label: "Women's Chapter", href: "/chapters/women" },
      { label: "Youth Chapter", href: "/chapters/youth" },
      { label: "ShininChrist Daily", href: "/daily" },
      { label: "Daily — Today (Public)", href: "/daily/today" },
      { label: "Daily — This Week (Members)", href: "/daily/this-week" },
      { label: "Daily — Archive (Members)", href: "/daily/archive" },
    ],
  },
  {
    title: "Academy & Resources",
    links: [
      { label: "Academy Overview", href: "/academy" },
      { label: "Courses & Fields of Learning", href: "/academy/courses" },
      { label: "Examination Assessments", href: "/academy/assessments" },
      { label: "Teachers & Educators", href: "/academy/teachers" },
      { label: "Learner Support", href: "/academy/learner-support" },
      { label: "ShininChrist Library", href: "/library" },
      { label: "Store", href: "/store" },
    ],
  },
  {
    title: "Serve & Give",
    links: [
      { label: "Serve Overview", href: "/serve" },
      { label: "Volunteer Your Time", href: "/serve/volunteer" },
      { label: "Share Your Skills", href: "/serve/skills" },
      { label: "Serve in Prayer", href: "/serve/prayer" },
      { label: "Serve in the Field", href: "/serve/field-missions" },
      { label: "Prison Outreach", href: "/serve/prison-outreach" },
      { label: "Community Impact (C.A.R.E.)", href: "/serve/community-impact" },
      { label: "Partner With Us", href: "/serve/partner" },
      { label: "Donate In-Kind", href: "/serve/donate-in-kind" },
      { label: "Give Overview", href: "/give" },
      { label: "Give Financially", href: "/give/financially" },
      { label: "Give Property & Major Assets", href: "/give/property-assets" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Frequently Asked Questions (FAQ)", href: "/faqs" },
      { label: "Technical Support", href: "/support" },
      { label: "Report an Issue", href: "/report-an-issue" },
      { label: "Media & Press", href: "/media-press" },
      { label: "Partnership Inquiries", href: "/partnership-inquiries" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Accessibility Statement", href: "/accessibility" },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Website", "Directory"]}
        taglineLines={[
          "A structured navigation index of all public resources,",
          "ministry programs, and faith formation pages.",
        ]}
        image="/images/daily-hero-v2.webp"
      />

      <div className="wrapper py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Complete Site Map"
            description="Explore every part of the ShininChrist ministry."
            variant="label"
          />

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((sec) => (
              <div
                key={sec.title}
                className="rounded-3xl border border-stone-200 bg-white-color p-6 shadow-sm"
              >
                <h3 className="border-b border-stone-100 pb-3 text-base font-bold text-primary-green">
                  {sec.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {sec.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-stone-700 transition hover:text-gold-bright hover:underline md:text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
