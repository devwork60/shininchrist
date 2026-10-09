import React from "react";
import { STORE_IMPACT_BANNER } from "@/constant/storeData";

const StoreImpactBanner: React.FC = () => (
  <section className="bg-cream pb-14 pt-4">
    <div className="wrapper">
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-gray-200/80 bg-white/90 p-6 text-center shadow-sm sm:flex-row sm:text-left lg:p-8">
        {/* Shopping Cart Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-green-deep)]/10 text-[var(--primary-green-deep)]">
          <svg
            className="h-10 w-10 text-[var(--primary-green-deep)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        {/* Impact Message */}
        <div className="flex-1">
          <h3 className="font-serif text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
            {STORE_IMPACT_BANNER.heading}
          </h3>
          <p className="mt-1 text-sm font-semibold text-[var(--primary-green-deep)]">
            {STORE_IMPACT_BANNER.subheading}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default StoreImpactBanner;
