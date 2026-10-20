import MemberLibraryView from "@/components/pages/library-page/member/MemberLibraryView";
import NonMemberLibraryView from "@/components/pages/library-page/NonMemberLibraryView";
import { getMemberAccess } from "@/lib/auth";

/**
 * Chosen on the SERVER, so the member library is never sent to anyone else. Active members (and admins) see the
 * library; everyone else, including people who are signed in but have not finished joining, sees the non-member page.
 */
const LibraryPage = async () => {
  const { allowed } = await getMemberAccess();

  return (
    <main className="flex-1">
      {allowed ? <MemberLibraryView /> : <NonMemberLibraryView />}
    </main>
  );
};

export default LibraryPage;
