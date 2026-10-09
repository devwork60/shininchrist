import InviteForm from "@/components/pages/invite-page/InviteForm";
import InviteHero from "@/components/pages/invite-page/InviteHero";
import InviteSidebar from "@/components/pages/invite-page/InviteSidebar";
import InviteTypesColumn from "@/components/pages/invite-page/InviteTypesColumn";

const InviteMercyPage = () => (
  <main className="flex-1">
    <InviteHero />
    <div className="wrapper relative -mt-20 grid grid-cols-1 gap-6 pb-12 lg:-mt-28 lg:grid-cols-[0.95fr_1.9fr_0.85fr] lg:pb-16">
      <InviteTypesColumn />
      <InviteForm />
      <InviteSidebar />
    </div>
  </main>
);

export default InviteMercyPage;
