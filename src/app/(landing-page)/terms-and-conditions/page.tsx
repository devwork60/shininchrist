import type { Metadata } from "next";
import SimpleHero from "@/components/common-components/SimpleHero";

export const metadata: Metadata = {
  alternates: { canonical: "/terms-and-conditions" },
  title: "Terms and Conditions | ShininChrist",
  description:
    "Terms of use and member guidelines governing access to the ShininChrist platform, Academy, Library, and community experiences.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Terms &", "Conditions"]}
        taglineLines={[
          "Guidelines for our global community, membership conduct,",
          "and respectful engagement on the ShininChrist platform.",
        ]}
        image="/images/daily-hero-v2.webp"
      />

      <div className="wrapper py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border border-stone-200 bg-white-color p-8 shadow-sm md:p-12">
          <div className="border-b border-stone-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-bright">
              Effective Date: October 2026
            </span>
            <h2 className="mt-2 text-2xl font-bold text-black-color md:text-3xl">
              Platform Terms of Use
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              By accessing, browsing, or registering on ShininChrist (shininchrist.org), you agree to comply with
              these terms, our Statement of Faith, and our community standards.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">1. Community Purpose & Conduct</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              ShininChrist exists to advance the gospel of Jesus Christ and foster spiritual, educational, and cultural literacy.
              Members and visitors agree to interact with charity, honor, and truth. Content that is profane, abusive, harassing,
              defamatory, fraudulent, or inconsistent with biblical standards of conduct is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">2. Membership & Verification</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Creating an account establishes identity within our database but does not automatically grant active membership privileges.
              Active membership requires completion of the registration checklist, parental consent for minors, YouTube verification,
              uniform order fulfillment, and administrative approval. ShininChrist reserves the right to suspend or revoke membership
              for actions that compromise the safety, integrity, or mission of the ministry.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">3. Intellectual Property & Library Materials</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              All audio devotionals, teachings, books, Academy curriculum, logos, trademarks, and media provided on ShininChrist
              are the proprietary intellectual property of ShininChrist and Evangelist Georgia “Mercy” Nnabuihe.
              Materials downloaded from the member Library are licensed for personal, non-commercial spiritual formation and must not be
              redistributed, sold, or modified without prior written authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">4. Service & Outreach Representation</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Submitting an application to volunteer, teach in the Academy, or serve in field missions does not constitute formal appointment.
              No individual may represent themselves as an authorized ShininChrist teacher, minister, or representative until formal written
              approval, credential verification, and orientation have been finalized.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">5. Modifications</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              We may update these terms periodically to reflect ministry developments. Continued use of the platform constitutes
              acceptance of any revised guidelines.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
