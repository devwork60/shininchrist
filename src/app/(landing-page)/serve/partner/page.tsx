import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { SERVE_RELATED } from "@/constant/forms/formPageLinks";
import { PARTNER_FORM } from "@/constant/forms/serveForms";

export const metadata: Metadata = {
  title: "Partner With Us | ShininChrist",
  description:
    "Churches, schools, businesses and community groups: tell us how you would like to serve alongside ShininChrist.",
};

const PartnerPage = () => (
  <FormPageShell
    eyebrow="Serve"
    heroTitle="Partner With Us"
    heroText="Churches, ministries, schools, businesses and community groups are welcome to serve alongside ShininChrist."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Serve", href: "/serve" },
      { label: "Partner", href: "/serve/partner" },
    ]}
    config={PARTNER_FORM}
    related={SERVE_RELATED}
  />
);

export default PartnerPage;
