import type { Metadata } from "next";
import FormPageShell from "@/components/pages/form-pages/FormPageShell";
import { SERVE_RELATED } from "@/constant/forms/formPageLinks";
import { PARTNER_FORM } from "@/constant/forms/serveForms";

export const metadata: Metadata = {
  alternates: { canonical: "/partnership-inquiries" },
  title: "Partnership Inquiries | ShininChrist",
  description:
    "Explore strategic kingdom partnerships between your church, ministry, school, business or community organization and ShininChrist.",
};

export default function PartnershipInquiriesPage() {
  return (
    <FormPageShell
      eyebrow="Partnership"
      heroTitle="Partnership Inquiries"
      heroText="Churches, ministries, academic institutions, and businesses: join hands with ShininChrist to advance the gospel and serve communities."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Serve", href: "/serve" },
        { label: "Partnership Inquiries", href: "/partnership-inquiries" },
      ]}
      config={PARTNER_FORM}
      related={SERVE_RELATED}
    />
  );
}
