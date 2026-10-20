import type { LibraryResourceView } from "@/lib/library";
import DownloadControl from "./DownloadControl";

const size = (bytes: number | null) =>
  bytes === null ? "" : bytes > 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/** One downloadable resource. */
const ResourceCard = ({
  resource,
  currency,
}: {
  resource: LibraryResourceView;
  currency: string;
}) => (
  <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="flex flex-1 flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-green-deep)]">
          {resource.contentType}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            resource.access === "free"
              ? "bg-[var(--primary-green-deep)]/10 text-[var(--primary-green-deep)]"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {resource.access === "free" ? "Free" : "Give what you can"}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-bold text-gray-900">{resource.title}</h3>
      {resource.description && (
        <p className="mt-2 text-sm text-gray-600">{resource.description}</p>
      )}
      {resource.scripture && (
        <p className="mt-2 text-xs italic text-gray-500">{resource.scripture}</p>
      )}
      <p className="mt-3 text-xs text-gray-500">
        {resource.fileName}
        {resource.fileSize ? ` · ${size(resource.fileSize)}` : ""}
      </p>
    </div>
    <div className="border-t border-gray-100 p-5">
      <DownloadControl resource={resource} currency={currency} />
    </div>
  </article>
);

export default ResourceCard;
