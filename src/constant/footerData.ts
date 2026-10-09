import type { SocialIconName } from "@/components/icons/SocialIcons";
import type { FooterIconName } from "@/components/icons/FooterIcons";

export interface FooterLink {
  label: string;
  href: string;
  /** Shows a small dropdown chevron after the label */
  hasMenu?: boolean;
}

export const FOOTER_BRAND = {
  motto: "Shining Christ in our Hearts, Homes, Communities, and Nations.",
  description:
    "A global ministry, community and compassionate nonprofit organization, advancing the gospel of Jesus Christ through spiritual, educational and cultural literacy.",
  script: "A Brighter Tomorrow. Together.",
};

export const FOOTER_EXPLORE: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", hasMenu: true },
  { label: "Chapters", href: "/chapters" },
  { label: "Academy", href: "/academy" },
  { label: "Daily", href: "/daily" },
  { label: "Library", href: "/library" },
  { label: "Store", href: "/store" },
  { label: "Serve", href: "/serve" },
  { label: "Give", href: "/give" },
  { label: "Invite Mercy to Speak", href: "/about/invite-mercy" },
  { label: "Join ShininChrist", href: "/join" },
];

export const FOOTER_INVOLVED: FooterLink[] = [
  { label: "Become a Member", href: "/join" },
  { label: "Volunteer", href: "/serve/volunteer" },
  { label: "Partner With Us", href: "/serve/partner" },
  { label: "Donate / Give", href: "/give" },
  { label: "In-Kind Giving", href: "/serve/donate-in-kind" },
  { label: "Major Gifts", href: "/give/major-assets" },
  { label: "Prison Outreach", href: "/serve/prison-outreach" },
  { label: "Community Impact", href: "/serve/community-impact" },
];

export const FOOTER_SUPPORT: FooterLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Technical Support", href: "/support" },
  { label: "Report an Issue", href: "/report-an-issue" },
  { label: "Media & Press", href: "/media-press" },
  { label: "Partnership Inquiries", href: "/partnership-inquiries" },
];

export interface ContactItem {
  icon: FooterIconName;
  lines: string[];
}

// NOTE: email and phone are placeholders taken from the design mockup.
// Replace with the official details supplied by ShininChrist.
export const FOOTER_CONTACT = {
  heading: "Contact Us",
  intro: "We’d love to hear from you.",
  items: [
    { icon: "mail", lines: ["Email", "info@shininchrist.org"] },
    {
      icon: "chat",
      lines: ["WhatsApp", "+1 (XXX) XXX-XXXX", "(Official ShininChrist line)"],
    },
    { icon: "pin", lines: ["Global Ministry"] },
    { icon: "clock", lines: ["We aim to respond", "within 48 hours."] },
  ] as ContactItem[],
  cta: { text: "Contact Us", url: "/contact" },
};

export interface SocialLink {
  id: string;
  icon: SocialIconName;
  label: string;
  /** Set to the official profile URL supplied by ShininChrist */
  url: string;
  enabled: boolean;
}

export const FOOTER_CONNECT = {
  heading: "Connect with ShininChrist",
  intro: "Follow, watch, and be part of what God is doing around the world.",
  quote: "Together we can do more.",
};

// NOTE: URLs are placeholders ("#") until the official links are supplied.
export const SOCIAL_LINKS: SocialLink[] = [
  { id: "youtube", icon: "youtube", label: "YouTube", url: "#", enabled: true },
  {
    id: "facebook",
    icon: "facebook",
    label: "Facebook",
    url: "#",
    enabled: true,
  },
  {
    id: "instagram",
    icon: "instagram",
    label: "Instagram",
    url: "#",
    enabled: true,
  },
  { id: "tiktok", icon: "tiktok", label: "TikTok", url: "#", enabled: true },
  {
    id: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    url: "#",
    enabled: true,
  },
];

export const TELEGRAM_LINK: SocialLink = {
  id: "telegram",
  icon: "telegram",
  label: "Telegram (coming soon)",
  url: "#",
  enabled: false, // set to false to hide until Telegram is activated
};

export const FOOTER_LEGAL: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Site Map", href: "/site-map" },
];

// Text shown on the gold banner above the footer (as in the approved design).
export const FOOTER_BANNER = {
  title: "ShininChrist Website Footer – Freelancer Reference",
  subtitle: "Global Footer Component – Use This Design on All Pages",
  tags: ["Final", "Do Not Alter Logo", "Use Site-Wide"],
};
