import Image from "next/image";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import { STREAMING_LINKS, type StoreProduct } from "@/constant/storeData";
import PreviewLink from "./PreviewLink";

/** Product page body: image gallery, price, description, preview and (for music) streaming links. */
const ProductDetail = ({ product }: { product: StoreProduct }) => (
  <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
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

      <button
        type="button"
        disabled
        className="mt-6 w-full cursor-not-allowed rounded-md bg-primary-green/40 px-6 py-3.5 text-sm font-semibold text-white-color sm:w-auto"
      >
        Add to Cart · checkout coming soon
      </button>
    </div>
  </div>
);

export default ProductDetail;
