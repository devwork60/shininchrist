import type { CSSProperties } from "react";
import BlockHeading from "@/components/pages/typography/BlockHeading";
import type { FocusSectionData } from "@/constant/chapterFocusTypes";
import FocusItem from "./FocusItem";

/** "What We Focus On" list shared by the Men, Women and Youth chapter pages. */
const FocusSection = ({
  heading,
  accent,
  items,
  leftCount,
}: FocusSectionData) => {
  const half = leftCount ?? Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section
      style={{ "--accent": accent } as CSSProperties}
      className="bg-cream py-10 lg:py-14"
    >
      <div className="wrapper">
        <BlockHeading className="text-center !text-[var(--accent)]">
          {heading}
        </BlockHeading>

        <div className="mt-8 grid gap-x-12 gap-y-6 lg:mt-10 lg:grid-cols-2">
          {columns.map((column, index) => (
            <ul key={index} className="space-y-6">
              {column.map(({ id, ...item }) => (
                <FocusItem key={id} {...item} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusSection;
