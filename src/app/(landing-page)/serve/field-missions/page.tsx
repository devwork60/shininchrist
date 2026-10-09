import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { SERVE_RELATED } from "@/constant/forms/formPageLinks";
import { FIELD_SERVICE_FORM } from "@/constant/forms/serveForms";

export const metadata: Metadata = {
  title: "Field & Missions | ShininChrist",
  description:
    "Apply to serve in local or global outreach, missions, evangelism and community service with ShininChrist.",
};

const FieldMissionsPage = () => (
  <FormPageShell
    eyebrow="Serve"
    heroTitle="Field & Missions"
    heroText="Support local and global outreach, including missions, community service, evangelism and other approved field initiatives."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Serve", href: "/serve" },
      { label: "Field & Missions", href: "/serve/field-missions" },
    ]}
    config={FIELD_SERVICE_FORM}
    related={SERVE_RELATED}
  />
);

export default FieldMissionsPage;
