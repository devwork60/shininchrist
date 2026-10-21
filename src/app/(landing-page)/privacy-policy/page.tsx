import type { Metadata } from "next";
import SimpleHero from "@/components/common-components/SimpleHero";
import SectionHeader from "@/components/common-components/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy-policy" },
  title: "Privacy Policy | ShininChrist",
  description:
    "ShininChrist privacy policy: how we collect, protect, and respect your personal information, member records, and donation data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Privacy", "Policy"]}
        taglineLines={[
          "Your trust matters to us. We handle your personal",
          "data with strict integrity, privacy, and security.",
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
              ShininChrist Privacy Commitment
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              ShininChrist is committed to protecting your privacy. This policy outlines how we handle
              your information across our website, mobile interfaces, member portals, and services.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">1. Information We Collect</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              We collect information that you voluntarily provide when creating an account, registering
              for membership, submitting a volunteer or prayer application, making a donation, or ordering uniforms:
            </p>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-stone-700">
              <li><strong>Contact Information:</strong> Name, email address, phone/WhatsApp number, country, and city/state.</li>
              <li><strong>Faith Journey & Chapter Choice:</strong> Information you share to help us tailor discipleship and community experiences.</li>
              <li><strong>Parental/Guardian Consent:</strong> For members under the age of 18, verification from parents or legal guardians.</li>
              <li><strong>Verification Submissions:</strong> Screenshots of social channel subscriptions and educator/volunteer credentials.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">2. Payment & Financial Data</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Online payments for uniform orders and donations are processed through PCI-DSS certified payment gateways (e.g. Paystack).
              <strong> ShininChrist never stores your credit card numbers, CVV codes, or banking passwords on our servers.</strong>
              We only retain transaction reference numbers, order items, and payment confirmation statuses necessary for fulfillment and accounting.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">3. How We Use Your Information</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              We use your data solely to support your spiritual and community journey:
            </p>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-stone-700">
              <li>To provide access to the ShininChrist Library, Daily teachings, and Chapter activities.</li>
              <li>To verify eligibility for membership and outreach service.</li>
              <li>To process and deliver uniform requests.</li>
              <li>To send ministry updates, prayer confirmations, and order receipts.</li>
            </ul>
            <p className="text-sm font-semibold text-primary-green">
              We do not sell, rent, or trade your personal information to third-party advertisers or commercial entities.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">4. Data Security & Storage</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              We employ encryption in transit (HTTPS / TLS 1.3), secure cloud infrastructure, role-based database access,
              and strict administrative permissions to prevent unauthorized access, loss, or disclosure of your information.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">5. Your Rights & Contact</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              You may request access to, correction of, or deletion of your personal data at any time by contacting our privacy officer
              at <span className="font-semibold text-primary-green">info@shininchrist.org</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
