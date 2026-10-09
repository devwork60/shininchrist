import { forwardRef } from "react";
import clsx from "clsx";

interface SectionSubtextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const SectionSubtext = forwardRef<HTMLParagraphElement, SectionSubtextProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-normal font-sans text-text-dark leading-[160%]",
        "text-sm md:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

SectionSubtext.displayName = "SectionSubtext";

export default SectionSubtext;
