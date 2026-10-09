import React from "react";

export type PathwayIconName = keyof typeof icons;

interface IconProps {
  name: PathwayIconName;
  className?: string;
}

const svgProps = {
  width: 36,
  height: 36,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  chapters: (
    <svg {...svgProps}>
      <circle cx="12" cy="6.5" r="2.4" />
      <circle cx="5.5" cy="11" r="2" />
      <circle cx="18.5" cy="11" r="2" />
      <path d="M8 18.5c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2" />
      <path d="M2 18c.2-2 1.5-3.2 3.5-3.2M22 18c-.2-2-1.5-3.2-3.5-3.2" />
    </svg>
  ),
  academy: (
    <svg {...svgProps}>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5z" />
      <path d="M6.5 11.8v4.2c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.2" />
      <path d="M21.5 9.5V15" />
    </svg>
  ),
  serve: (
    <svg {...svgProps}>
      <path d="M12 10.5s-3.3-2-3.3-4.4A1.9 1.9 0 0 1 12 5a1.9 1.9 0 0 1 3.3 1.1c0 2.4-3.3 4.4-3.3 4.4z" />
      <path d="M2.5 13.5h3.2l3.3 1.8h4.2c.8 0 1.3.9.7 1.5l-.4.4" />
      <path d="M5.7 13.5v5" />
      <path d="M9 17.5l5.2 1.3 7.3-4.3" />
    </svg>
  ),
  give: (
    <svg {...svgProps}>
      <path d="M13.5 8.5s-3.2-2-3.2-4.2a1.8 1.8 0 0 1 3.2-1 1.8 1.8 0 0 1 3.2 1c0 2.2-3.2 4.2-3.2 4.2z" />
      <path d="M3 13.5c1.5-.5 3-.3 4.3.4l3.2 1.6h3.4c.9 0 1.4 1 .8 1.6" />
      <path d="M3 19.5l4.8-1.2 5.2 1.5 7.5-4.3c.6-.4.7-1.2.2-1.7-.5-.5-1.2-.5-1.8-.2l-4.4 2.2" />
    </svg>
  ),
};

const PathwayIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default PathwayIcons;
