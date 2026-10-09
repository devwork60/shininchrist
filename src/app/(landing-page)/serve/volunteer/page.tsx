import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { SERVE_TABS, SERVE_RELATED } from "@/constant/forms/formPageLinks";
import { VOLUNTEER_TIME_FORM } from "@/constant/forms/serveForms";

export const metadata: Metadata = {
  title: "Volunteer Your Time | ShininChrist",
  description:
    "Apply to volunteer your time with ShininChrist in outreach, education, media, events and community service.",
};

const VolunteerPage = () => (
  <FormPageShell
    eyebrow="Serve"
    heroTitle="Volunteer Your Time"
    heroText="Serve on-site or remotely in media, administration, education, events, outreach and more."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Serve", href: "/serve" },
      { label: "Volunteer", href: "/serve/volunteer" },
    ]}
    tabs={SERVE_TABS}
    config={VOLUNTEER_TIME_FORM}
    related={SERVE_RELATED}
  />
);

export default VolunteerPage;
