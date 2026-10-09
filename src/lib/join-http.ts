import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { JoinInputError } from "@/lib/join";

/** Signed-in user or a 401 response. Use: const auth = await requireUser(); if (auth.response) return auth.response; */
export const requireUser = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Please sign in first." },
        { status: 401 },
      ),
    } as const;
  }
  return { user, response: null } as const;
};

export const joinErrorResponse = (error: unknown) => {
  if (error instanceof JoinInputError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  console.error("[join] unexpected error:", error);
  return NextResponse.json(
    { error: "Something went wrong. Please try again." },
    { status: 500 },
  );
};
