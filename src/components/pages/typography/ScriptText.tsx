import { forwardRef } from "react";
import clsx from "clsx";

interface ScriptTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

/** Handwritten-style accent text (taglines, sign-offs). */
const ScriptText = forwardRef<HTMLParagraphElement, ScriptTextProps>(
  ({ children, className, style, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref}
      style={style}
      className={clsx(
        "font-medium font-script text-primary-green leading-[1.15]",
        "text-3xl lg:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);

ScriptText.displayName = "ScriptText";

export default ScriptText;
