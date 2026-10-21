import type { Metadata } from "next";
import SimpleHero from "@/components/common-components/SimpleHero";
import FaqClient from "@/components/pages/faq-page/FaqClient";

export const metadata: Metadata = {
  alternates: { canonical: "/faqs" },
  title: "Frequently Asked Questions (FAQ) | ShininChrist",
  description:
    "Explore approved questions and biblical answers regarding ShininChrist ministry, membership, chapters, Academy, daily faith formation, serving, giving, and Christian living.",
};

import { getFaqItems } from "@/lib/site-content";

export default async function FaqsPage() {
  const faqItems = await getFaqItems();

  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Frequently Asked", "Questions"]}
        taglineLines={[
          "Clear answers on our mission, membership, faith journey,",
          "and how we shine Christ in our communities and nations.",
        ]}
        image="/images/daily-hero-v2.webp"
      />
      <FaqClient items={faqItems} />
    </main>
  );
}
