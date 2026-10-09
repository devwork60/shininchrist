import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { GIVE_RELATED } from "@/constant/forms/formPageLinks";
import { GIVE_FINANCIAL_FORM } from "@/constant/forms/giveForms";

export const metadata: Metadata = {
  title: "Give Financially | ShininChrist",
  description:
    "Support the ShininChrist mission with a one-time or monthly financial gift through secure payment.",
};

const GiveFinanciallyPage = () => (
  <FormPageShell
    eyebrow="Give"
    heroTitle="Give Financially"
    heroText="Support the mission through a one-time or recurring gift. Sow today. Change lives tomorrow."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Give", href: "/give" },
      { label: "Give Financially", href: "/give/financially" },
    ]}
    config={GIVE_FINANCIAL_FORM}
    related={GIVE_RELATED}
  />
);

export default GiveFinanciallyPage;
