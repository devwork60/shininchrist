import type { Metadata } from "next";
import SimpleHero from "@/components/common-components/SimpleHero";

export const metadata: Metadata = {
  alternates: { canonical: "/cookie-policy" },
  title: "Cookie Policy | ShininChrist",
  description:
    "Learn how ShininChrist uses essential session cookies and local storage to keep your account secure and maintain site preferences.",
};

export default function CookiePolicyPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Cookie", "Policy"]}
        taglineLines={[
          "How we use cookies to provide secure authentication,",
          "seamless browsing, and privacy-respecting ministry tools.",
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
              Cookie Usage & Preferences
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              ShininChrist adheres to a privacy-first approach. We only use cookies and local storage where strictly necessary
              for platform functionality, security, and member authentication.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">1. What Are Cookies?</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Cookies are small text files stored on your computer or mobile device when you browse websites.
              They allow web applications to remember your sign-in state, security tokens, and user preferences.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">2. Types of Cookies We Use</h3>
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="text-sm font-bold text-primary-green">Strictly Essential Cookies</h4>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  These cookies are vital for the website to function. They authenticate your Google login session,
                  protect your member dashboard against Cross-Site Request Forgery (CSRF), and ensure secure transactions.
                  Without these, core features such as the Library and Onboarding cannot operate.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="text-sm font-bold text-primary-green">Preference & Functional Cookies</h4>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  These remember choices you have made, such as your selected Chapter view, font sizing preferences,
                  or whether you have already seen a notification.
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <h4 className="text-sm font-bold text-primary-green">Privacy-Conscious Analytics</h4>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  We do not use invasive third-party ad-tracking cookies. Any analytics used serve solely to evaluate aggregated
                  page load performance, broken links, and site availability.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">3. Managing Your Cookies</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              Most web browsers automatically accept cookies, but you can alter your browser settings to decline or delete cookies.
              Please note that disabling strictly essential cookies may impair your ability to sign into your member account or access
              the protected Library.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-black-color">4. Inquiries</h3>
            <p className="text-sm leading-relaxed text-stone-700">
              If you have any questions about our use of cookies or privacy practices, reach out to us at{" "}
              <span className="font-semibold text-primary-green">info@shininchrist.org</span>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
