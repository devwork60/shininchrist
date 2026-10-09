import { forwardRef } from "react";
import clsx from "clsx";

interface CardHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(
  ({ children, className, style, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-semibold font-heading text-card-heading leading-[1.4] md:leading-[1.3]",
        "text-xl md:text-xl lg:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

CardHeading.displayName = "CardHeading";

export default CardHeading;
