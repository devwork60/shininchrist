import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { GIVE_RELATED } from "@/constant/forms/formPageLinks";
import { GIVE_IN_KIND_FORM } from "@/constant/forms/giveForms";

export const metadata: Metadata = {
  title: "Give In-Kind | ShininChrist",
  description:
    "Offer goods, supplies and equipment to meet real needs. All offers are reviewed before acceptance.",
};

const GiveInKindPage = () => (
  <FormPageShell
    eyebrow="Give"
    heroTitle="Give In-Kind"
    heroText="Donate goods, supplies and equipment to meet real needs. Please wait for confirmation before sending anything."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Give", href: "/give" },
      { label: "Give In-Kind", href: "/give/in-kind" },
    ]}
    config={GIVE_IN_KIND_FORM}
    related={GIVE_RELATED}
  />
);

export default GiveInKindPage;
