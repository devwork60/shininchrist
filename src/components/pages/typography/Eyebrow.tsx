import { forwardRef } from "react";
import clsx from "clsx";

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Small uppercase label shown above a heading. */
const Eyebrow = forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-semibold font-sans text-gold-bright uppercase tracking-[0.18em] leading-[1.3]",
        "text-xs md:text-sm",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

Eyebrow.displayName = "Eyebrow";

export default Eyebrow;
