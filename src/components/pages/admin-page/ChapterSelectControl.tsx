"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ChapterSelectControlProps {
  userId: string;
  initialChapter: string | null;
}

export default function ChapterSelectControl({
  userId,
  initialChapter,
}: ChapterSelectControlProps) {
  const router = useRouter();
  const [currentChapter, setCurrentChapter] = useState(initialChapter ?? "");
  const [selectedChapter, setSelectedChapter] = useState(initialChapter ?? "men");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/members/${userId}/chapter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapter: selectedChapter }),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentChapter(selectedChapter);
        setIsEditing(false);
        setMessage("Chapter updated.");
        router.refresh();
      } else {
        setMessage(data.error ?? "Failed to update chapter.");
      }
    } catch {
      setMessage("Network error.");
    }
    setSaving(false);
  };

  const label = (c: string) =>
    c === "men"
      ? "Men's Chapter"
      : c === "women"
        ? "Women's Chapter"
        : c === "youth"
          ? "Youth Chapter"
          : "Not assigned";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!isEditing ? (
        <>
          <span className="font-semibold text-primary-green capitalize">
            {label(currentChapter)}
          </span>
          <button
            type="button"
            onClick={() => {
              setSelectedChapter(currentChapter || "men");
              setIsEditing(true);
              setMessage("");
            }}
            className="rounded border border-stone-300 bg-white-color px-2.5 py-0.5 text-xs font-semibold text-stone-700 hover:bg-stone-50"
          >
            Change
          </button>
          {message && (
            <span className="text-xs text-primary-green font-medium ml-1">
              {message}
            </span>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="rounded-lg border border-stone-300 bg-white-color px-2.5 py-1 text-xs text-black-color focus:border-gold-bright focus:outline-none"
          >
            <option value="men">Men&apos;s Chapter</option>
            <option value="women">Women&apos;s Chapter</option>
            <option value="youth">Youth Chapter</option>
          </select>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="rounded-lg bg-primary-green px-3 py-1 text-xs font-semibold text-white-color hover:bg-primary-green-deep disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="rounded-lg border border-stone-300 bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600 hover:bg-stone-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
