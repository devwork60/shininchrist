import React from "react";

export type FocusIconName = keyof typeof icons;

interface IconProps {
  name: FocusIconName;
  className?: string;
}

const svgProps = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  cross: (
    <svg {...svgProps}>
      <path d="M12 3.5v17M7 9h10" />
    </svg>
  ),
  people: (
    <svg {...svgProps}>
      <circle cx="12" cy="7.5" r="2.6" />
      <circle cx="5.5" cy="11" r="2.1" />
      <circle cx="18.5" cy="11" r="2.1" />
      <path d="M7.5 19c0-2.8 2-4.6 4.5-4.6s4.5 1.8 4.5 4.6" />
      <path d="M1.8 18c.1-2 1.6-3.4 3.7-3.4M22.2 18c-.1-2-1.6-3.4-3.7-3.4" />
    </svg>
  ),
  heartCheck: (
    <svg {...svgProps}>
      <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z" />
      <path d="M9 12.5l2.2 2.2L15.5 10" />
    </svg>
  ),
  family: (
    <svg {...svgProps}>
      <circle cx="8" cy="6" r="2" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="12" cy="12.5" r="1.5" />
      <path d="M5 20v-6.5a3 3 0 0 1 6 0V20M13 20v-6.5a3 3 0 0 1 6 0V20" />
    </svg>
  ),
  mentor: (
    <svg {...svgProps}>
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="17" cy="9" r="2" />
      <path d="M4 20c0-3.3 2.2-5.5 5-5.5s5 2.200 5 5.500M15 15c2.600 0 5 1.600 5 4.500" />
    </svg>
  ),
  briefcase: (
    <svg {...svgProps}>
      <rect x="3.5" y="8" width="17" height="11.5" rx="2" />
      <path d="M9 8V6a1.500 1.500 0 0 1 1.500-1.500h3A1.500 1.500 0 0 1 15 6v2M3.500 13h17" />
    </svg>
  ),
  star: (
    <svg {...svgProps}>
      <path d="M12 3.500l2.600 5.300 5.800.8-4.200 4.100 1 5.800L12 16.800l-5.200 2.700 1-5.800-4.200-4.100 5.800-.8z" />
    </svg>
  ),
  heartPulse: (
    <svg {...svgProps}>
      <path d="M12 20s-7.500-4.600-7.500-10.200A4.300 4.300 0 0 1 12 7.100a4.300 4.300 0 0 1 7.500 2.700C19.500 15.400 12 20 12 20z" />
      <path d="M7.500 12h2l1.200-2.200 2 4.200 1.300-2h2.500" />
    </svg>
  ),
  handsHeart: (
    <svg {...svgProps}>
      <path d="M12 10.500s-3.300-2-3.300-4.400A1.900 1.900 0 0 1 12 5a1.900 1.900 0 0 1 3.300 1.100c0 2.400-3.300 4.400-3.300 4.400z" />
      <path d="M2.500 14c1.800-.6 3.500-.3 5 .5l3 1.500h3.500c1 0 1.500 1.100.8 1.800" />
      <path d="M2.500 19.500l5-1.300 5.500 1.600 8-4.600c.7-.4.800-1.300.2-1.800-.5-.5-1.300-.5-1.900-.2L15 15" />
    </svg>
  ),
  sports: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="8.500" />
      <path d="M12 3.500c2.500 2.500 3.500 5.300 3.500 8.500s-1 6-3.500 8.500M12 3.500C9.500 6 8.500 8.800 8.500 12s1 6 3.500 8.500M3.500 12h17" />
    </svg>
  ),
};

const FocusIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default FocusIcons;
