import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import MembersGate from "@/components/common-components/MembersGate";
import UiIcons from "@/components/icons/UiIcons";
import ShareDaily from "@/components/pages/daily-today/ShareDaily";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { getCurrentUser, getMemberAccess } from "@/lib/auth";
import { formatLongDate, todayIso } from "@/lib/daily";
import { youtubeEmbedUrl } from "@/lib/daily-video";
import { getDailyEntries } from "@/lib/site-content";

// Members only, and never listed by search engines.
export const metadata: Metadata = {
  title: "Daily entry | ShininChrist",
  robots: { index: false },
};

const Paragraphs = ({ text }: { text: string }) => (
  <>
    {text
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((paragraph, index) => (
        <CardDescSm
          key={index}
          className="mt-3 whitespace-pre-line !text-base !leading-7 !text-text-dark"
        >
          {paragraph}
        </CardDescSm>
      ))}
  </>
);

const Block = ({ title, text }: { title: string; text: string }) =>
  text ? (
    <section className="mt-8">
      <h2 className="font-heading text-xl font-semibold text-primary-green">
        {title}
      </h2>
      <Paragraphs text={text} />
    </section>
  ) : null;

const DailyEntryPage = async ({ params }: PageProps<"/daily/entry/[id]">) => {
  const { id } = await params;
  const { signedIn, allowed } = await getMemberAccess();

  if (!allowed) {
    return (
      <main className="flex-1">
        <MembersGate
          title="ShininChrist Daily"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Daily", href: "/daily" },
          ]}
          message={
            signedIn
              ? "Daily entries open once your membership is active. Complete your registration to read them."
              : "Daily entries are for active ShininChrist members. Join or log in to read them."
          }
        />
      </main>
    );
  }

  const { entries } = await getDailyEntries();
  const entry = entries.find((e) => e.id === id);
  if (!entry) notFound();
  // A future date keeps the entry hidden from members until that day (admins can preview it).
  if (entry.date > todayIso()) {
    const user = await getCurrentUser();
    if (!user?.isAdmin) notFound();
  }

  const embed = entry.videoUrl ? youtubeEmbedUrl(entry.videoUrl) : null;

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <article className="wrapper-narrow">
        <MainHeading as="h1" className="!text-primary-green">
          {entry.title}
        </MainHeading>
        <div className="mt-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Daily", href: "/daily" },
              { label: "Archive", href: "/daily/archive" },
              { label: entry.title, href: `/daily/entry/${entry.id}` },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 !text-text-grey">
          <time dateTime={entry.date}>{formatLongDate(entry.date)}</time>
          {entry.scripture ? ` · ${entry.scripture}` : ""}
          {entry.topic ? ` · ${entry.topic}` : ""}
        </CardDescSm>

        {entry.image && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
            <Image
              src={entry.image}
              alt={entry.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {embed && (
          <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
              src={embed}
              title={`${entry.title} video`}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        )}

        <Block title="Devotional" text={entry.summary} />
        <Block title="Reflection" text={entry.reflection} />
        <Block title="Assignment" text={entry.assignment} />

        <div className="mt-8 flex flex-wrap gap-3">
          {entry.videoUrl && !embed && (
            <Link
              href={entry.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-green px-5 py-3 text-sm font-semibold text-white-color hover:opacity-90"
            >
              <UiIcons name="playSmall" />
              Watch the video
            </Link>
          )}
          {entry.linkUrl && (
            <Link
              href={entry.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gold-bright px-5 py-3 text-sm font-semibold text-primary-green-deep hover:opacity-90"
            >
              {entry.linkText || "Open the link"}
            </Link>
          )}
          <Link
            href="/daily/archive"
            className="inline-flex items-center rounded-lg border border-primary-green/30 px-5 py-3 text-sm font-semibold text-primary-green hover:bg-primary-green/5"
          >
            Back to the archive
          </Link>
        </div>

        <div className="mt-6 max-w-md">
          <ShareDaily
            title={`ShininChrist Daily: ${entry.title}${entry.scripture ? ` (${entry.scripture})` : ""}`}
            label="Share this Daily"
            className="inline-flex w-full items-center gap-2 rounded-lg border border-primary-green/30 px-5 py-3 text-sm font-semibold text-primary-green hover:bg-primary-green/5"
          />
        </div>
      </article>
    </main>
  );
};

export default DailyEntryPage;
