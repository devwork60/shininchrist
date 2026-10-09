import { forwardRef } from "react";
import clsx from "clsx";

interface MainHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const MainHeading = forwardRef<HTMLHeadingElement, MainHeadingProps>(
  ({ children, className, style, as: Component = "h2", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-bold font-heading text-text-dark tracking-[-0.5px] leading-[1.3] lg:leading-[60px] xl:leading-[76px]",
        "text-[32px] md:text-[36px] lg:text-[48px]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

MainHeading.displayName = "MainHeading";

export default MainHeading;
