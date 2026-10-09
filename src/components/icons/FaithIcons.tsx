import React from "react";

export type FaithIconName = keyof typeof icons;

interface IconProps {
  name: FaithIconName;
  className?: string;
}

const svgProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  trinity: (
    <svg {...svgProps}>
      <circle cx="12" cy="8.3" r="4.3" />
      <circle cx="8" cy="15.2" r="4.3" />
      <circle cx="16" cy="15.2" r="4.3" />
    </svg>
  ),
  bible: (
    <svg {...svgProps}>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" />
      <path d="M12 6.5v13" />
    </svg>
  ),
  cross: (
    <svg {...svgProps} strokeWidth={2}>
      <path d="M12 3v18M7 8.5h10" />
    </svg>
  ),
};

const FaithIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default FaithIcons;
