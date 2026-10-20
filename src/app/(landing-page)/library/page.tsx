import MemberLibraryView from "@/components/pages/library-page/member/MemberLibraryView";
import NonMemberLibraryView from "@/components/pages/library-page/NonMemberLibraryView";
import { getCurrentUser, getMemberAccess } from "@/lib/auth";
import { listResources, memberCurrency } from "@/lib/library";

/**
 * Chosen on the SERVER, so the member library is never sent to anyone else. Active members (and admins) see the
 * library with its real resources; everyone else, including people who are signed in but have not finished joining,
 * sees the non-member page.
 */
const LibraryPage = async () => {
  const { allowed, userId } = await getMemberAccess();

  if (!allowed || !userId) {
    return (
      <main className="flex-1">
        <NonMemberLibraryView />
      </main>
    );
  }

  const [resources, currency, user] = await Promise.all([
    listResources(userId),
    memberCurrency(userId),
    getCurrentUser(),
  ]);

  return (
    <main className="flex-1">
      <MemberLibraryView
        resources={resources}
        currency={currency}
        isAdmin={Boolean(user?.isAdmin)}
      />
    </main>
  );
};

export default LibraryPage;
