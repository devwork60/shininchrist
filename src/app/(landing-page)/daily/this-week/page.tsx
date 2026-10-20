import MembersGate from "@/components/common-components/MembersGate";
import WeekSection from "@/components/pages/daily-week/WeekSection";
import { WEEK_PAGE } from "@/constant/dailyWeekData";
import { getMemberAccess } from "@/lib/auth";

// Checked on the server: only active members (and admins) get the entries. Everyone else gets the locked screen.
const ThisWeekPage = async () => {
  const { signedIn, allowed } = await getMemberAccess();

  return (
    <main className="flex-1">
      {allowed ? (
        <WeekSection />
      ) : (
        <MembersGate
          title={WEEK_PAGE.title}
          breadcrumb={WEEK_PAGE.breadcrumb}
          message={
            signedIn
              ? "This Week’s Daily entries open once your membership is active. Complete your registration to catch up on the week."
              : "This Week’s Daily entries are for active ShininChrist members. Join or log in to catch up on the week."
          }
        />
      )}
    </main>
  );
};

export default ThisWeekPage;
