import { forwardRef } from "react";
import clsx from "clsx";

interface FooterHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Uppercase gold column title used in the footer. */
const FooterHeading = forwardRef<HTMLHeadingElement, FooterHeadingProps>(
  ({ children, className, style, as: Component = "h3", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-bold font-sans text-gold-bright uppercase tracking-[0.5px] leading-[1.3]",
        "text-base lg:text-[15px] xl:whitespace-nowrap",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

FooterHeading.displayName = "FooterHeading";

export default FooterHeading;
