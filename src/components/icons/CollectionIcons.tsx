import React from "react";

export type CollectionIconName = keyof typeof icons;

interface IconProps {
  name: CollectionIconName;
  className?: string;
}

const svgProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  compass: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.500 8.500l-2 5-5 2 2-5 5-2z" />
    </svg>
  ),
  cross: (
    <svg {...svgProps} strokeWidth={2.4}>
      <path d="M12 3.500v17M6.500 9h11" />
    </svg>
  ),
  bulb: (
    <svg {...svgProps}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.500 10.900c.6.5 1 1.200 1 2V16h5v-.1c0-.8.4-1.500 1-2A6 6 0 0 0 12 3z" />
    </svg>
  ),
  heart: (
    <svg {...svgProps}>
      <path d="M12 20s-7.500-4.600-7.500-10.200A4.300 4.300 0 0 1 12 7.100a4.300 4.300 0 0 1 7.500 2.700C19.500 15.400 12 20 12 20z" />
    </svg>
  ),
  people: (
    <svg {...svgProps}>
      <circle cx="12" cy="7" r="2.600" />
      <circle cx="5.500" cy="10.500" r="2.100" />
      <circle cx="18.500" cy="10.500" r="2.100" />
      <path d="M7.500 19c0-2.800 2-4.600 4.500-4.600s4.500 1.800 4.500 4.600" />
      <path d="M1.800 18c.1-2 1.600-3.400 3.700-3.400M22.200 18c-.1-2-1.600-3.400-3.700-3.400" />
    </svg>
  ),
  music: (
    <svg {...svgProps}>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.500" cy="18" r="2.500" />
      <circle cx="16.500" cy="16" r="2.500" />
    </svg>
  ),
};

const CollectionIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default CollectionIcons;
