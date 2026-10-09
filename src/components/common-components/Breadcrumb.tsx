import Link from "next/link";

interface BreadcrumbProps {
  items: readonly { label: string; href: string }[];
}

/** "Home › Daily › Today" trail; the last item is the current page. */
const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex items-center gap-2 text-sm text-text-grey">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <li key={item.href} className="flex items-center gap-2">
            {last ? (
              <span
                aria-current="page"
                className="font-semibold text-primary-gold"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="transition-colors hover:text-primary-green"
              >
                {item.label}
              </Link>
            )}
            {!last && <span aria-hidden="true">›</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumb;
