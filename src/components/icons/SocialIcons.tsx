import React from "react";

export type SocialIconName = keyof typeof icons;

interface IconProps {
  name: SocialIconName;
  className?: string;
}

const box = {
  width: 52,
  height: 52,
  viewBox: "0 0 52 52",
  "aria-hidden": true,
};

const icons = {
  youtube: (
    <svg {...box}>
      <rect width="52" height="52" rx="12" fill="#ff0000" />
      <rect x="9" y="14" width="34" height="24" rx="7" fill="#fff" />
      <path d="M22 20v12l11-6-11-6z" fill="#ff0000" />
    </svg>
  ),
  facebook: (
    <svg {...box}>
      <rect width="52" height="52" rx="12" fill="#1877f2" />
      <path
        d="M29.600 43V28.500h4.800l.8-5.600h-5.600v-3.600c0-1.600.6-2.800 2.900-2.800h2.900V11.600c-.5-.1-2.300-.3-4.300-.3-4.300 0-7.200 2.600-7.200 7.400v4.200h-4.800v5.600h4.800V43h5.700z"
        fill="#fff"
      />
    </svg>
  ),
  instagram: (
    <svg {...box}>
      <defs>
        <linearGradient
          id="ig-grad"
          x1="0"
          y1="52"
          x2="52"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#feda75" />
          <stop offset="0.3" stopColor="#fa7e1e" />
          <stop offset="0.55" stopColor="#d62976" />
          <stop offset="0.8" stopColor="#962fbf" />
          <stop offset="1" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect width="52" height="52" rx="12" fill="url(#ig-grad)" />
      <rect
        x="13"
        y="13"
        width="26"
        height="26"
        rx="8"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="26"
        cy="26"
        r="6.500"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
      />
      <circle cx="34" cy="18" r="1.800" fill="#fff" />
    </svg>
  ),
  tiktok: (
    <svg {...box}>
      <rect width="52" height="52" rx="12" fill="#000" />
      <path
        d="M33.500 13c.4 3.300 2.300 5.300 5.500 5.500v4.200c-2 .1-3.800-.5-5.500-1.600v7.800c0 5-3.600 8.400-8.200 8.400-4.300 0-7.800-3.300-7.800-7.700 0-4.700 3.900-8.100 8.800-7.600v4.400c-2.300-.6-4.400.8-4.400 3.100 0 1.800 1.400 3.200 3.200 3.200 2.100 0 3.400-1.500 3.400-3.700V13h5z"
        fill="#fff"
      />
    </svg>
  ),
  whatsapp: (
    <svg {...box}>
      <rect width="52" height="52" rx="12" fill="#25d366" />
      <path
        d="M26 11.500a14.500 14.500 0 0 0-12.400 22L12 40.500l7.200-1.600A14.500 14.500 0 1 0 26 11.500z"
        fill="#fff"
      />
      <path
        d="M21.200 19.500c-.4-.9-.8-.9-1.200-.9h-1c-.4 0-.9.100-1.400.7s-1.800 1.800-1.800 4.300 1.800 5 2.100 5.300 3.500 5.600 8.600 7.600c4.300 1.700 5.100 1.300 6 1.200s2.900-1.200 3.300-2.400.4-2.200.3-2.400-.4-.4-.9-.6l-3-1.500c-.4-.2-.7-.2-1 .2l-1.400 1.700c-.3.300-.5.400-1 .1-.5-.2-2-.7-3.800-2.300-1.400-1.200-2.300-2.700-2.600-3.200-.3-.5 0-.7.200-1l.7-.8c.2-.2.3-.5.500-.7.200-.3.100-.6 0-.8l-1.700-4z"
        fill="#25d366"
      />
    </svg>
  ),
  telegram: (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="22" fill="#2aabee" />
      <path
        d="M10 21.500l22.500-9c1-.4 1.900.2 1.600 1.800l-3.800 18c-.3 1.200-1 1.500-2 .9l-5.600-4.200-2.700 2.600c-.3.300-.6.600-1.200.6l.4-5.800 10.500-9.500c.5-.4-.1-.7-.7-.3L15.100 25.800l-5.600-1.800c-1.200-.4-1.200-1.200.5-2.500z"
        fill="#fff"
      />
    </svg>
  ),
};

const SocialIcons: React.FC<IconProps> = ({ name, className }) => (
  <span className={className}>{icons[name]}</span>
);

export default SocialIcons;
