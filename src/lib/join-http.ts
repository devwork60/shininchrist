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

/**
 * Reads an upload form. A request that is too large to read (or is cut off) gives the person a clear message,
 * instead of a 500 "something went wrong".
 */
export const readUploadForm = async (request: Request) => {
  try {
    return await request.formData();
  } catch {
    throw new JoinInputError(
      "That file could not be uploaded. It may be too large: please choose a file under 4 MB.",
    );
  }
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
