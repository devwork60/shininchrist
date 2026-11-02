import Breadcrumb from "@/components/common-components/Breadcrumb";
import MembersOnlyNotice from "@/components/common-components/MembersOnlyNotice";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { WEEK_ENTRIES, WEEK_PAGE } from "@/constant/dailyWeekData";
import {
  formatDay,
  formatLongDate,
  hasDetail,
  thisWeekEntries,
  weekStartIso,
} from "@/lib/daily";
import { getDailyEntries } from "@/lib/site-content";
import WeekEntryRow from "./WeekEntryRow";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Entries whose date falls in the current Monday-to-Sunday week. Until an admin saves real entries the page shows
 * the sample week it always had; after that it shows only the real ones (or a friendly message when there are none).
 */
const WeekSection = async () => {
  const { entries, saved } = await getDailyEntries();
  const mondayIso = weekStartIso();
  const monday = Date.parse(`${mondayIso}T00:00:00Z`);
  const week = saved ? thisWeekEntries(entries) : [];

  return (
    <section className="bg-cream py-10 lg:py-14">
      <div className="wrapper-narrow">
        <MainHeading as="h1" className="!text-primary-green">
          {WEEK_PAGE.title}
        </MainHeading>
        <div className="mt-3">
          <Breadcrumb items={WEEK_PAGE.breadcrumb} />
        </div>
        <CardDescSm className="mt-3 !text-text-dark">
          {WEEK_PAGE.description}
        </CardDescSm>

        <ul className="mt-6">
          {saved
            ? week.map((entry) => (
                <WeekEntryRow
                  key={entry.id}
                  day={formatDay(entry.date)}
                  date={formatLongDate(entry.date)}
                  title={entry.title}
                  image={entry.image}
                  imageAlt={entry.imageAlt}
                  href={hasDetail(entry) ? `/daily/entry/${entry.id}` : undefined}
                />
              ))
            : WEEK_ENTRIES.map((entry) => {
                const iso = new Date(monday + entry.dayIndex * DAY_MS)
                  .toISOString()
                  .slice(0, 10);
                return (
                  <WeekEntryRow
                    key={entry.id}
                    day={formatDay(iso)}
                    date={formatLongDate(iso)}
                    title={entry.title}
                    image={entry.image}
                    imageAlt={entry.imageAlt}
                  />
                );
              })}
        </ul>

        {saved && week.length === 0 && (
          <CardDescSm className="mt-8 text-center !text-text-dark">
            No entries have been published for this week yet. Please check
            back soon.
          </CardDescSm>
        )}

        <MembersOnlyNotice message={WEEK_PAGE.notice} cta={WEEK_PAGE.cta} />
      </div>
    </section>
  );
};

export default WeekSection;
