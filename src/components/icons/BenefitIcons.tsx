import React from "react";

export type BenefitIconName = keyof typeof icons;

interface IconProps {
  name: BenefitIconName;
  className?: string;
}

const svgProps = {
  width: 38,
  height: 38,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  people: (
    <svg {...svgProps}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9.500" r="2.300" />
      <path d="M3 20c0-3.500 2.700-6 6-6s6 2.500 6 6M15.500 14.500c2.800.2 5.500 1.800 5.500 5" />
    </svg>
  ),
  globe: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.500 2.500 3.700 5.500 3.700 9s-1.200 6.500-3.700 9c-2.500-2.500-3.700-5.500-3.700-9S9.500 5.500 12 3zM5 7.500c2 1 4.500 1.500 7 1.500s5-.5 7-1.500M5 16.500c2-1 4.500-1.500 7-1.500s5 .5 7 1.500" />
    </svg>
  ),
  cap: (
    <svg {...svgProps}>
      <path d="M2 9.500 12 5l10 4.500L12 14 2 9.500z" />
      <path d="M6.500 11.800v4.200c0 1.200 2.500 2.500 5.500 2.500s5.500-1.300 5.500-2.500v-4.200M22 9.500V15" />
    </svg>
  ),
  bars: (
    <svg {...svgProps}>
      <rect x="3.500" y="13" width="4" height="7.500" />
      <rect x="10" y="8" width="4" height="12.500" />
      <rect x="16.500" y="3.500" width="4" height="17" />
      <path d="M3 22h18" />
    </svg>
  ),
  heart: (
    <svg {...svgProps}>
      <path d="M12 20.500s-8.500-5-8.500-11A4.800 4.800 0 0 1 12 6.800a4.800 4.800 0 0 1 8.500 2.700c0 6-8.500 11-8.500 11z" />
    </svg>
  ),
  ribbon: (
    <svg {...svgProps}>
      <circle cx="12" cy="9" r="6" />
      <circle cx="12" cy="9" r="3.200" />
      <path d="M8.500 14l-1.500 7 5-2.500 5 2.500-1.500-7" />
    </svg>
  ),
};

const BenefitIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default BenefitIcons;
