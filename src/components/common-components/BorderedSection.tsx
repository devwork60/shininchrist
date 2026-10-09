import type { ReactNode } from "react";
import SectionHeader from "@/components/common-components/SectionHeader";

interface BorderedSectionProps {
  title: string;
  description?: string;
  /** Anchor id for in-page links (smooth scroll targets) */
  id?: string;
  children: ReactNode;
}

/** Cream section with a bordered panel; the heading sits on the panel's top border. */
const BorderedSection = ({
  title,
  description,
  id,
  children,
}: BorderedSectionProps) => (
  <section id={id} className="scroll-mt-24 bg-cream pb-8 lg:pb-10">
    <div className="wrapper rounded-2xl border border-primary-gold/20 bg-cream px-4 pb-6 lg:px-8">
      <SectionHeader
        variant="label"
        onBorder
        className="-mt-5"
        title={title}
        description={description}
      />
      {children}
    </div>
  </section>
);

export default BorderedSection;
