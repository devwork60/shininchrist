import { forwardRef } from "react";
import clsx from "clsx";

interface CardTitleSmProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Compact bold sans card title (used where the serif CardHeading is too large). */
const CardTitleSm = forwardRef<HTMLHeadingElement, CardTitleSmProps>(
  ({ children, className, style, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-bold font-sans text-card-heading leading-[1.35]",
        "text-base lg:text-[17px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

CardTitleSm.displayName = "CardTitleSm";

export default CardTitleSm;
