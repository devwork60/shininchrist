import React from "react";

export type FrameworkIconName = keyof typeof icons;

interface IconProps {
  name: FrameworkIconName;
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
  heart: (
    <svg {...svgProps}>
      <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
    </svg>
  ),
  home: (
    <svg {...svgProps}>
      <path d="M3.5 11.5 12 4l8.5 7.5" />
      <path d="M5.5 10.5V20h13v-9.5" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  ),
  community: (
    <svg {...svgProps}>
      <circle cx="12" cy="7" r="2.6" />
      <circle cx="5.5" cy="10.5" r="2.1" />
      <circle cx="18.5" cy="10.5" r="2.1" />
      <path d="M7.5 19c0-2.8 2-4.6 4.5-4.6s4.5 1.8 4.5 4.6" />
      <path d="M1.8 18c.1-2 1.6-3.4 3.7-3.4M22.2 18c-.1-2-1.6-3.4-3.7-3.4" />
    </svg>
  ),
  nation: (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z" />
    </svg>
  ),
};

const FrameworkIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default FrameworkIcons;
