import { redirect } from "next/navigation";
import LoginCard from "@/components/pages/auth-page/LoginCard";
import { getCurrentUser } from "@/lib/auth";

const LoginPage = async ({ searchParams }: PageProps<"/login">) => {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/account";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  // Someone who is already signed in is not asked to sign in again: send them on to where they were heading.
  // (Signing in never unlocks member content by itself: the destination page still checks membership.)
  const user = await getCurrentUser().catch(() => null);
  if (user) redirect(safeNext.startsWith("/login") ? "/account" : safeNext);

  return (
    <main className="flex-1">
      <LoginCard next={safeNext} failed={params.error === "signin_failed"} />
    </main>
  );
};

export default LoginPage;
