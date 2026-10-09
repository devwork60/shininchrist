import MembersGate from "@/components/common-components/MembersGate";

// No login exists yet, so every visitor is "public": show the access screen only and
// reveal no entries. When ACTIVE-member auth lands, render <ArchiveSection /> for members.
const ArchivePage = () => (
  <main className="flex-1">
    <MembersGate
      title="ShininChrist Daily Archive"
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Daily", href: "/daily" },
        { label: "Archive", href: "/daily/archive" },
      ]}
      message="The Daily Archive is for active ShininChrist members. Join or log in to browse previous entries."
    />
  </main>
);

export default ArchivePage;
