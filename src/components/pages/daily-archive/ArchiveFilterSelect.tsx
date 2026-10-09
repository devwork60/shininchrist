import UiIcons from "@/components/icons/UiIcons";

interface ArchiveFilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  options: { value: string; label: string }[];
}

/** Native select styled like the design, with a chevron. */
const ArchiveFilterSelect = ({
  label,
  value,
  onChange,
  allLabel,
  options,
}: ArchiveFilterSelectProps) => (
  <div className="relative">
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl border border-primary-green/20 bg-white-color px-4 py-3 pr-10 font-sans text-sm text-text-dark outline-none transition-colors focus:border-primary-green"
    >
      <option value="">{allLabel}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <UiIcons
      name="chevronDown"
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-dark"
    />
  </div>
);

export default ArchiveFilterSelect;
