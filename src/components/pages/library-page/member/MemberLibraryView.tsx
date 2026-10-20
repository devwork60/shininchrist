"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import type { LibraryResourceView } from "@/lib/library";
import LibraryFilterBar from "./LibraryFilterBar";
import MemberLibraryHero from "./MemberLibraryHero";
import ResourceCard from "./ResourceCard";

interface MemberLibraryViewProps {
  resources: LibraryResourceView[];
  currency: string;
  isAdmin: boolean;
}

/** The member Library: real resources from the database, searchable and filterable by type. */
const MemberLibraryView: React.FC<MemberLibraryViewProps> = ({
  resources,
  currency,
  isAdmin,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const tags = useMemo(
    () => ["All", ...new Set(resources.map((r) => r.contentType))],
    [resources],
  );

  const groups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const visible = resources.filter(
      (r) =>
        (activeTag === "All" || r.contentType === activeTag) &&
        (query === "" ||
          `${r.title} ${r.description} ${r.collection} ${r.scripture}`
            .toLowerCase()
            .includes(query)),
    );
    const byCollection = new Map<string, LibraryResourceView[]>();
    for (const resource of visible) {
      const key = resource.collection || "More resources";
      byCollection.set(key, [...(byCollection.get(key) ?? []), resource]);
    }
    return [...byCollection.entries()];
  }, [resources, searchQuery, activeTag]);

  return (
    <div>
      <MemberLibraryHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <LibraryFilterBar tags={tags} activeTag={activeTag} onTagChange={setActiveTag} />

      <section className="bg-cream py-10 lg:py-12">
        <div className="wrapper grid gap-10">
          {resources.length === 0 ? (
            <p className="text-center text-gray-600">
              No resources have been published yet. Please check back soon.
              {isAdmin && (
                <>
                  {" "}
                  <Link href="/admin/library" className="font-semibold text-[var(--primary-green-deep)] underline">
                    Add resources
                  </Link>
                </>
              )}
            </p>
          ) : groups.length === 0 ? (
            <p className="text-center text-gray-600">Nothing matches your search.</p>
          ) : (
            groups.map(([collection, items]) => (
              <div key={collection}>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{collection}</h2>
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} currency={currency} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default MemberLibraryView;
