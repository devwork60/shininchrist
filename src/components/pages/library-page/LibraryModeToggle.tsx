import React from "react";

interface LibraryModeToggleProps {
  isMember: boolean;
  onToggle: (isMember: boolean) => void;
}

const LibraryModeToggle: React.FC<LibraryModeToggleProps> = ({
  isMember,
  onToggle,
}) => (
  <div className="sticky top-[74px] z-20 border-b border-[var(--gold-bright)]/20 bg-[var(--primary-green-deep)] px-4 py-2.5 text-white-color shadow-md transition-colors">
    <div className="wrapper flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--gold-bright)] sm:text-sm">
        <span className="flex h-2 w-2 animate-pulse rounded-full bg-[var(--gold-bright)]" />
        <span>Demo View Switcher (No Backend Active)</span>
      </div>

      <div className="flex items-center rounded-full bg-black/40 p-1 ring-1 ring-white/15">
        <button
          type="button"
          onClick={() => onToggle(false)}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all sm:text-sm ${
            !isMember
              ? "bg-red-700 text-white shadow-md"
              : "text-white/70 hover:text-white"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-red-400" />
          NON-MEMBER VIEW
        </button>

        <button
          type="button"
          onClick={() => onToggle(true)}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all sm:text-sm ${
            isMember
              ? "bg-[var(--primary-green)] text-white shadow-md"
              : "text-white/70 hover:text-white"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          MEMBER VIEW
        </button>
      </div>
    </div>
  </div>
);

export default LibraryModeToggle;
