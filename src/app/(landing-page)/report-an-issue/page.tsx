import type { Metadata } from "next";
import SimpleHero from "@/components/common-components/SimpleHero";
import ReportIssueClient from "@/components/pages/report-page/ReportIssueClient";

export const metadata: Metadata = {
  alternates: { canonical: "/report-an-issue" },
  title: "Report an Issue | ShininChrist",
  description:
    "Report broken links, technical glitches, or display issues to the ShininChrist web engineering team.",
};

export default function ReportAnIssuePage() {
  return (
    <main className="flex-1">
      <SimpleHero
        titleLines={["Report an", "Issue"]}
        taglineLines={[
          "Encountered a problem or broken link? Let us know,",
          "and our technical team will resolve it promptly.",
        ]}
        image="/images/daily-hero-v2.webp"
      />
      <ReportIssueClient />
    </main>
  );
}
