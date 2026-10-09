"use client";

import React, { useState } from "react";
import {
  MEMBER_COLLECTIONS,
  MEMBER_FEATURED_ITEMS,
} from "@/constant/libraryMemberData";
import LibraryFilterBar from "./LibraryFilterBar";
import MemberCollectionsSection from "./MemberCollectionsSection";
import MemberFeaturedSection from "./MemberFeaturedSection";
import MemberLibraryHero from "./MemberLibraryHero";

const MemberLibraryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  // Filter featured items by tag and search query
  const filteredFeatured = MEMBER_FEATURED_ITEMS.filter((item) => {
    const matchesTag = activeTag === "All" || item.tag === activeTag;
    const matchesQuery =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  // Filter collections by tag and search query
  const filteredCollections = MEMBER_COLLECTIONS.filter((item) => {
    const matchesTag = activeTag === "All" || item.tag === activeTag;
    const matchesQuery =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div>
      {/* Left aligned Hero Section */}
      <MemberLibraryHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Category Pills outside the Hero Section */}
      <LibraryFilterBar activeTag={activeTag} onTagChange={setActiveTag} />

      {/* Featured Resources & Collections */}
      <MemberFeaturedSection items={filteredFeatured} />
      <MemberCollectionsSection collections={filteredCollections} />
    </div>
  );
};

export default MemberLibraryView;
