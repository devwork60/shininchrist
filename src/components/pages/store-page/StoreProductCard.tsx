"use client";

import Image from "next/image";
import Link from "next/link";
import ButtonOutline from "@/components/button/ButtonOutline";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import CardTitleSm from "@/components/pages/typography/CardTitleSm";
import type { StoreProduct } from "@/constant/storeData";
import { useCart } from "@/context/CartContext";
import PreviewLink from "./PreviewLink";

/** Product image, type, title, price and actions. Used on the Store grid and on related products. */
const StoreProductCard = ({ product }: { product: StoreProduct }) => {
  const { addItem } = useCart();
  const hasPrice = Boolean(product.price);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-primary-gold/20 bg-white-color shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/store/${product.slug}`} className="relative aspect-square bg-cream block">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain transition-transform hover:scale-105"
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
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-gold">
          {product.type}
        </p>
        <Link href={`/store/${product.slug}`}>
          <CardTitleSm className="mt-1 hover:text-primary-green transition-colors">{product.title}</CardTitleSm>
        </Link>
        <CardDescSm className="mt-1 line-clamp-2">{product.subtitle}</CardDescSm>
        <p className="mt-3 text-lg font-bold text-card-heading">
          {product.price ?? (
            <span className="text-sm font-medium text-text-grey">
              Price coming soon
            </span>
          )}
        </p>

        <div className="mt-auto grid gap-2 pt-4">
          {product.category === "Music" && (
            <PreviewLink url={product.previewUrl} />
          )}
          <div className="grid grid-cols-2 gap-2">
            <ButtonOutline
              url={`/store/${product.slug}`}
              text="Details"
              borderColor="var(--primary-green)"
              shape="rounded"
              className="w-full !py-2 !text-xs"
            />
            {hasPrice ? (
              <button
                type="button"
                onClick={() => addItem(product, 1)}
                className="w-full rounded-full bg-primary-gold py-2 text-xs font-semibold text-white-color hover:opacity-90 transition-opacity"
              >
                + Add
              </button>
            ) : (
              <Link
                href={`/store/${product.slug}`}
                className="flex items-center justify-center rounded-full bg-black/5 py-2 text-center text-xs font-semibold text-text-grey hover:bg-black/10"
              >
                Inquire
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default StoreProductCard;
