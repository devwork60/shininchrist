import Breadcrumb from "@/components/common-components/Breadcrumb";
import MembersOnlyNotice from "@/components/common-components/MembersOnlyNotice";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import { WEEK_ENTRIES, WEEK_PAGE } from "@/constant/dailyWeekData";
import WeekEntryRow from "./WeekEntryRow";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Monday of the current week (UTC), so the list always shows this week. */
const startOfWeek = () => {
  const now = new Date();
  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const sinceMonday = (now.getUTCDay() + 6) % 7;
  return today - sinceMonday * DAY_MS;
};

const formatDate = (ms: number) =>
  new Date(ms).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const formatDay = (ms: number) =>
  new Date(ms).toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });

const WeekSection = () => {
  const monday = startOfWeek();

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
          {WEEK_ENTRIES.map((entry) => {
            const ms = monday + entry.dayIndex * DAY_MS;
            return (
              <WeekEntryRow
                key={entry.id}
                day={formatDay(ms)}
                date={formatDate(ms)}
                title={entry.title}
                image={entry.image}
                imageAlt={entry.imageAlt}
              />
            );
          })}
        </ul>

        <MembersOnlyNotice message={WEEK_PAGE.notice} cta={WEEK_PAGE.cta} />
      </div>
    </section>
  );
};

export default WeekSection;
