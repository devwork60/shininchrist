import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import ProductDetail from "@/components/pages/store-page/ProductDetail";
import StoreProductCard from "@/components/pages/store-page/StoreProductCard";
import { STORE_PRODUCTS, findProduct } from "@/constant/storeData";

export const generateStaticParams = () =>
  STORE_PRODUCTS.map((product) => ({ slug: product.slug }));

export const generateMetadata = async ({
  params,
}: PageProps<"/store/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  return {
    title: `${product.title} | ShininChrist Store`,
    description: product.description,
  };
};

const ProductPage = async ({ params }: PageProps<"/store/[slug]">) => {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  const related = STORE_PRODUCTS.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  ).slice(0, 4);

  return (
    <main className="flex-1 bg-cream py-8 lg:py-12">
      <div className="wrapper">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Store", href: "/store" },
            { label: product.title, href: `/store/${product.slug}` },
          ]}
        />
        <ProductDetail product={product} />

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-semibold text-primary-green">
              More from {product.category}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <StoreProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductPage;
