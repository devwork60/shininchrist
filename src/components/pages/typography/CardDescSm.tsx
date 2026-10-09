import { forwardRef } from "react";
import clsx from "clsx";

interface CardDescSmProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const CardDescSm = forwardRef<HTMLParagraphElement, CardDescSmProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-normal font-sans text-text-grey leading-[150%]",
        "text-sm lg:text-[15px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

CardDescSm.displayName = "CardDescSm";

export default CardDescSm;
