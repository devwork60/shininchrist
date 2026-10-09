interface PreviewLinkProps {
  url?: string;
}

/** Plays a preview through the supplied link. Without a link yet it shows "Preview coming soon". */
const PreviewLink = ({ url }: PreviewLinkProps) =>
  url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-green hover:text-primary-gold"
    >
      <span aria-hidden="true">▶</span> Play preview
    </a>
  ) : (
    <span className="inline-flex items-center gap-2 text-sm text-text-grey">
      <span aria-hidden="true">▶</span> Preview coming soon
    </span>
  );

export default PreviewLink;
