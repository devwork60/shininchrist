import React from "react";
import { LIBRARY_TAGS } from "@/constant/libraryMemberData";

interface LibraryFilterBarProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

const LibraryFilterBar: React.FC<LibraryFilterBarProps> = ({
  activeTag,
  onTagChange,
}) => (
  <div className="border-b border-gray-200 bg-white py-4 shadow-sm">
    <div className="wrapper">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {LIBRARY_TAGS.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onTagChange(tag)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? "bg-[var(--primary-green-deep)] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default LibraryFilterBar;
