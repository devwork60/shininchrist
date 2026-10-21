import type { Metadata } from "next";
import Link from "next/link";
import SimpleHero from "@/components/common-components/SimpleHero";

export const metadata: Metadata = {
  alternates: { canonical: "/accessibility" },
  title: "Accessibility Statement | ShininChrist",
  description:
    "ShininChrist accessibility statement: our ongoing commitment to ensuring digital access for all people regardless of ability.",
};

export default function AccessibilityPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Accessibility", "Statement"]}
        taglineLines={[
          "Ensuring every person, regardless of physical or cognitive",
          "ability, can engage with the Word of God and our community.",
        ]}
        image="/images/daily-hero-v2.webp"
      />

      <div className="wrapper py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-stone-200 bg-white-color p-8 shadow-sm md:p-12">
          <div className="border-b border-stone-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-bright">
              Accessibility Standards
            </span>
            <h2 className="mt-2 text-2xl font-bold text-black-color md:text-3xl">
              Digital Inclusion for All
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              At ShininChrist, we believe the gospel is for every soul. We strive to provide a digital platform
              that is accessible to individuals of all abilities and compatible with modern assistive technologies.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">1. Standards & Conformance</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              We work to conform with the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
              These guidelines define how to make web content accessible for people with visual, auditory, motor,
              or cognitive disabilities.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">2. Measures Taken Across Our Platform</h3>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-stone-700">
              <li><strong>Semantic HTML:</strong> Proper heading hierarchy (single H1 per page, sequential H2/H3 tags) for screen readers.</li>
              <li><strong>Color Contrast:</strong> High-contrast color combinations across text and brand accents to assist low-vision readers.</li>
              <li><strong>Keyboard Navigation:</strong> Focus indicators, logical tab ordering, and escape key handling on modals and menus.</li>
              <li><strong>Alternative Text:</strong> Descriptive alt attributes for photos and media where informative context is needed.</li>
              <li><strong>Responsive Design:</strong> Fluid typography and layouts preventing horizontal scrolling across devices down to 360px widths.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">3. Continuous Improvement</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Web accessibility is an ongoing effort. As we continue expanding the ShininChrist Academy, video and audio streaming,
              and interactive chapter portals, we regularly audit features for usability and compliance.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">4. Feedback & Reporting Issues</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              If you experience any barrier accessing content or using assistive software on our site, please let us know:
            </p>
            <div className="mt-2 rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <p className="text-sm text-stone-700">
                Email: <span className="font-semibold text-primary-green">info@shininchrist.org</span> (Subject: [ACCESSIBILITY])
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Or submit a detailed report via our{" "}
                <Link href="/report-an-issue" className="font-semibold text-primary-green hover:underline">
                  Report an Issue
                </Link>{" "}
                page. We treat accessibility feedback with high priority.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
