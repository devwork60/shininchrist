import MembersGate from "@/components/common-components/MembersGate";
import ArchiveSection from "@/components/pages/daily-archive/ArchiveSection";
import { getMemberAccess } from "@/lib/auth";

// Checked on the server: only active members (and admins) get the entries. Everyone else gets the locked screen.
const ArchivePage = async () => {
  const { signedIn, allowed } = await getMemberAccess();

  return (
    <main className="flex-1">
      {allowed ? (
        <ArchiveSection />
      ) : (
        <MembersGate
          title="ShininChrist Daily Archive"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Daily", href: "/daily" },
            { label: "Archive", href: "/daily/archive" },
          ]}
          message={
            signedIn
              ? "The Daily Archive opens once your membership is active. Complete your registration to browse previous entries."
              : "The Daily Archive is for active ShininChrist members. Join or log in to browse previous entries."
          }
        />
      )}
    </main>
  );
};

export default ArchivePage;
