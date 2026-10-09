import { forwardRef } from "react";
import clsx from "clsx";

interface FooterTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Light body text used on the dark footer. */
const FooterText = forwardRef<HTMLParagraphElement, FooterTextProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-normal font-sans text-white-color/90 leading-[1.6]",
        "text-sm lg:text-[15px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

FooterText.displayName = "FooterText";

export default FooterText;
