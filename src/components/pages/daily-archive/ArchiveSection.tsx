import Breadcrumb from "@/components/common-components/Breadcrumb";
import MembersOnlyNotice from "@/components/common-components/MembersOnlyNotice";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { ARCHIVE_ENTRIES, ARCHIVE_PAGE } from "@/constant/dailyArchiveData";
import { archiveEntries, hasDetail } from "@/lib/daily";
import { getDailyEntries } from "@/lib/site-content";
import ArchiveBrowser, { type ArchiveRow } from "./ArchiveBrowser";

/** Entries from before this week. Sample entries show until an admin saves real ones. */
const ArchiveSection = async () => {
  const { entries, saved } = await getDailyEntries();
  const rows: ArchiveRow[] = saved
    ? archiveEntries(entries).map((entry) => ({
        id: entry.id,
        title: entry.title,
        scripture: entry.scripture,
        book: entry.book,
        topic: entry.topic,
        date: entry.date,
        image: entry.image,
        imageAlt: entry.imageAlt,
        href: hasDetail(entry) ? `/daily/entry/${entry.id}` : undefined,
      }))
    : ARCHIVE_ENTRIES;

  return (
  <section className="bg-cream py-10 lg:py-14">
    <div className="wrapper-narrow">
      <MainHeading as="h1" className="!text-primary-green">
        {ARCHIVE_PAGE.title}
      </MainHeading>
      <div className="mt-3">
        <Breadcrumb items={ARCHIVE_PAGE.breadcrumb} />
      </div>
      <CardDescSm className="mt-3 !text-text-dark">
        {ARCHIVE_PAGE.description}
      </CardDescSm>

      <div className="mt-5">
        <ArchiveBrowser entries={rows} />
      </div>

      <MembersOnlyNotice message={ARCHIVE_PAGE.notice} cta={ARCHIVE_PAGE.cta} />
    </div>
  </section>
  );
};

export default ArchiveSection;
