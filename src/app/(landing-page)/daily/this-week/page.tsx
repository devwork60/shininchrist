import MembersGate from "@/components/common-components/MembersGate";
import { WEEK_PAGE } from "@/constant/dailyWeekData";

// No login exists yet, so every visitor is "public": show the access screen only and
// reveal no entries. When ACTIVE-member auth lands, render <WeekSection /> for members.
const ThisWeekPage = () => (
  <main className="flex-1">
    <MembersGate
      title={WEEK_PAGE.title}
      breadcrumb={WEEK_PAGE.breadcrumb}
      message="This Week’s Daily entries are for active ShininChrist members. Join or log in to catch up on the week."
    />
  </main>
);

export default ThisWeekPage;
