"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategory, type FaqItem } from "@/constant/faqData";
import SectionHeader from "@/components/common-components/SectionHeader";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import ArrowLink from "@/components/common-components/ArrowLink";

import type { FaqItemContent } from "@/lib/site-content-schema";

export default function FaqClient({ items }: { items?: FaqItemContent[] }) {
  const faqList = items && items.length > 0 ? items : FAQ_ITEMS;
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [faqList[0]?.id || "default"]: true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return faqList.filter((item) => {
      const matchesCat =
        selectedCategory === "All" || item.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      const questionMatch = item.question.toLowerCase().includes(q);
      const answerMatch = item.answer.toLowerCase().includes(q);
      return questionMatch || answerMatch;
    });
  }, [faqList, selectedCategory, searchQuery]);

  return (
    <div className="wrapper py-12 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          title="Frequently Asked Questions"
          description="Truth. Community. Answers for your faith journey."
          variant="label"
        />

        {/* Search Bar */}
        <div className="relative mt-8">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword, scripture, or topic..."
            className="w-full rounded-2xl border-2 border-stone-200 bg-white-color px-5 py-4 pl-12 text-sm text-black-color shadow-sm transition-all focus:border-gold-bright focus:outline-none focus:ring-4 focus:ring-gold-bright/10 md:text-base"
          />
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors md:text-sm ${
                  isActive
                    ? "bg-primary-green text-white-color shadow-sm"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "question" : "questions"}
            {selectedCategory !== "All" && ` in “${selectedCategory}”`}
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-primary-green hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
              <p className="text-stone-600 font-medium">
                No matching questions found for &ldquo;{searchQuery}&rdquo;.
              </p>
              <p className="mt-2 text-xs text-stone-500">
                Try searching with different terms or contact our support team.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-primary-green px-4 py-2 text-xs font-medium text-white-color hover:bg-primary-green-deep"
                >
                  Contact Us
                </Link>
                <Link
                  href="/support"
                  className="rounded-full border border-stone-300 bg-white-color px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  Technical Support
                </Link>
              </div>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = Boolean(openIds[item.id]);
              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-stone-200 bg-white-color shadow-sm transition-all hover:border-stone-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-stone-50/50 md:p-6"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <span className="inline-block rounded bg-primary-green/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary-green">
                        {item.category}
                      </span>
                      <h3 className="mt-2 text-base font-semibold text-black-color md:text-lg">
                        {item.question}
                      </h3>
                    </div>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-700 transition-transform duration-200 ${
                        isOpen ? "rotate-180 bg-gold-bright/20 text-gold-bright" : ""
                      }`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-stone-100 bg-stone-50/50 p-5 md:p-6">
                      <div className="whitespace-pre-line text-sm leading-relaxed text-stone-700 md:text-base">
                        {item.answer}
                      </div>

                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="mt-4 rounded-xl border border-stone-200 bg-white-color p-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                            Key Identifiers:
                          </p>
                          <ul className="mt-2 space-y-1.5 text-xs text-stone-700 md:text-sm">
                            {item.keyPoints.map((pt: string) => (
                              <li key={pt} className="flex items-start gap-2">
                                <span className="text-gold-bright font-bold">•</span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.scriptures && item.scriptures.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-stone-500">
                            Scripture References:
                          </span>
                          {item.scriptures.map((scrip: string) => (
                            <span
                              key={scrip}
                              className="rounded-full border border-gold-bright/30 bg-gold-bright/10 px-2.5 py-0.5 text-xs font-medium text-stone-800"
                            >
                              {scrip}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Support Card */}
        <div className="mt-12 rounded-3xl border border-stone-200 bg-primary-green p-8 text-white-color md:p-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-bright">
                Have Another Question?
              </span>
              <MainHeading className="mt-2 text-white-color">
                We’re Here to Help
              </MainHeading>
              <Paragraph className="mt-3 text-stone-200">
                Can’t find the answer you’re looking for? Reach out directly to our
                administrative, pastoral, or technical support team.
              </Paragraph>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
              <Link
                href="/contact"
                className="rounded-full bg-gold-bright px-6 py-3 text-sm font-semibold text-black-color shadow-sm transition hover:bg-gold-bright/90"
              >
                Contact Us
              </Link>
              <Link
                href="/support"
                className="rounded-full border border-white-color/30 bg-white-color/10 px-6 py-3 text-sm font-semibold text-white-color transition hover:bg-white-color/20"
              >
                Technical Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
