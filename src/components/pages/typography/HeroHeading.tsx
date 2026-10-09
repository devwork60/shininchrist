import { forwardRef } from "react";
import clsx from "clsx";

interface HeroHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  /** Extra-large title for image-led heroes (audience chapter pages) */
  large?: boolean;
  /** Smaller title for heroes with a long two-line heading */
  compact?: boolean;
}

/** Page title — renders the single <h1> of a page. Use only inside hero sections. */
const HeroHeading = forwardRef<HTMLHeadingElement, HeroHeadingProps>(
  (
    {
      children,
      className,
      style,
      large = false,
      compact = false,
      as: Component = "h1",
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-bold font-heading text-white-color tracking-[-0.5px] leading-[1.1]",
        compact
          ? "text-3xl md:text-4xl lg:text-5xl xl:text-[56px]"
          : large
            ? "text-5xl md:text-6xl lg:text-7xl xl:text-[88px] 2xl:text-[104px]"
            : "text-4xl md:text-[40px] lg:text-5xl xl:text-[64px] 2xl:text-[72px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

HeroHeading.displayName = "HeroHeading";

export default HeroHeading;
