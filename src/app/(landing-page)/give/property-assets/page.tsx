import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { GIVE_RELATED } from "@/constant/forms/formPageLinks";
import { GIVE_PROPERTY_FORM } from "@/constant/forms/giveForms";

export const metadata: Metadata = {
  title: "Give Property & Major Assets | ShininChrist",
  description:
    "Partner with ShininChrist through larger gifts: land, buildings, vehicles, bulk technology and major equipment.",
};

const GivePropertyPage = () => (
  <FormPageShell
    eyebrow="Give"
    heroTitle="Give Property & Major Assets"
    heroText="Partner through larger gifts that create lasting impact. All major gifts are reviewed before acceptance."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Give", href: "/give" },
      { label: "Give Property & Major Assets", href: "/give/property-assets" },
    ]}
    config={GIVE_PROPERTY_FORM}
    related={GIVE_RELATED}
  />
);

export default GivePropertyPage;
