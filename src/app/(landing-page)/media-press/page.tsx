import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SimpleHero from "@/components/common-components/SimpleHero";
import SectionHeader from "@/components/common-components/SectionHeader";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";

export const metadata: Metadata = {
  alternates: { canonical: "/media-press" },
  title: "Media & Press | ShininChrist",
  description:
    "Official media kit, press releases, ministry overview, and media contact information for ShininChrist and Evangelist Mercy.",
};

export default function MediaPressPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Media & Press", "Center"]}
        taglineLines={[
          "Official news, media resources, brand assets,",
          "and ministry press information for ShininChrist.",
        ]}
        image="/images/daily-hero-v2.webp"
      />

      <div className="wrapper py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            title="Ministry Overview & Press Guidelines"
            description="Sharing the light of Christ across nations and media."
            variant="label"
          />

          {/* Ministry Boilerplate */}
          <div className="mt-8 rounded-3xl border border-stone-200 bg-white-color p-8 shadow-sm md:p-10">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-bright">
              Official Boilerplate
            </span>
            <h3 className="mt-2 text-xl font-bold text-black-color md:text-2xl">
              About ShininChrist
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700 md:text-base">
              ShininChrist is a global ministry, community, and compassionate nonprofit organization
              advancing the gospel of Jesus Christ through spiritual, educational, and cultural literacy,
              Christian fellowship, compassionate service, media, and practical community resources.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-700 md:text-base">
              Rooted in the fourfold framework — <em>In My Heart. In My Home. In My Community. In My Nation.</em> —
              and guided by the motto <strong>“Shining Christ in our Hearts, Homes, Communities, and Nations,”</strong>
              the ministry serves men, women, and youth through dedicated chapters, daily faith formation, the ShininChrist Academy,
              and C.A.R.E. compassionate outreach initiatives.
            </p>
          </div>

          {/* Founder Profile */}
          <div className="mt-8 grid gap-8 rounded-3xl border border-stone-200 bg-stone-50 p-8 md:grid-cols-12 md:items-center md:p-10">
            <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-2xl md:col-span-4 md:w-full">
              <Image
                src="/images/about/founder-portrait.webp"
                alt="Evangelist Georgia 'Mercy' Nnabuihe"
                fill
                sizes="(min-width: 768px) 30vw, 192px"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-8">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-green">
                Founder & Lead Evangelist
              </span>
              <h3 className="mt-1 text-xl font-bold text-black-color md:text-2xl">
                Georgia “Mercy” Nnabuihe
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 md:text-sm">
                Evangelist Mercy is an author, educator, ordained servant of God, and founder of ShininChrist.
                Her message centers on sincere discipleship, the transformative power of the Holy Spirit,
                holy living, and compassionate service to those in need.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/about/founder"
                  className="rounded-full bg-primary-green px-5 py-2 text-xs font-semibold text-white-color hover:bg-primary-green-deep"
                >
                  Read Full Biography
                </Link>
                <Link
                  href="/about/invite-mercy"
                  className="rounded-full border border-stone-300 bg-white-color px-5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100"
                >
                  Invite Mercy to Speak
                </Link>
              </div>
            </div>
          </div>

          {/* Media Kit & Logo Usage Guidelines */}
          <div className="mt-8 rounded-3xl border border-stone-200 bg-white-color p-8 shadow-sm md:p-10">
            <h3 className="text-lg font-bold text-black-color md:text-xl">
              Brand Assets & Logo Integrity
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600 md:text-sm">
              The ShininChrist name and emblem represent our sacred commitment to Jesus Christ and the community.
              When featuring ShininChrist in broadcast, print, or digital media:
            </p>
            <ul className="mt-4 space-y-2 text-xs text-stone-700 md:text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold text-gold-bright">•</span>
                <span><strong>Always write &ldquo;ShininChrist&rdquo;</strong> in CamelCase with no space, never all-caps.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-gold-bright">•</span>
                <span><strong>Use the exact supplied emblem</strong> without altering colors, cropping, or skewing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-gold-bright">•</span>
                <span>Maintain clear space around the emblem equal to at least half the emblem width.</span>
              </li>
            </ul>
          </div>

          {/* Media Contact Box */}
          <div className="mt-8 rounded-3xl bg-primary-green p-8 text-white-color md:p-10">
            <h3 className="text-xl font-bold text-white-color">Press Inquiries & Media Requests</h3>
            <p className="mt-2 text-xs text-stone-200 md:text-sm">
              For interviews, statements, event credentials, or media requests, please contact our media team:
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-gold-bright">
              <span>Email: info@shininchrist.org</span>
              <span>•</span>
              <span>Subject: [MEDIA INQUIRY]</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
