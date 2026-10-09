import CardHeading from "@/components/pages/typography/CardHeading";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import SubHeading from "@/components/pages/typography/SubHeading";
import {
  STORE_GROUPS,
  STORE_TAGS,
  type StoreProduct,
} from "@/constant/storeData";
import StoreProductCard from "./StoreProductCard";

interface StoreCatalogProps {
  products: StoreProduct[];
  /** Show empty sub-sections ("coming soon") only when nothing is being searched. */
  showEmpty: boolean;
}

const Grid = ({ items }: { items: StoreProduct[] }) => (
  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {items.map((product) => (
      <StoreProductCard key={product.slug} product={product} />
    ))}
  </div>
);

/** Products grouped by category and sub-section (album/singles, exam families, digital categories). */
const StoreCatalog = ({ products, showEmpty }: StoreCatalogProps) => {
  const categories = STORE_TAGS.filter((tag) => tag !== "All");

  const sections = categories.flatMap((category) => {
    const items = products.filter((product) => product.category === category);
    const groups = STORE_GROUPS[category];
    if (!groups)
      return items.length ? [{ category, blocks: [{ title: "", items }] }] : [];

    const blocks = groups
      .map((title) => ({
        title,
        items: items.filter((p) => p.group === title),
      }))
      .filter((block) => block.items.length > 0 || showEmpty);
    return blocks.length ? [{ category, blocks }] : [];
  });

  if (sections.length === 0) {
    return (
      <section className="bg-cream py-14">
        <p className="wrapper text-center text-text-dark">
          No products match your search.
        </p>
      </section>
    );
  }

  return (
    <section id="all-products" className="bg-cream py-10 lg:py-14">
      <div className="wrapper grid gap-12">
        {sections.map(({ category, blocks }) => (
          <div
            key={category}
            id={category.toLowerCase().replace(/\s+/g, "-")}
            className="scroll-mt-24"
          >
            <SubHeading className="!text-primary-green !text-3xl lg:!text-4xl lg:!leading-tight">
              {category}
            </SubHeading>
            <span
              aria-hidden="true"
              className="mt-2 block h-1 w-14 bg-gold-bright"
            />

            {blocks.map(({ title, items }) => (
              <div key={title || category} className="mt-6">
                {title && (
                  <CardHeading className="!text-primary-green">
                    {title}
                  </CardHeading>
                )}
                {items.length ? (
                  <Grid items={items} />
                ) : (
                  <CardDescSm className="mt-3 rounded-lg border border-dashed border-primary-green/25 p-5 text-center !text-text-dark">
                    Coming soon.
                  </CardDescSm>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreCatalog;
