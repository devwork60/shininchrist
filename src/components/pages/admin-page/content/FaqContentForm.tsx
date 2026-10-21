"use client";

import { useState } from "react";
import type { FaqItemContent } from "@/lib/site-content-schema";
import { FAQ_CATEGORIES } from "@/constant/faqData";
import { Field, SaveBar, Section, inputClass, useSection } from "./contentUi";

export const FaqContentForm = ({
  initial,
}: {
  initial: FaqItemContent[];
}) => {
  const [items, setItems] = useState<FaqItemContent[]>(initial);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { busy, message, save } = useSection("faqs");

  const query = filterQuery.toLowerCase().trim();
  const filtered = items.filter((item) => {
    const matchesCat =
      filterCategory === "All" || item.category === filterCategory;
    const matchesQuery =
      query === "" ||
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  const updateItem = (id: string, patch: Partial<FaqItemContent>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  const deleteItem = (id: string) => {
    if (!confirm("Are you sure you want to remove this FAQ item?")) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addNew = () => {
    const newId = `faq-${Date.now()}`;
    const newItem: FaqItemContent = {
      id: newId,
      category: filterCategory === "All" ? "About ShininChrist" : filterCategory,
      question: "New Frequently Asked Question",
      answer: "Provide the detailed answer here.",
    };
    setItems([newItem, ...items]);
    setExpandedId(newId);
  };

  return (
    <Section
      title="Frequently Asked Questions (FAQ) Manager"
      hint="Add, edit, reorder or remove questions displayed on the public /faqs page. Changes are reflected immediately upon saving."
    >
      <div className="grid gap-4">
        {/* Controls Bar: Filter, Category, Add New */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search questions or answers…"
              className={`${inputClass} sm:max-w-xs`}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`${inputClass} sm:max-w-[200px]`}
            >
              {FAQ_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={addNew}
            className="rounded-md border border-primary-green bg-primary-green px-4 py-2 text-xs font-semibold text-white-color hover:bg-primary-green-deep"
          >
            + Add New Question
          </button>
        </div>

        <p className="text-xs text-text-grey">
          Showing {filtered.length} of {items.length} total FAQ items.
        </p>

        {/* FAQ List */}
        <div className="max-h-[600px] divide-y divide-black/5 overflow-y-auto rounded-lg border border-black/10 p-2">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-sm text-text-grey">
              No questions matched your search.
            </p>
          ) : (
            filtered.map((item) => {
              const isOpen = expandedId === item.id;
              return (
                <div key={item.id} className="py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isOpen ? null : item.id)}
                      className="flex flex-1 items-center gap-2 text-left font-semibold text-sm text-primary-green hover:text-primary-gold"
                    >
                      <span className="text-xs text-primary-gold uppercase font-mono">
                        [{item.category}]
                      </span>
                      <span className="truncate">{item.question}</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isOpen ? null : item.id)}
                        className="rounded px-2 py-1 text-xs text-text-grey hover:bg-black/5"
                      >
                        {isOpen ? "Collapse" : "Edit"}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-3 grid gap-3 rounded-md bg-cream/40 p-3">
                      <Field label="Category">
                        <input
                          className={inputClass}
                          value={item.category}
                          onChange={(e) =>
                            updateItem(item.id, { category: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Question">
                        <input
                          className={inputClass}
                          value={item.question}
                          onChange={(e) =>
                            updateItem(item.id, { question: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Detailed Answer (supports paragraphs)">
                        <textarea
                          rows={4}
                          className={inputClass}
                          value={item.answer}
                          onChange={(e) =>
                            updateItem(item.id, { answer: e.target.value })
                          }
                        />
                      </Field>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <SaveBar busy={busy} message={message} onSave={() => save(items)} />
      </div>
    </Section>
  );
};

export default FaqContentForm;
