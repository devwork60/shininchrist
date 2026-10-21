import type { Metadata } from "next";
import SimpleHero from "@/components/common-components/SimpleHero";
import ContactClient from "@/components/pages/contact-page/ContactClient";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact Us | ShininChrist",
  description:
    "Get in touch with ShininChrist global ministry team for general inquiries, membership questions, chapters, Academy, prayer, or giving.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Contact", "ShininChrist"]}
        taglineLines={[
          "We’d love to hear from you. Send us a message,",
          "and our team will be pleased to assist you.",
        ]}
        image="/images/daily-hero-v2.webp"
      />
      <ContactClient />
    </main>
  );
}
