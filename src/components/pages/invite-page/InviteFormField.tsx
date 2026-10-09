import clsx from "clsx";
import type { InviteField } from "@/constant/inviteMercyData";

const controlClass =
  "w-full rounded-md border border-primary-green/20 bg-white-color px-3 py-2 text-sm text-text-dark placeholder:text-text-grey focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold";

const SPAN_CLASS = {
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  6: "sm:col-span-6",
} as const;

const InviteFormField = ({
  id,
  label,
  type,
  required,
  placeholder,
  options,
  span = 2,
}: InviteField) => (
  <div className={clsx("grid content-start gap-1", SPAN_CLASS[span])}>
    <label htmlFor={id} className="text-xs font-medium text-text-dark">
      {label}
      {required && <span className="text-red-600"> *</span>}
    </label>

    {type === "select" ? (
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        className={controlClass}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        rows={4}
        className={controlClass}
      />
    ) : type === "file" ? (
      <input
        id={id}
        name={id}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg"
        className="text-xs text-text-dark file:mr-3 file:rounded-md file:border file:border-primary-green/30 file:bg-white-color file:px-3 file:py-1.5 file:text-xs"
      />
    ) : (
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={controlClass}
      />
    )}
  </div>
);

export default InviteFormField;
