"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UiIcons from "@/components/icons/UiIcons";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import { STREAMING_LINKS, type StoreProduct } from "@/constant/storeData";
import { useCart } from "@/context/CartContext";
import PreviewLink from "./PreviewLink";

/** Product page body: image gallery, price, description, preview, and interactive Add to Cart */
const ProductDetail = ({ product }: { product: StoreProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCart();

  const hasPrice = Boolean(product.price);

  const handleAddToCart = () => {
    if (!hasPrice) return;
    const ok = addItem(product, quantity);
    if (ok) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (!hasPrice) return;
    addItem(product, quantity);
    openCart();
  };

  return (
    <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Product Image Gallery */}
      <div className="grid gap-4">
        {product.images.length ? (
          product.images.map((src, index) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-xl border border-primary-gold/20 bg-white-color"
            >
              <Image
                src={src}
                alt={
                  index === 0
                    ? product.title
                    : `${product.title}, view ${index + 1}`
                }
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain"
              />
            </div>
          ))
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-xl border border-primary-gold/20 bg-white-color">
            <Image
              src="/images/logo.png"
              alt=""
              width={1665}
              height={265}
              className="h-10 w-auto opacity-60"
            />
          </div>
        )}
      </div>

      {/* Product Details & Actions */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-gold">
          {product.group ?? product.category} · {product.type}
        </p>
        <MainHeading
          as="h1"
          className="mt-2 !text-primary-green !text-3xl lg:!text-[40px] lg:!leading-tight"
        >
          {product.title}
        </MainHeading>
        <p className="mt-2 font-heading text-lg italic text-text-dark">
          {product.subtitle}
        </p>

        <p className="mt-5 text-3xl font-bold text-card-heading">
          {product.price ?? (
            <span className="text-lg font-medium text-text-grey">
              Price coming soon
            </span>
          )}
        </p>

        <Paragraph className="mt-5 !text-text-dark lg:!text-base lg:!leading-7">
          {product.description}
        </Paragraph>

        {/* Music Streaming Links */}
        {product.category === "Music" && (
          <div className="mt-6 grid gap-4 rounded-xl border border-primary-gold/25 bg-white-color p-5">
            <PreviewLink url={product.previewUrl} />
            <div>
              <p className="text-sm font-semibold text-card-heading">
                Stream or buy on
              </p>
              <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {STREAMING_LINKS.map(({ label, url }) => (
                  <li key={label}>
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-md border border-primary-green px-3 py-2 text-center text-xs font-semibold text-primary-green hover:bg-primary-green hover:text-white-color"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="block rounded-md border border-dashed border-primary-green/30 px-3 py-2 text-center text-xs text-text-grey">
                        {label} · soon
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Add to Cart & Checkout Controls */}
        <div className="mt-8 border-t border-black/10 pt-6">
          {hasPrice ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-dark">
                  Quantity:
                </span>
                <div className="flex items-center rounded-lg border border-black/20 bg-white-color">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-9 w-9 items-center justify-center text-sm font-bold text-text-dark transition-colors hover:bg-black/5"
                  >
                    -
                  </button>
                  <span className="min-w-[2.5rem] text-center font-semibold text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(50, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-9 w-9 items-center justify-center text-sm font-bold text-text-dark transition-colors hover:bg-black/5"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary-gold px-7 py-3.5 text-sm font-semibold text-white-color shadow-sm transition-opacity hover:opacity-95"
                >
                  <UiIcons name="cart" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-2 rounded-xl border border-primary-green bg-primary-green px-7 py-3.5 text-sm font-semibold text-white-color shadow-sm transition-colors hover:bg-primary-green-deep"
                >
                  Buy Now
                </button>
              </div>
              <p className="text-xs text-text-grey">
                Secure payment via Paystack hosted checkout · Instant receipt
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href={`/contact?subject=${encodeURIComponent(`Store Inquiry: ${product.title}`)}`}
                className="inline-flex items-center justify-center rounded-xl bg-primary-green px-6 py-3.5 text-sm font-semibold text-white-color hover:bg-primary-green-deep"
              >
                Inquire / Pre-Order Product
              </Link>
              <p className="text-xs text-text-grey">
                Pricing for this resource is currently being finalized by the ministry team.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
