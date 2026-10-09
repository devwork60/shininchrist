import React from "react";

export type ResourceIconName = keyof typeof icons;

interface IconProps {
  name: ResourceIconName;
  className?: string;
}

const svgProps = {
  width: 34,
  height: 34,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  read: (
    <svg {...svgProps}>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" />
      <path d="M12 6.5v13" />
    </svg>
  ),
  watch: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l5.5-3.5L10 8.5z" />
    </svg>
  ),
  listen: (
    <svg {...svgProps}>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3.5" y="14" width="4" height="6" rx="1.5" />
      <rect x="16.5" y="14" width="4" height="6" rx="1.5" />
    </svg>
  ),
  download: (
    <svg {...svgProps}>
      <path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </svg>
  ),
  cap: (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 9.5 12 5l10 4.5L12 14 2 9.5z" />
      <path d="M6.5 11.8v4.2c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.2" />
      <path d="M22 9.5V15" />
    </svg>
  ),
};

const ResourceIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default ResourceIcons;
