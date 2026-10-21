import { NextResponse } from "next/server";
import { saveFormSubmission } from "@/lib/forms";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data, name, email, filePaths } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: "Missing required type or form data." },
        { status: 400 },
      );
    }

    const user = await getCurrentUser().catch(() => null);

    const submission = await saveFormSubmission({
      type,
      name,
      email,
      data,
      filePaths,
      userId: user?.id,
    });

    return NextResponse.json({
      ok: true,
      reference: submission.reference,
      id: submission.id,
    });
  } catch (error) {
    console.error("[form_submit] error saving submission:", error);
    return NextResponse.json(
      { error: "Could not save your submission. Please try again." },
      { status: 500 },
    );
  }
}
