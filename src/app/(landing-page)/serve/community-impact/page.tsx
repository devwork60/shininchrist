import type { Metadata } from "next";
import Link from "next/link";
import SimpleHero from "@/components/common-components/SimpleHero";
import SectionHeader from "@/components/common-components/SectionHeader";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";

export const metadata: Metadata = {
  alternates: { canonical: "/serve/community-impact" },
  title: "Community Impact (C.A.R.E.) | ShininChrist",
  description:
    "ShininChrist Compassion, Assistance, Restoration, and Encouragement (C.A.R.E.) initiatives transforming local communities through Christ.",
};

const CARE_PILLARS = [
  {
    letter: "C",
    title: "Compassion",
    desc: "Demonstrating Christ’s tender love to the hurting, hungry, and marginalized without prejudice or judgment.",
  },
  {
    letter: "A",
    title: "Assistance",
    desc: "Distributing food packages, educational materials, medical essentials, and practical relief to families in need.",
  },
  {
    letter: "R",
    title: "Restoration",
    desc: "Fostering long-term spiritual growth, dignity, literacy, and community wholeness grounded in biblical truth.",
  },
  {
    letter: "E",
    title: "Encouragement",
    desc: "Uplifting hearts through prayer, chapter fellowship, mentorship, and building enduring bonds of Christian sisterhood and brotherhood.",
  },
];

const INITIATIVES = [
  {
    title: "Food Relief & Nutritional Support",
    desc: "Providing staple food items and clean water to underserved households and families facing acute hardship.",
  },
  {
    title: "Educational & Back-to-School Drives",
    desc: "Equipping young learners with exercise books, textbooks, pens, backpacks, and exam-prep materials through our Academy.",
  },
  {
    title: "Community Clean-Up & Environment",
    desc: "Mobilizing youth and adult chapters to beautify local neighborhoods, clear public spaces, and model godly civic responsibility.",
  },
  {
    title: "Elderly & Vulnerable Care",
    desc: "Visiting homebound seniors, widows, and vulnerable community members with grocery care packages, companionship, and prayer.",
  },
];

export default function CommunityImpactPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Community", "Impact (C.A.R.E.)"]}
        taglineLines={[
          "Compassion · Assistance · Restoration · Encouragement",
          "Putting faith into active practice in our neighborhoods and nations.",
        ]}
        image="/images/daily-hero-v2.webp"
      />

      <div className="wrapper py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="The C.A.R.E. Foundation"
            description="In My Heart. In My Home. In My Community. In My Nation."
            variant="label"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {CARE_PILLARS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-200 bg-white-color p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-green text-xl font-bold text-white-color">
                  {item.letter}
                </div>
                <h4 className="mt-4 text-base font-bold text-black-color">{item.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-black-color md:text-2xl">
              Active Community Initiatives
            </h3>
            <p className="mt-2 text-xs text-stone-600 md:text-sm">
              ShininChrist chapters partner with local leaders, churches, and volunteers to address tangible challenges:
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {INITIATIVES.map((init) => (
                <div
                  key={init.title}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-6"
                >
                  <h4 className="text-base font-bold text-black-color">{init.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600 md:text-sm">
                    {init.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-12 rounded-3xl bg-primary-green p-8 text-white-color md:p-10">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-white-color md:text-2xl">
                  Make a Real Difference Today
                </h3>
                <p className="mt-2 max-w-xl text-xs text-stone-200 md:text-sm">
                  Whether you have an hour to volunteer, supplies to share, or a desire to organize an outreach in your community, we invite you to join us.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
                <Link
                  href="/serve/volunteer"
                  className="rounded-full bg-gold-bright px-6 py-3 text-xs font-semibold text-black-color shadow transition hover:bg-gold-bright/90 md:text-sm"
                >
                  Join Community Team
                </Link>
                <Link
                  href="/serve/donate-in-kind"
                  className="rounded-full border border-white-color/30 bg-white-color/10 px-6 py-3 text-xs font-semibold text-white-color transition hover:bg-white-color/20 md:text-sm"
                >
                  Donate Supplies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
