import LoginCard from "@/components/pages/auth-page/LoginCard";

const LoginPage = async ({ searchParams }: PageProps<"/login">) => {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/account";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  return (
    <main className="flex-1">
      <LoginCard next={safeNext} failed={params.error === "signin_failed"} />
    </main>
  );
};

export default LoginPage;
