import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join ShininChrist | A Step-by-Step Process",
  description:
    "Become part of the ShininChrist family. Follow the simple steps to register, subscribe, request your uniform and gain access to member benefits.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
