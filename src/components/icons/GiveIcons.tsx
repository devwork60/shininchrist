import React from "react";

export type GiveIconName = keyof typeof icons;

interface GiveIconProps {
  name: GiveIconName;
  className?: string;
}

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons = {
  heart: (
    <svg {...base}>
      <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />
    </svg>
  ),
  book: (
    <svg {...base}>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13" />
    </svg>
  ),
  community: (
    <svg {...base}>
      <circle cx="12" cy="7" r="2.5" />
      <circle cx="5.5" cy="10" r="2" />
      <circle cx="18.5" cy="10" r="2" />
      <path d="M7.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5M1.5 18c0-2.2 1.6-3.8 3.8-3.8M22.5 18c0-2.2-1.6-3.8-3.8-3.8" />
    </svg>
  ),
  nextgen: (
    <svg {...base}>
      <circle cx="8" cy="5" r="2" />
      <circle cx="17" cy="9" r="1.5" />
      <path d="M8 8v6M5 10.5h6M8 14l-2 6M8 14l2 6M17 11.5v4M15 13h4M17 15.5l-1 4.5M17 15.5l1 4.5" />
    </svg>
  ),
  globe: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z" />
    </svg>
  ),
  coins: (
    <svg {...base}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  ),
  box: (
    <svg {...base}>
      <path d="M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8" />
    </svg>
  ),
  home: (
    <svg {...base}>
      <path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5h4v5" />
    </svg>
  ),
  checklist: (
    <svg {...base}>
      <path d="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />
    </svg>
  ),
  pencil: (
    <svg {...base}>
      <path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19zM14 7l3 3" />
    </svg>
  ),
  search: (
    <svg {...base}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5M8 10.500h5M10.500 8v5" />
    </svg>
  ),
  checkCircle: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.500l3 3 5-6" />
    </svg>
  ),
  info: (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.500v.01" />
    </svg>
  ),
  headset: (
    <svg {...base}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1zM20 14h-3v5h2a1 1 0 0 0 1-1zM17 19c0 1.500-2 2-5 2" />
    </svg>
  ),
  mail: (
    <svg {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  chat: (
    <svg {...base}>
      <path d="M4 20l1.500-4A8 8 0 1 1 8 18.500zM9 9.500c0 3 2.500 5.500 5.500 5.500l1-1.500-2-1-1 .700c-1-.500-1.700-1.200-2.200-2.200l.700-1-1-2z" />
    </svg>
  ),
  check: (
    <svg {...base} strokeWidth={2.4}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
};

const GiveIcons: React.FC<GiveIconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default GiveIcons;
