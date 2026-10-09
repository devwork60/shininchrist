import React from "react";

export type AuthIconName = keyof typeof icons;

interface AuthIconProps {
  name: AuthIconName;
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
  google: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.5 12.25c0-.8-.07-1.56-.2-2.3H12v4.35h5.9a5.04 5.04 0 0 1-2.19 3.3v2.74h3.54c2.07-1.9 3.25-4.72 3.25-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.54-2.74c-.98.66-2.24 1.05-3.74 1.05-2.87 0-5.3-1.94-6.17-4.55H2.17v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.83 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.17a11 11 0 0 0 0 9.88z"
      />
      <path
        fill="#EA4335"
        d="M12 5.35c1.62 0 3.07.56 4.21 1.65l3.15-3.15A10.6 10.6 0 0 0 12 1 11 11 0 0 0 2.17 7.06l3.66 2.84C6.7 7.29 9.13 5.35 12 5.35z"
      />
    </svg>
  ),
  shield: (
    <svg {...base}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  device: (
    <svg {...base}>
      <rect x="3" y="5" width="18" height="11" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  phone: (
    <svg {...base}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  logout: (
    <svg {...base}>
      <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M15 8l4 4-4 4M19 12H9" />
    </svg>
  ),
  user: (
    <svg {...base}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6.500 8-6.500s8 2.500 8 6.500" />
    </svg>
  ),
  check: (
    <svg {...base} strokeWidth={2.4}>
      <path d="M5 12.500l4.500 4.500L19 7.500" />
    </svg>
  ),
};

const AuthIcons: React.FC<AuthIconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default AuthIcons;
