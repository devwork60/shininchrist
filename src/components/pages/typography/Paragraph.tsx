import { forwardRef } from "react";
import clsx from "clsx";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-normal font-sans text-text-grey leading-[170%] md:leading-6 lg:leading-9",
        "text-base md:text-base lg:text-xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

Paragraph.displayName = "Paragraph";

export default Paragraph;
