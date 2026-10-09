// DESIGN ONLY: sample data for the login, account and admin-session screens.
// Replace with real session / membership data when authentication is built.

export const LOGIN_PAGE = {
  title: "Welcome to ShininChrist",
  subtitle: "Sign in to continue to your ShininChrist account.",
  google: "Continue with Google",
  divider: "Why Google?",
  notes: [
    "Signing in identifies you. It does not make you an active member.",
    "Member areas open only after your ShininChrist membership is approved and active.",
    "We never post to your Google account or see your password.",
  ],
  joinPrompt: "New to ShininChrist?",
  join: { text: "Join ShininChrist", url: "/join" },
  panelTitle: "Shining Christ in our Hearts, Homes, Communities, and Nations.",
  panelItems: [
    "Daily Faith Formation",
    "Chapters and community",
    "Academy learning",
    "Library resources",
  ],
};

export const MOCK_USER = {
  name: "Grace Johnson",
  email: "grace.johnson@example.com",
  initial: "G",
  memberId: "SC-NG-0000128",
  country: "Nigeria",
  chapter: "Women’s Chapter",
  status: "Awaiting Uniform Payment",
};

/** Registration steps from the Join guide, in order. `done` marks the sample progress. */
export const MEMBERSHIP_STEPS = [
  { label: "Registration started", done: true },
  { label: "Form completed", done: true },
  { label: "YouTube subscription verified", done: true },
  { label: "Parental consent (if under 18)", done: true },
  { label: "Uniform payment", done: false },
  { label: "Admin approval", done: false },
  { label: "Active member", done: false },
];

export interface SessionRow {
  id: string;
  device: string;
  place: string;
  lastActive: string;
  current?: boolean;
}

export const MOCK_SESSIONS: SessionRow[] = [
  {
    id: "s1",
    device: "Chrome on Windows",
    place: "Lagos, Nigeria",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "s2",
    device: "Safari on iPhone",
    place: "Lagos, Nigeria",
    lastActive: "2 hours ago",
  },
  {
    id: "s3",
    device: "Chrome on Android",
    place: "Abuja, Nigeria",
    lastActive: "3 days ago",
  },
];

export interface AdminSessionRow {
  id: string;
  name: string;
  email: string;
  role: string;
  sessions: number;
  lastActive: string;
}

export const ADMIN_SESSIONS: AdminSessionRow[] = [
  {
    id: "u1",
    name: "Grace Johnson",
    email: "grace.johnson@example.com",
    role: "Pending",
    sessions: 3,
    lastActive: "Active now",
  },
  {
    id: "u2",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Active Member",
    sessions: 1,
    lastActive: "1 hour ago",
  },
  {
    id: "u3",
    name: "Ruth Williams",
    email: "ruth.williams@example.com",
    role: "Teacher",
    sessions: 2,
    lastActive: "Yesterday",
  },
  {
    id: "u4",
    name: "Samuel Clarke",
    email: "samuel.clarke@example.com",
    role: "Admin",
    sessions: 1,
    lastActive: "5 minutes ago",
  },
];
