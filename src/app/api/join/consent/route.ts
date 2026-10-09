import { NextResponse, type NextRequest } from "next/server";
import { JoinInputError } from "@/lib/join";
import { joinErrorResponse, requireUser } from "@/lib/join-http";
import { prisma } from "@/lib/prisma";
import { uploadPrivateFile } from "@/lib/uploads";

/** Under-18 applicants: upload the signed parental consent form. An admin verifies it. */
export async function POST(request: NextRequest) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  try {
    const membership = await prisma.memberships.findUnique({
      where: { user_id: auth.user.id },
    });
    if (!membership?.is_minor) {
      throw new JoinInputError(
        "Parental consent is only needed for applicants under 18.",
      );
    }
    if (membership.consent_status === "verified") {
      throw new JoinInputError(
        "Your parental consent has already been verified.",
      );
    }

    const form = await request.formData();
    const path = await uploadPrivateFile(
      "consents",
      auth.user.id,
      form.get("file"),
    );

    await prisma.memberships.update({
      where: { user_id: auth.user.id },
      data: { consent_path: path, consent_status: "pending" },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
