import type { Metadata } from "next";
import SimpleHero from "@/components/common-components/SimpleHero";

export const metadata: Metadata = {
  alternates: { canonical: "/refund-policy" },
  title: "Refund & Cancellation Policy | ShininChrist",
  description:
    "ShininChrist policy on membership uniform orders, exchanges, damaged goods, digital downloads, and charitable contributions.",
};

export default function RefundPolicyPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Refund & Cancellation", "Policy"]}
        taglineLines={[
          "Clear guidelines regarding membership uniforms, store",
          "merchandise, damaged items, and voluntary donations.",
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
              Orders, Exchanges & Contributions
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              ShininChrist handles all financial transactions with fairness, transparency, and Christian integrity.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">1. Membership Uniform Orders</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Membership uniform packages (including the ShininChrist T-shirt and wristband) are ordered as part of the
              onboarding process. Because items are produced and packaged according to member sizing and chapter affiliation:
            </p>
            <ul className="list-inside list-disc space-y-1.5 text-sm text-stone-700">
              <li><strong>Pre-Dispatch Cancellation:</strong> If you wish to cancel an order before it has been processed for shipment, you may request a full refund by contacting support within 24 hours of payment.</li>
              <li><strong>Damaged or Defective Items:</strong> If your uniform arrives damaged, defective, or in an incorrect size due to our packaging error, notify us within 14 days of receipt with photos. We will dispatch a free replacement or issue a refund.</li>
              <li><strong>Exchange Policy:</strong> Unworn, unwashed uniforms with original tags may be exchanged for an alternate size subject to return shipping costs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">2. Charitable Gifts & Donations</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Contributions made through the Give portal (one-time or monthly gifts, C.A.R.E. support, or building funds) are voluntary
              charitable gifts designated to advance the gospel and serve communities. As such, donations are generally non-refundable
              once processed and receipted.
            </p>
            <p className="text-sm leading-relaxed text-stone-700">
              In the rare event of a technical glitch, duplicate transaction, or unauthorized credit card charge, please notify
              our financial desk at <span className="font-semibold text-primary-green">info@shininchrist.org</span> immediately.
              Verified erroneous charges will be refunded promptly via the original payment method.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">3. Digital Products & Library Resources</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Due to the immediate access provided upon download, digital materials, eBooks, audio devotionals, and downloaded curriculum
              are non-refundable once unlocked. If you experience difficulty downloading or accessing digital media, technical support
              will promptly resolve your access.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">4. How to Request Assistance</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              To request a refund, exchange, or order correction, please email <span className="font-semibold text-primary-green">info@shininchrist.org</span> with your order reference number, full name, and details of the request.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
