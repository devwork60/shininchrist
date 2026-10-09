import clsx from "clsx";

interface JoinFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  span?: 1 | 2;
  /** Starting value (saved data when the applicant comes back). */
  defaultValue?: string;
  /** Controlled mode, used by the date of birth so the form can react to age as it is typed. */
  value?: string;
  onChange?: (value: string) => void;
}

const control =
  "w-full rounded-md border border-primary-green/20 bg-white-color px-3 py-2.5 text-sm text-text-dark placeholder:text-text-grey focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold";

const JoinField = ({
  id,
  label,
  type = "text",
  options,
  placeholder,
  required = true,
  span = 1,
  defaultValue,
  value,
  onChange,
}: JoinFieldProps) => (
  <div
    className={clsx("grid content-start gap-1", span === 2 && "sm:col-span-2")}
  >
    <label htmlFor={id} className="text-xs font-medium text-text-dark">
      {label}
      {required && <span className="text-red-600"> *</span>}
    </label>
    {options ? (
      <select
        id={id}
        name={id}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={control}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : value !== undefined ? (
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={control}
      />
    ) : (
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        min={type === "number" ? 1 : undefined}
        className={control}
      />
    )}
  </div>
);

export default JoinField;
