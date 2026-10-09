import { forwardRef } from "react";
import clsx from "clsx";

interface SectionLabelProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const SectionLabel = forwardRef<HTMLHeadingElement, SectionLabelProps>(
  ({ children, className, style, as: Component = "h2", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-semibold font-heading uppercase text-text-dark tracking-[0.5px] leading-[1.3]",
        "text-xl md:text-2xl lg:text-[26px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

SectionLabel.displayName = "SectionLabel";

export default SectionLabel;
