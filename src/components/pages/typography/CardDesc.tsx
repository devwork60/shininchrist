import { forwardRef } from "react";
import clsx from "clsx";

interface CardDescProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const CardDesc = forwardRef<HTMLParagraphElement, CardDescProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-normal font-sans text-text-grey leading-[170%] lg:leading-[28px]",
        "text-base lg:text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

CardDesc.displayName = "CardDesc";

export default CardDesc;
