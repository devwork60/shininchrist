import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { SERVE_TABS, SERVE_RELATED } from "@/constant/forms/formPageLinks";
import { VOLUNTEER_SKILLS_FORM } from "@/constant/forms/serveForms";

export const metadata: Metadata = {
  title: "Share Your Skills | ShininChrist",
  description:
    "Offer your professional or creative skills to advance ShininChrist's spiritual, educational, digital and community work.",
};

const SkillsPage = () => (
  <FormPageShell
    eyebrow="Serve"
    heroTitle="Share Your Skills"
    heroText="Use your professional knowledge, technical abilities, creativity and experience to advance ShininChrist's mission."
    breadcrumb={[
      { label: "Home", href: "/" },
      { label: "Serve", href: "/serve" },
      { label: "Share Your Skills", href: "/serve/skills" },
    ]}
    tabs={SERVE_TABS}
    config={VOLUNTEER_SKILLS_FORM}
    related={SERVE_RELATED}
  />
);

export default SkillsPage;
