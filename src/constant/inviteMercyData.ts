import type { AboutIconName } from "@/components/icons/AboutIcons";

export const INVITE_HERO = {
  title: ["Invite Mercy", "to Speak"],
  tagline: ["Encouraging hearts. Equipping lives.", "Advancing God’s Kingdom."],
  description:
    "Georgia “Mercy” Morris is available to consider invitations for ministry, speaking, teaching, media, educational, missions, and other appropriate engagements.",
  image: "/images/about/invite-hero-v2.webp",
  quote: "To see lives transformed by Jesus Christ is the greatest privilege.",
  quoteBy: ["Georgia “Mercy”", "Morris"],
};

export const INVITE_TYPES: { icon: AboutIconName; text: string }[] = [
  { icon: "people", text: "Church services and ministry programs" },
  { icon: "people", text: "Conferences and conventions" },
  { icon: "megaphone", text: "Evangelistic events and crusades" },
  { icon: "people", text: "Christian retreats and gatherings" },
  { icon: "women", text: "Women’s events" },
  { icon: "globe", text: "Missions and outreach events" },
  { icon: "graduation", text: "Educational events and seminars" },
  { icon: "radio", text: "Radio, television, podcast, and media interviews" },
  { icon: "people", text: "Panel discussions" },
  { icon: "monitor", text: "Virtual speaking engagements" },
  {
    icon: "briefcase",
    text: "Other appropriate speaking or ministry invitations",
  },
];

export const INVITE_VERSE = {
  text: "“Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.”",
  ref: "Matthew 5:16 (NIV)",
};

export type InviteFieldType =
  "text" | "email" | "tel" | "url" | "date" | "select" | "textarea" | "file";

export interface InviteField {
  id: string;
  label: string;
  type: InviteFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  /** Columns taken in the 6-column form grid (default 2) */
  span?: 2 | 3 | 6;
}

export interface InviteSection {
  title: string;
  fields: InviteField[];
}

const EVENT_TYPES = [
  "Church service / ministry program",
  "Conference / convention",
  "Evangelistic event / crusade",
  "Retreat / gathering",
  "Women’s event",
  "Missions / outreach event",
  "Educational event / seminar",
  "Media interview",
  "Panel discussion",
  "Virtual speaking engagement",
  "Other",
];

export const INVITE_SECTIONS: InviteSection[] = [
  {
    title: "Contact Information",
    fields: [
      {
        id: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter full name",
      },
      {
        id: "role",
        label: "Position / Role",
        type: "text",
        required: true,
        placeholder: "Enter your role",
      },
      {
        id: "organization",
        label: "Church/Organization Name",
        type: "text",
        required: true,
        placeholder: "Enter organization name",
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "Enter email address",
      },
      {
        id: "phone",
        label: "WhatsApp / Telephone",
        type: "tel",
        required: true,
        placeholder: "Enter phone number",
      },
      {
        id: "website",
        label: "Organization Website (optional)",
        type: "url",
        placeholder: "https://",
      },
    ],
  },
  {
    title: "Event Information",
    fields: [
      {
        id: "eventName",
        label: "Event / Program Name",
        type: "text",
        required: true,
        placeholder: "Enter event name",
      },
      {
        id: "eventType",
        label: "Type of Event",
        type: "select",
        required: true,
        placeholder: "Select event type",
        options: EVENT_TYPES,
      },
      { id: "dates", label: "Proposed Date(s)", type: "date", required: true },
      {
        id: "city",
        label: "City",
        type: "text",
        required: true,
        placeholder: "Enter city",
      },
      {
        id: "state",
        label: "State / Region",
        type: "text",
        placeholder: "Enter state/region",
      },
      {
        id: "country",
        label: "Country",
        type: "text",
        required: true,
        placeholder: "Enter country",
      },
      {
        id: "venue",
        label: "Venue",
        type: "text",
        placeholder: "Enter venue name",
      },
      {
        id: "format",
        label: "In-Person or Virtual?",
        type: "select",
        required: true,
        placeholder: "Select option",
        options: ["In-person", "Virtual", "Hybrid"],
      },
      {
        id: "audience",
        label: "Expected Audience Size",
        type: "text",
        placeholder: "e.g. 100, 500, 1,000",
      },
      {
        id: "theme",
        label: "Event Theme",
        type: "text",
        placeholder: "Enter event theme",
      },
      {
        id: "topic",
        label: "Proposed Topic (if applicable)",
        type: "text",
        placeholder: "Enter proposed topic",
      },
      {
        id: "requestedRole",
        label: "Requested Role",
        type: "select",
        required: true,
        placeholder: "Select role",
        options: [
          "Keynote speaker",
          "Preacher / minister",
          "Teacher / workshop leader",
          "Panelist",
          "Interview guest",
          "Other",
        ],
      },
      {
        id: "duration",
        label: "Approximate Length of Participation",
        type: "select",
        placeholder: "Select duration",
        options: [
          "Under 30 minutes",
          "30–60 minutes",
          "1–2 hours",
          "Half day",
          "Full day",
          "Multiple days",
        ],
      },
    ],
  },
  {
    title: "Additional Information",
    fields: [
      {
        id: "description",
        label: "Brief Description of the Event",
        type: "textarea",
        required: true,
        placeholder:
          "Please provide details about the event, its purpose, and any other relevant information…",
        span: 6,
      },
      {
        id: "speakers",
        label: "Other Speakers / Participants (if applicable)",
        type: "text",
        placeholder: "Enter names or details",
        span: 3,
      },
      {
        id: "travel",
        label: "Travel and Accommodation Information (if applicable)",
        type: "text",
        placeholder: "Enter details",
        span: 3,
      },
      {
        id: "document",
        label: "Upload Supporting Document (optional)",
        type: "file",
        span: 6,
      },
    ],
  },
];

export const INVITE_FORM = {
  title: "Submit Your Invitation",
  intro:
    "Please complete the form below to submit an invitation for Mercy to speak. Submission of an invitation does not constitute confirmation or acceptance of an engagement.",
  fileHint:
    "You may upload an official invitation letter or other relevant document (PDF, DOC, or JPG – max 10MB).",
  submit: "Submit Invitation",
  note: "Thank you for inviting Mercy to speak. The ShininChrist team will review your invitation and contact you regarding availability and next steps. Submission of an invitation does not constitute confirmation of an engagement.",
  success:
    "Thank you for inviting Mercy to speak. The ShininChrist team will review your invitation and contact you regarding availability and next steps.",
};

export const INVITE_SIDEBAR = {
  founderTitle: "About Our Founder",
  founderName: ["Georgia “Mercy”", "Morris"],
  founderRoles: "Missionary. Educator. Author. U.S. Army Veteran.",
  founderImage: "/images/about/invite-card.webp",
  founderText:
    "Mercy travels globally, sharing the gospel, encouraging believers, and equipping individuals and communities through teaching, media, and missions.",
  cta: { text: "Invite Mercy to Speak", url: "#invite-form" },
  relatedTitle: "Related Links",
  related: [
    {
      icon: "user" as AboutIconName,
      text: "Our Founder",
      url: "/about/founder",
    },
    {
      icon: "globe" as AboutIconName,
      text: "Vision & Mission",
      url: "/#vision-mission",
    },
    {
      icon: "cross" as AboutIconName,
      text: "Statement of Faith",
      url: "/#statement-of-faith",
    },
    {
      icon: "press" as AboutIconName,
      text: "Media & Press",
      url: "/media-press",
    },
    { icon: "phone" as AboutIconName, text: "Contact Us", url: "/contact" },
  ],
  reachTitle: "Need to Reach Us First?",
  reachText: "For general inquiries, please visit our Contact page.",
  reachCta: { text: "Go to Contact", url: "/contact" },
};
