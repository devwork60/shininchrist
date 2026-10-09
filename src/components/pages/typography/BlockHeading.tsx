import { forwardRef } from "react";
import clsx from "clsx";

interface BlockHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Medium serif heading for a content block inside a section (not a full section title). */
const BlockHeading = forwardRef<HTMLHeadingElement, BlockHeadingProps>(
  ({ children, className, style, as: Component = "h2", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-bold font-heading text-primary-green leading-[1.2]",
        "text-2xl md:text-[28px] lg:text-[30px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

BlockHeading.displayName = "BlockHeading";

export default BlockHeading;
