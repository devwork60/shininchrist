import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { SERVE_RELATED } from "@/constant/forms/formPageLinks";
import { GIVE_IN_KIND_FORM } from "@/constant/forms/giveForms";

export const metadata: Metadata = {
  title: "Donate In-Kind | ShininChrist",
  description:
    "Offer goods, supplies, equipment or services to ShininChrist. All offers are reviewed before acceptance.",
};

// Serve > Donate In-Kind uses the same workflow as Give > Give In-Kind (one form, no duplicate system).

const DonateInKindPage = () => (
  <FormPageShell
    eyebrow="Serve"
    heroTitle="Donate In-Kind"
    heroText="Donate goods and supplies such as computers, vehicles, Bibles, books, school supplies, medical equipment, sealed medications and more."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Serve", href: "/serve" },
      { label: "Donate In-Kind", href: "/serve/donate-in-kind" },
    ]}
    config={GIVE_IN_KIND_FORM}
    related={SERVE_RELATED}
  />
);

export default DonateInKindPage;
