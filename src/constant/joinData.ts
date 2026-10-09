// DESIGN ONLY: text from the "Join ShininChrist" guide and mockup. No data is saved or sent.

export const JOIN_HERO = {
  eyebrow: "Join the Movement. Shine Christ.",
  titleTop: "Join",
  titleAccent: "ShininChrist",
  subtitle: "A Step-by-Step Process",
  description:
    "Become a part of the ShininChrist family. Follow these simple steps to complete your registration and gain access to member benefits, resources, and community.",
  image: "/images/join/hero-v2.webp",
};

export const JOIN_NEEDS = {
  title: "What You Need to Join",
  items: [
    "A Google/Gmail account",
    "Active WhatsApp number",
    "Screenshot capability (phone or computer)",
    "Registration and ShininChrist Verification",
  ],
};

export interface JoinGlanceStep {
  title: string;
  text: string;
  list?: string[];
  note: string;
}

export const JOIN_GLANCE: JoinGlanceStep[] = [
  {
    title: "Sign in with Google/Gmail",
    text: "Click “Join ShininChrist” and sign in using your Google/Gmail account. This creates your account and saves your progress.",
    note: "This does not grant member access.",
  },
  {
    title: "Complete Basic Registration Form",
    text: "Fill in the simple registration form with your basic information.",
    list: [
      "Full Name",
      "Date of Birth",
      "Gender",
      "Country / State",
      "WhatsApp Number",
      "Area of Interest (Men, Women, Youth, Academy)",
    ],
    note: "Registration saved.",
  },
  {
    title: "Parental Consent (If Under 18)",
    text: "If you are under 18, a parent or legal guardian must complete and sign the Parental Consent Form. Submit the signed consent through the ShininChrist WhatsApp link provided.",
    note: "Consent required before moving forward.",
  },
  {
    title: "Subscribe to Social Community",
    text: "Complete at least one: subscribe to the official ShininChrist YouTube channel, or follow the official Facebook, Instagram or TikTok page.",
    note: "One platform is required.",
  },
  {
    title: "Upload Screenshot Proof",
    text: "Take a screenshot showing your subscription or follow (status must show “Subscribed” or “Following”). Upload it for verification (JPG, PNG or PDF).",
    note: "Proof must be received by our team.",
  },
  {
    title: "Request Your ShininChrist Uniform",
    text: "Click “Request Uniform” to choose your uniform type (T-shirt), size, and quantity (if applicable).",
    note: "Uniform request is required.",
  },
  {
    title: "Select Size & Delivery Details",
    text: "Select your size and provide delivery information.",
    list: [
      "Size (S, M, L, XL, XXL, etc.)",
      "Delivery Address",
      "City / State",
      "Phone Number",
    ],
    note: "Delivery information is required.",
  },
  {
    title: "Pay for Uniform + Delivery",
    text: "Make payment for your uniform and delivery charge using the secure payment options provided.",
    list: ["Uniform Cost + Delivery Charge = Total"],
    note: "Payment confirmation is required.",
  },
  {
    title: "ShininChrist Verification",
    text: "Our team verifies the following before approval:",
    list: [
      "Registration information completed",
      "Parental consent (if under 18)",
      "YouTube subscription proof",
      "Uniform requested",
      "Payment confirmed",
    ],
    note: "Account remains pending until verification is complete.",
  },
  {
    title: "Account Activated: Access Granted",
    text: "Once confirmed, you will receive your ShininChrist User ID and Password.",
    list: ["User ID: SCM25XXXX", "Password: *********"],
    note: "You can now access the member area.",
  },
];

export const JOIN_SSO = {
  title: "Activation: Single Sign-On (SSO)",
  text: "After your account is activated, you can use your Google/Gmail account (Single Sign-On) to log in to the ShininChrist member area anytime.",
};

export const JOIN_NOTES = {
  title: "Important Notes",
  items: [
    "No access to the member area will be granted until your uniform payment is confirmed.",
    "Physical delivery of the uniform is not required before access is granted. Access is activated once payment is confirmed.",
    "Your account is personal and should not be shared.",
    "Need help? Contact us on WhatsApp or email for assistance.",
  ],
};

export const JOIN_WELCOME = {
  title: "Welcome to ShininChrist!",
  text: "You are now part of a global family committed to shining Christ in our hearts, homes, communities, and nations.",
  pillars: [
    "Learn Together",
    "Grow Together",
    "Serve Together",
    "Shine Christ",
  ],
  tagline: "SECURE. VERIFIED. UNITED.",
  taglineText: "Every member matters. Every step protects our community.",
  thanks: "Thank you for joining ShininChrist!",
};

/** The signed form is sent to ShininChrist; the blank form is supplied by the client. */
export const CONSENT_FORM_URL = "/forms/ShininChrist-Parental-Consent-Form.pdf";

/** Official links are supplied by ShininChrist. Empty = shown as "link coming soon", never a fake link. */
export const JOIN_LINKS = {
  youtube: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  whatsapp: "",
  contact: "/contact",
};

/** Wizard labels (Join guide section 11). Consent is skipped for applicants 18 and over. */
export const WIZARD_STEPS = [
  { id: "account", label: "Account" },
  { id: "about", label: "About You" },
  { id: "consent", label: "Consent" },
  { id: "subscribe", label: "Subscribe" },
  { id: "proof", label: "Verify" },
  { id: "uniform", label: "Uniform" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
  { id: "welcome", label: "Welcome" },
] as const;

export type WizardStepId = (typeof WIZARD_STEPS)[number]["id"];

export const SOCIAL_OPTIONS = [
  {
    id: "youtube",
    label: "YouTube",
    action: "Subscribe on YouTube",
    hint: "Subscribe to the official ShininChrist YouTube channel.",
  },
  {
    id: "facebook",
    label: "Facebook",
    action: "Follow on Facebook",
    hint: "Follow the official ShininChrist Facebook page.",
  },
  {
    id: "instagram",
    label: "Instagram",
    action: "Follow on Instagram",
    hint: "Follow the official ShininChrist Instagram page.",
  },
  {
    id: "tiktok",
    label: "TikTok",
    action: "Follow on TikTok",
    hint: "Follow the official ShininChrist TikTok page.",
  },
] as const;

export const INTEREST_AREAS = ["Men", "Women", "Youth", "Academy"];
export const UNIFORM_SIZES = ["S", "M", "L", "XL", "XXL"];
export const UNIFORM_TYPES = ["T-shirt"];

/** Registration statuses (Join guide section 5), shown beside the wizard. */
export const STATUS_BY_STEP: Record<WizardStepId, string> = {
  account: "Started",
  about: "Started",
  consent: "Form Completed",
  subscribe: "Form Completed",
  proof: "Subscription Pending",
  uniform: "Uniform Payment Pending",
  payment: "Uniform Payment Pending",
  review: "Pending Verification",
  welcome: "Active Member",
};
