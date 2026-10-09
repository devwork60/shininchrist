import { forwardRef } from "react";
import clsx from "clsx";

interface SubHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const SubHeading = forwardRef<HTMLHeadingElement, SubHeadingProps>(
  ({ children, className, style, as: Component = "h2", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-semibold font-heading text-text-dark tracking-[-0.5px] leading-[1.3] lg:leading-[52px]",
        "text-[28px] md:text-[32px] lg:text-[40px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

SubHeading.displayName = "SubHeading";

export default SubHeading;
