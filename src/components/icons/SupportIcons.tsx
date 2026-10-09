import React from "react";

export type SupportIconName = keyof typeof icons;

interface IconProps {
  name: SupportIconName;
  className?: string;
}

const svgProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  academic: (
    <svg {...svgProps}>
      <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5z" />
      <path d="M6.5 11.8v4.2c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.2M22 9.5V15" />
    </svg>
  ),
  mentorship: (
    <svg {...svgProps}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9.5" r="2.3" />
      <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15.5 14.5c2.8.2 5.5 1.8 5.5 5" />
    </svg>
  ),
  resources: (
    <svg {...svgProps}>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" />
      <path d="M12 6.5v13" />
    </svg>
  ),
  community: (
    <svg {...svgProps}>
      <rect x="3" y="5" width="18" height="11" rx="2" />
      <path d="M8 20h8M12 16v4M8 9.5h8M8 12.5h5" />
    </svg>
  ),
  career: (
    <svg {...svgProps}>
      <path d="M12 3l2 5.5 5.5.5-4.2 3.7 1.3 5.5L12 15l-4.6 3.2 1.3-5.5L4.5 9l5.5-.5z" />
      <path d="M12 18.5V21" />
    </svg>
  ),
  future: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
};

const SupportIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default SupportIcons;
