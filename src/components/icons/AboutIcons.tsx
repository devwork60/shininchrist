import React from "react";

export type AboutIconName = keyof typeof icons;

interface AboutIconProps {
  name: AboutIconName;
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  trinity: (
    <svg {...base}>
      <circle cx="12" cy="8" r="4.500" />
      <circle cx="8" cy="15" r="4.500" />
      <circle cx="16" cy="15" r="4.500" />
    </svg>
  ),
  eye: (
    <svg {...base}>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  target: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
      <path d="M12 12l7-7M17 3v4h4" />
    </svg>
  ),
  bible: (
    <svg {...base}>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13" />
    </svg>
  ),
  cross: (
    <svg {...base}>
      <path d="M12 3v18M7 8h10" />
    </svg>
  ),
  dove: (
    <svg {...base}>
      <path d="M20 5c-3 0-5 1-7 3-2-1-5-1-8 1 2 0 3 .5 4 1.500-1 3-1 6 1 8 1-3 3-4 5-4.500 3-.5 5-3 5-6z" />
      <path d="M13 8c1 1.500 1 3 0 4.500" />
    </svg>
  ),
  crown: (
    <svg {...base}>
      <path d="M3 8l4 4 5-7 5 7 4-4-2 11H5zM5 19h14" />
    </svg>
  ),
  globe: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.500 2.500 3.500 5.500 3.500 9s-1 6.500-3.500 9c-2.500-2.500-3.500-5.500-3.500-9S9.500 5.500 12 3z" />
    </svg>
  ),
  heart: (
    <svg {...base}>
      <path d="M12 20s-7.500-4.600-7.500-10A4.200 4.200 0 0 1 12 7.600 4.200 4.200 0 0 1 19.500 10c0 5.400-7.500 10-7.500 10z" />
    </svg>
  ),
  home: (
    <svg {...base}>
      <path d="M3.500 11 12 4l8.500 7M6 9.500V20h12V9.500M10 20v-5h4v5" />
    </svg>
  ),
  graduation: (
    <svg {...base}>
      <path d="M2 9l10-5 10 5-10 5zM6 11.500V16c0 1.500 2.500 3 6 3s6-1.500 6-3v-4.500M22 9v6" />
    </svg>
  ),
  people: (
    <svg {...base}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.500 19c0-3 2.500-5 5.500-5s5.500 2 5.500 5" />
      <circle cx="17" cy="9" r="2.300" />
      <path d="M16.500 14.200c2.600.2 4.500 1.900 4.500 4.300" />
    </svg>
  ),
  megaphone: (
    <svg {...base}>
      <path d="M4 10v4h3l8 4V6L7 10zM18 9c1.500 1 1.500 5 0 6" />
    </svg>
  ),
  sprout: (
    <svg {...base}>
      <path d="M12 21v-9M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2-5 6-5 0 3-2 5-6 5z" />
    </svg>
  ),
  women: (
    <svg {...base}>
      <circle cx="12" cy="8" r="4" />
      <path d="M12 12v8M9 17h6" />
    </svg>
  ),
  radio: (
    <svg {...base}>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7l8-4M7 13h6M16 12.500v.01M16 15.500v.01" />
    </svg>
  ),
  monitor: (
    <svg {...base}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M9 10l2 2 4-4" />
    </svg>
  ),
  briefcase: (
    <svg {...base}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
    </svg>
  ),
  mail: (
    <svg {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  phone: (
    <svg {...base}>
      <path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  user: (
    <svg {...base}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.600-6.500 8-6.500s8 2.500 8 6.500" />
    </svg>
  ),
  press: (
    <svg {...base}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6h8v2M12 12v4M10 14h4" />
    </svg>
  ),
  leaf: (
    <svg {...base}>
      <path d="M5 19c0-8 5-14 15-14 0 9-5 14-13 14M5 19c2-5 5-8 9-10" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 17c0-5 2-8 6-9l.5 1.500C8 10.500 7.500 12 7.500 13H10v6H4zm9 0c0-5 2-8 6-9l.5 1.500c-2.500 1-3 2.500-3 3.500H19v6h-6z" />
    </svg>
  ),
};

const AboutIcons: React.FC<AboutIconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default AboutIcons;
