"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import StoreHero from "@/components/pages/store-page/StoreHero";
import StoreFilterBar from "@/components/pages/store-page/StoreFilterBar";
import { STORE_PRODUCTS } from "@/constant/storeData";

// Below the fold — loaded as separate chunks per SKILL.md architecture rules
const StoreCatalog = dynamic(
  () => import("@/components/pages/store-page/StoreFeaturedSection"),
);

const StoreImpactBanner = dynamic(
  () => import("@/components/pages/store-page/StoreImpactBanner"),
);

const StorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const query = searchQuery.trim().toLowerCase();
  const filteredProducts = STORE_PRODUCTS.filter((product) => {
    const matchesTag = activeTag === "All" || product.category === activeTag;
    const matchesQuery =
      query === "" ||
      [
        product.title,
        product.subtitle,
        product.category,
        product.group ?? "",
        product.type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    return matchesTag && matchesQuery;
  });

  return (
    <main className="flex-1">
      {/* Left-aligned Hero with Pill Search bar */}
      <StoreHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Category Pills outside Hero section */}
      <StoreFilterBar activeTag={activeTag} onTagChange={setActiveTag} />

      {/* Products by category */}
      <StoreCatalog products={filteredProducts} showEmpty={query === ""} />

      {/* Community Impact Banner */}
      <StoreImpactBanner />
    </main>
  );
};

export default StorePage;
