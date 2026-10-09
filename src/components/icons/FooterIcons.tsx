import React from "react";

export type FooterIconName = keyof typeof icons;

interface IconProps {
  name: FooterIconName;
  className?: string;
}

const icons = {
  mail: (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 5.5h18a1 1 0 0 1 1 1v.4l-10 6.2L2 6.9v-.4a1 1 0 0 1 1-1z" />
      <path d="M2 9.1v8.4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9.1l-10 6.2L2 9.1z" />
    </svg>
  ),
  chat: (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <circle cx="7.5" cy="10.5" r="1.3" fill="#12261c" />
      <circle cx="12" cy="10.5" r="1.3" fill="#12261c" />
      <circle cx="16.5" cy="10.5" r="1.3" fill="#12261c" />
    </svg>
  ),
  pin: (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.500a2.500 2.500 0 0 1 0 5z" />
    </svg>
  ),
  clock: (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.2l3.6 2.1-.9 1.5L11 13V7h2z" />
    </svg>
  ),
  chevron: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
};

const FooterIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default FooterIcons;
