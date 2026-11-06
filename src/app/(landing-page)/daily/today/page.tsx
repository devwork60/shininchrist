import type { Metadata } from "next";
import TodaySection from "@/components/pages/daily-today/TodaySection";
import { getDailyToday } from "@/lib/site-content";

/** What a shared link to Today shows in WhatsApp, Facebook and similar: today's heading and verse. */
export const generateMetadata = async (): Promise<Metadata> => {
  const content = await getDailyToday();
  const title = `${content.title} | ShininChrist Daily`;
  const description = [content.verse, content.verseReference].filter(Boolean).join(" ");
  return {
    description,
    openGraph: { title, description, url: "/daily/today" },
    twitter: { title, description },
  };
};

const TodayPage = () => (
  <main className="flex-1">
    <TodaySection />
  </main>
);

export default TodayPage;
