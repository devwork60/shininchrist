import { forwardRef } from "react";
import clsx from "clsx";

interface StepTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Compact serif title for a numbered step card. */
const StepTitle = forwardRef<HTMLHeadingElement, StepTitleProps>(
  ({ children, className, style, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-bold font-heading text-primary-green leading-[1.2]",
        "text-lg lg:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

StepTitle.displayName = "StepTitle";

export default StepTitle;
