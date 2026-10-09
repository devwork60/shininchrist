import React from "react";

export type ExperienceIconName = keyof typeof icons;

interface IconProps {
  name: ExperienceIconName;
  className?: string;
}

const svgProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

const icons = {
  cross: (
    <svg {...svgProps} fill="currentColor">
      <path d="M10.500 3h3v5.500H19v3h-5.500V21h-3v-9.500H5v-3h5.500z" />
    </svg>
  ),
  target: (
    <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.500" />
    </svg>
  ),
  square: (
    <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect
        x="8.500"
        y="8.500"
        width="7"
        height="7"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  heart: (
    <svg
      {...svgProps}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    >
      <path d="M12 20s-7.500-4.600-7.500-10.200A4.300 4.300 0 0 1 12 7.100a4.300 4.300 0 0 1 7.500 2.700C19.500 15.400 12 20 12 20z" />
    </svg>
  ),
  dot: (
    <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.500" />
      <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const ExperienceIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default ExperienceIcons;
