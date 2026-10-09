import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ShininChrist",
  description: "Sign in to your ShininChrist account.",
  robots: { index: false },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
