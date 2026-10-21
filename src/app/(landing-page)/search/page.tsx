import type { Metadata } from "next";
import SimpleHero from "@/components/common-components/SimpleHero";
import SearchClient from "@/components/pages/search-page/SearchClient";

export const metadata: Metadata = {
  alternates: { canonical: "/search" },
  title: "Search | ShininChrist",
  description:
    "Search across ShininChrist ministry programs, chapters, daily faith formation, library resources, store, and ways to serve.",
};

export default function SearchPage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Search", "ShininChrist"]}
        taglineLines={[
          "Find chapters, academy subjects, daily formations,",
          "resources, giving pathways, and ways to serve.",
        ]}
        image="/images/daily-hero-v2.webp"
      />
      <SearchClient />
    </main>
  );
}
