import React from "react";
import Image from "next/image";
import { STORE_HERO } from "@/constant/storeData";

interface StoreHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const StoreHero: React.FC<StoreHeroProps> = ({
  searchQuery,
  onSearchChange,
}) => (
  <section className="relative isolate overflow-hidden bg-[var(--primary-green-deep)] text-white-color">
    {/* Background Artwork */}
    <Image
      src={STORE_HERO.image}
      alt="Store Background"
      fill
      priority
      sizes="100vw"
      className="-z-10 object-cover opacity-30 object-right"
    />
    {/* Dark Gradient Overlay */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,38,28,0.92)_0%,rgba(18,38,28,0.85)_40%,rgba(18,38,28,0.45)_100%)] max-md:bg-[linear-gradient(180deg,rgba(18,38,28,0.9)_0%,rgba(18,38,28,0.95)_100%)]"
    />

    <div className="wrapper py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl text-left">
        <p className="text-xs font-bold tracking-widest uppercase text-[var(--gold-bright)]">
          {STORE_HERO.badge}{" "}
          <span className="normal-case opacity-90">{STORE_HERO.subbadge}</span>
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {STORE_HERO.title}
        </h1>
        <p className="mt-3 text-base font-normal text-white/90 sm:text-lg sm:leading-relaxed">
          {STORE_HERO.tagline}
        </p>

        {/* Pill Search Bar */}
        <div className="mt-8 flex w-full max-w-xl items-center rounded-full bg-white p-1.5 shadow-2xl ring-1 ring-black/5">
          <div className="flex flex-1 items-center px-4">
            <svg
              className="h-5 w-5 shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={STORE_HERO.searchPlaceholder}
              className="w-full bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none sm:text-base"
            />
          </div>
          <button
            type="button"
            aria-label="Search store products"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary-green-deep)] text-white transition-colors hover:bg-[var(--primary-green)]"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default StoreHero;
