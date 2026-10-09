import React from "react";

export type TeacherIconName = keyof typeof icons;

interface IconProps {
  name: TeacherIconName;
  className?: string;
}

const svgProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  profiles: (
    <svg {...svgProps}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9.500" r="2.300" />
      <path d="M3 20c0-3.500 2.700-6 6-6s6 2.500 6 6M15.500 14.500c2.800.2 5.500 1.800 5.500 5" />
    </svg>
  ),
  expertise: (
    <svg {...svgProps}>
      <path d="M12 3l2.200 4.800 5.300.6-3.900 3.600 1.100 5.200L12 14.500 7.300 17.200l1.100-5.200-3.900-3.600 5.300-.6z" />
      <path d="M8 20.500h8" />
    </svg>
  ),
  mission: (
    <svg {...svgProps}>
      <circle cx="12" cy="8" r="3.200" />
      <path d="M5 20c0-3.800 3-6.500 7-6.500s7 2.700 7 6.500" />
      <path d="M12 2.500v1.200" />
    </svg>
  ),
  join: (
    <svg {...svgProps}>
      <circle cx="10" cy="8" r="3.200" />
      <path d="M3.500 20c0-3.500 2.800-6 6.500-6 1.300 0 2.500.3 3.500 1" />
      <path d="M18 14v6M15 17h6" />
    </svg>
  ),
};

const TeacherIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default TeacherIcons;
