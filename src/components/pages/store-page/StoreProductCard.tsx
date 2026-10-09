import Image from "next/image";
import ButtonOutline from "@/components/button/ButtonOutline";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { StoreProduct } from "@/constant/storeData";
import PreviewLink from "./PreviewLink";

/** Product image, type, title, price and actions. Used on the Store grid and on related products. */
const StoreProductCard = ({ product }: { product: StoreProduct }) => (
  <article className="flex flex-col overflow-hidden rounded-xl border border-primary-gold/20 bg-white-color shadow-sm transition-shadow hover:shadow-md">
    <div className="relative aspect-square bg-cream">
      {product.images[0] ? (
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 33vw, 50vw"
          className="object-contain"
        />
      ) : (
        <Image
          src="/images/logo.png"
          alt=""
          width={1665}
          height={265}
          className="absolute left-1/2 top-1/2 h-8 w-auto -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
      )}
    </div>

    <div className="flex flex-1 flex-col p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-gold">
        {product.type}
      </p>
      <CardTitleSm className="mt-1">{product.title}</CardTitleSm>
      <CardDescSm className="mt-1 line-clamp-2">{product.subtitle}</CardDescSm>
      <p className="mt-3 text-lg font-bold text-card-heading">
        {product.price ?? (
          <span className="text-sm font-medium text-text-grey">
            Price coming soon
          </span>
        )}
      </p>

      <div className="mt-auto grid gap-3 pt-4">
        {product.category === "Music" && (
          <PreviewLink url={product.previewUrl} />
        )}
        <ButtonOutline
          url={`/store/${product.slug}`}
          text="View Details"
          borderColor="var(--primary-green)"
          shape="rounded"
          className="w-full !py-2.5 !text-sm"
        />
      </div>
    </div>
  </article>
);

export default StoreProductCard;
