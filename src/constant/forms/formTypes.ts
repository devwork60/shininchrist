export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "date"
  | "number"
  | "select"
  | "textarea"
  | "file"
  | "radios"
  | "checks"
  | "declaration";

export interface FormFieldDef {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  /** Choices for select / radios / checks */
  options?: string[];
  /** Columns taken in the 6-column grid on wide screens (default: 3 for short inputs, 6 for the rest) */
  span?: 2 | 3 | 6;
  /** Columns for radios / checks lists */
  columns?: 2 | 3;
}

export interface FormSection {
  title: string;
  intro?: string;
  fields: FormFieldDef[];
}

export interface FormConfig {
  id: string;
  title: string;
  intro: string;
  sections: FormSection[];
  submit: string;
  successTitle: string;
  successText: string;
  footnote?: string;
  /** When set, the form posts its fields as JSON to this API route and follows the returned { url }. */
  submitTo?: string;
}

export const AGE_GROUPS = ["Under 18", "18-24", "25-39", "40-59", "60+"];
export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
