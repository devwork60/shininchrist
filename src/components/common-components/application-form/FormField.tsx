import clsx from "clsx";
import type { FormFieldDef } from "@/constant/forms/formTypes";

const control =
  "w-full rounded-md border border-primary-green/20 bg-white-color px-3 py-2.5 text-sm text-text-dark placeholder:text-text-grey focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold";

const SPAN = {
  2: "sm:col-span-2",
  3: "sm:col-span-3",
  6: "sm:col-span-6",
} as const;
const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
} as const;
const WIDE = ["textarea", "radios", "checks", "declaration", "file"];

const Label = ({
  id,
  label,
  required,
}: Pick<FormFieldDef, "id" | "label" | "required">) => (
  <label htmlFor={id} className="text-xs font-medium text-text-dark">
    {label}
    {required && <span className="text-red-600"> *</span>}
  </label>
);

/** One form field. Choice groups render as fieldsets; everything else as label + control. */
const FormField = (field: FormFieldDef) => {
  const {
    id,
    label,
    type,
    required,
    placeholder,
    options = [],
    span,
    columns = 2,
  } = field;
  const wrap = clsx(
    "grid content-start gap-1",
    SPAN[span ?? (WIDE.includes(type) ? 6 : 3)],
  );

  if (type === "declaration") {
    return (
      <div className={wrap}>
        <label className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-md border border-primary-gold/30 bg-primary-gold/5 p-3 text-sm leading-relaxed text-text-dark">
          <input
            type="checkbox"
            name={id}
            required={required ?? true}
            className="mt-1 h-4 w-4 accent-[var(--primary-green)]"
          />
          <span>{label}</span>
        </label>
      </div>
    );
  }

  if (type === "radios" || type === "checks") {
    const kind = type === "radios" ? "radio" : "checkbox";
    return (
      <fieldset className={wrap}>
        <legend className="mb-1 text-xs font-medium text-text-dark">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </legend>
        <div className={clsx("grid gap-x-4 gap-y-2", COLUMNS[columns])}>
          {options.map((option, index) => (
            <label
              key={option}
              className="grid grid-cols-[auto_1fr] items-start gap-2 text-sm text-text-dark"
            >
              <input
                type={kind}
                name={id}
                value={option}
                required={kind === "radio" && required && index === 0}
                className="mt-1 h-4 w-4 accent-[var(--primary-green)]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <div className={wrap}>
      <Label id={id} label={label} required={required} />
      {type === "select" ? (
        <select
          id={id}
          name={id}
          required={required}
          defaultValue=""
          className={control}
        >
          <option value="" disabled>
            {placeholder ?? "Select an option"}
          </option>
          {options.map((option) => (
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
          className={control}
        />
      ) : type === "file" ? (
        <input
          id={id}
          name={id}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="text-xs text-text-dark file:mr-3 file:rounded-md file:border file:border-primary-green/30 file:bg-white-color file:px-3 file:py-1.5 file:text-xs"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className={control}
        />
      )}
    </div>
  );
};

export default FormField;
