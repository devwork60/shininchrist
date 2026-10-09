import React from "react";

export type ChapterPillarIconName = keyof typeof icons;

interface IconProps {
  name: ChapterPillarIconName;
  className?: string;
}

const svgProps = {
  width: 54,
  height: 54,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  cross: (
    <svg {...svgProps} fill="currentColor" strokeWidth={0.5}>
      <path d="M10.500 2.500h3v5h5v3h-5v11h-3v-11h-5v-3h5z" />
    </svg>
  ),
  people: (
    <svg {...svgProps} fill="currentColor" strokeWidth={0.5}>
      <circle cx="12" cy="7.500" r="2.800" />
      <circle cx="5.500" cy="10.500" r="2.200" />
      <circle cx="18.500" cy="10.500" r="2.200" />
      <path d="M7 19c0-3 2.200-5 5-5s5 2 5 5z" />
      <path d="M1.500 18c.1-2.200 1.700-3.600 4-3.600.8 0 1.500.2 2 .5-1 1-1.600 2.100-1.800 3.100zM22.500 18c-.1-2.200-1.700-3.600-4-3.600-.8 0-1.500.2-2 .5 1 1 1.600 2.100 1.800 3.100z" />
    </svg>
  ),
  book: (
    <svg {...svgProps}>
      <path d="M12 6.500C10 5 7 4.500 3.500 5v13c3.500-.500 6.500 0 8.500 1.500 2-1.500 5-2 8.500-1.500V5C17 4.500 14 5 12 6.500z" />
      <path d="M12 6.500v13" />
      <path d="M6 8.500c1.500 0 3 .3 4.500 1M6 11.500c1.500 0 3 .3 4.500 1M18 8.500c-1.500 0-3 .3-4.500 1M18 11.500c-1.500 0-3 .3-4.500 1" />
    </svg>
  ),
  care: (
    <svg {...svgProps}>
      <path d="M12 11s-3.600-2.200-3.600-4.800A2.100 2.100 0 0 1 12 5a2.100 2.100 0 0 1 3.600 1.200C15.600 8.800 12 11 12 11z" />
      <path d="M2.500 14.500c1.800-.6 3.500-.3 5 .5l3 1.500h3.500c1 0 1.500 1.100.8 1.800" />
      <path d="M2.500 20l5-1.300 5.500 1.600 8-4.600c.7-.4.800-1.300.2-1.800-.5-.5-1.300-.5-1.900-.2L15 15.500" />
    </svg>
  ),
};

const ChapterPillarIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default ChapterPillarIcons;
