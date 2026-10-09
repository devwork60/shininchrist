import { forwardRef } from "react";
import clsx from "clsx";

interface QuoteTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Italic serif scripture / quotation text. */
const QuoteText = forwardRef<HTMLParagraphElement, QuoteTextProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-normal italic font-heading text-white-color leading-[1.55]",
        "text-sm md:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

QuoteText.displayName = "QuoteText";

export default QuoteText;
