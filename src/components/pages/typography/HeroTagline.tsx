import { forwardRef } from "react";
import clsx from "clsx";

interface HeroTaglineProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Serif tagline line shown under a hero heading. */
const HeroTagline = forwardRef<HTMLParagraphElement, HeroTaglineProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-normal font-heading text-white-color leading-[1.4]",
        "text-lg md:text-xl lg:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

HeroTagline.displayName = "HeroTagline";

export default HeroTagline;
