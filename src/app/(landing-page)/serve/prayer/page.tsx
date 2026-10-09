import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { SERVE_TABS, SERVE_RELATED } from "@/constant/forms/formPageLinks";
import { SERVE_PRAYER_FORM } from "@/constant/forms/serveForms";

export const metadata: Metadata = {
  title: "Serve in Prayer | ShininChrist",
  description:
    "Join the ShininChrist prayer team and serve through intercession for people, communities, nations and the gospel.",
};

const PrayerPage = () => (
  <FormPageShell
    eyebrow="Serve"
    heroTitle="Serve in Prayer"
    heroText="Commit to pray for ShininChrist, our members, communities and global mission work."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Serve", href: "/serve" },
      { label: "Serve in Prayer", href: "/serve/prayer" },
    ]}
    tabs={SERVE_TABS}
    config={SERVE_PRAYER_FORM}
    related={SERVE_RELATED}
  />
);

export default PrayerPage;
