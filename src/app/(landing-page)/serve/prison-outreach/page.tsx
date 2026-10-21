import type { Metadata } from "next";
import Link from "next/link";
import SimpleHero from "@/components/common-components/SimpleHero";
import SectionHeader from "@/components/common-components/SectionHeader";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";

export const metadata: Metadata = {
  alternates: { canonical: "/serve/prison-outreach" },
  title: "Prison Outreach Ministry | ShininChrist",
  description:
    "Bringing the transformative hope, love, and salvation of Jesus Christ to incarcerated individuals, correctional facilities, and their families.",
};

const PILLARS = [
  {
    title: "Bibles & Literature Distribution",
    desc: "Providing approved Bibles, daily faith formation guides, Christian books, and study resources to inmates seeking Christ.",
  },
  {
    title: "Spiritual Mentorship & Prayer",
    desc: "Trained, vetted chaplains and volunteers providing biblical counseling, intercessory prayer, and discipleship behind bars.",
  },
  {
    title: "Family Care & Encouragement",
    desc: "Extending the compassion of Christ to the families, spouses, and children of incarcerated persons during separation.",
  },
  {
    title: "Restoration & Re-Entry Support",
    desc: "Helping returning citizens rebuild their lives upon release through faith community, moral support, and practical life skills.",
  },
];

export default function PrisonOutreachPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Prison Outreach", "Ministry"]}
        taglineLines={[
          "“I was in prison and you came to visit me.” — Matthew 25:36",
          "Sharing hope, repentance, and redemption where it is needed most.",
        ]}
        image="/images/serve/v2-way-field.webp"
      />

      <div className="wrapper py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Redeeming Lives Through Christ"
            description="No soul is beyond the reach of God’s grace."
            variant="label"
          />

          <div className="mt-8 rounded-3xl border border-stone-200 bg-white-color p-8 shadow-sm md:p-10">
            <h3 className="text-xl font-bold text-black-color md:text-2xl">
              Our Mission in Prison Outreach
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700 md:text-base">
              At ShininChrist, we believe the gospel has the supernatural power to transform hearts,
              break spiritual chains, and restore dignity to any person who repents and turns to Jesus Christ.
              Our prison ministry teams work with approved correctional facilities to deliver biblical literacy,
              pastoral care, and authentic Christian love.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-stone-200 bg-white-color p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-bright/15 text-stone-800 font-bold">
                  ✓
                </div>
                <h4 className="mt-4 text-base font-bold text-black-color md:text-lg">
                  {p.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 md:text-sm">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Eligibility Note from Approved Guidelines */}
          <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50/60 p-8 text-stone-800">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-900">
              Important Eligibility Notice
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-stone-700 md:text-sm">
              In accordance with ShininChrist ministry guidelines, all individuals seeking to serve on
              prison outreach or field missions must be <strong>born-again Christians of proven godly character</strong>,
              submit verifiable character references, and successfully complete correctional facility background checks
              and safeguarding training before being authorized to represent ShininChrist.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-12 rounded-3xl bg-primary-green p-8 text-white-color md:p-10">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-white-color md:text-2xl">
                  Get Involved with Prison Ministry
                </h3>
                <p className="mt-2 max-w-xl text-xs text-stone-200 md:text-sm">
                  Whether you wish to serve in the field, join our intercessory prayer network, or donate Bibles, your participation brings light into dark places.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
                <Link
                  href="/serve/volunteer"
                  className="rounded-full bg-gold-bright px-6 py-3 text-xs font-semibold text-black-color shadow transition hover:bg-gold-bright/90 md:text-sm"
                >
                  Apply to Volunteer
                </Link>
                <Link
                  href="/serve/donate-in-kind"
                  className="rounded-full border border-white-color/30 bg-white-color/10 px-6 py-3 text-xs font-semibold text-white-color transition hover:bg-white-color/20 md:text-sm"
                >
                  Donate Bibles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
