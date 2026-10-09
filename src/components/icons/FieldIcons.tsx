import React from "react";

export type FieldIconName = keyof typeof icons;

interface IconProps {
  name: FieldIconName;
  className?: string;
}

const svgProps = {
  width: 40,
  height: 40,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  cross: (
    <svg {...svgProps} fill="currentColor" strokeWidth={0.4}>
      <path d="M10.500 2.500h3v5.500H19v3h-5.500v10.500h-3V11H5V8h5.500z" />
    </svg>
  ),
  book: (
    <svg {...svgProps}>
      <path d="M12 6.500C10 5 7 4.500 3 5v13c4-.500 7 0 9 1.500 2-1.500 5-2 9-1.500V5c-4-.500-7 0-9 1.500z" />
      <path d="M12 6.500v13M6 8.500c1.500 0 3 .3 4.500 1M6 11.500c1.500 0 3 .3 4.500 1M18 8.500c-1.500 0-3 .3-4.500 1M18 11.500c-1.500 0-3 .3-4.500 1" />
    </svg>
  ),
  atom: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="1.600" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="3.600" />
      <ellipse cx="12" cy="12" rx="9" ry="3.600" transform="rotate(60 12 12)" />
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.600"
        transform="rotate(120 12 12)"
      />
    </svg>
  ),
  people: (
    <svg {...svgProps} fill="currentColor" strokeWidth={0.4}>
      <circle cx="12" cy="7" r="3" />
      <circle cx="5.500" cy="10" r="2.300" />
      <circle cx="18.500" cy="10" r="2.300" />
      <path d="M6.500 20c0-3.300 2.500-5.500 5.500-5.500s5.500 2.200 5.500 5.500z" />
      <path d="M1.500 18.500c.1-2.400 1.800-3.900 4-3.900.9 0 1.600.2 2.200.6-1.100 1-1.800 2.100-2 3.300zM22.500 18.500c-.1-2.400-1.800-3.900-4-3.900-.9 0-1.600.2-2.200.6 1.100 1 1.800 2.100 2 3.300z" />
    </svg>
  ),
  laptop: (
    <svg {...svgProps}>
      <rect x="4.500" y="5" width="15" height="10.500" rx="1.500" />
      <path d="M2.500 19h19l-1.500-3.500H4z" />
      <path d="M8 9.500l1.500 1.500L8 12.500M11.500 12.500h3" />
    </svg>
  ),
  gears: (
    <svg {...svgProps}>
      <circle cx="9" cy="9" r="2.500" />
      <path d="M9 3.500v1.800M9 12.700v1.800M3.500 9h1.800M12.700 9h1.800M5.100 5.100l1.300 1.300M11.600 11.600l1.300 1.300M12.900 5.100l-1.300 1.300M6.400 11.600l-1.300 1.300" />
      <circle cx="16.500" cy="16.500" r="2" />
      <path d="M16.500 12.800v1.200M16.500 19v1.200M12.800 16.500H14M19 16.500h1.200M13.900 13.900l.9.9M18.200 18.200l.9.9M19.100 13.900l-.9.9M14.800 18.200l-.9.9" />
    </svg>
  ),
};

const FieldIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default FieldIcons;
