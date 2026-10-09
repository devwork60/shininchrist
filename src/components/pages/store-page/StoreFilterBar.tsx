import clsx from "clsx";
import { STORE_TAGS } from "@/constant/storeData";

interface StoreFilterBarProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

/** Category pills. One scrolling row on small screens, so nothing wraps. */
const StoreFilterBar = ({ activeTag, onTagChange }: StoreFilterBarProps) => (
  <div className="border-b border-primary-green/10 bg-white-color py-4 shadow-sm">
    <div className="wrapper">
      <div className="flex items-center gap-2 overflow-x-auto sm:gap-3">
        {STORE_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagChange(tag)}
            aria-pressed={activeTag === tag}
            className={clsx(
              "shrink-0 rounded-full px-5 py-2 text-xs font-semibold transition-colors sm:text-sm",
              activeTag === tag
                ? "bg-primary-green-deep text-white-color shadow-md"
                : "bg-cream text-text-dark hover:bg-primary-gold/15",
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default StoreFilterBar;
