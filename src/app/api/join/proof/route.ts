import { NextResponse, type NextRequest } from "next/server";
import { EARLY_STATUSES, JoinInputError } from "@/lib/join";
import { joinErrorResponse, requireUser } from "@/lib/join-http";
import { prisma } from "@/lib/prisma";
import { uploadPrivateFile } from "@/lib/uploads";

const PLATFORMS = ["youtube", "facebook", "instagram", "tiktok"] as const;

/** Step "Upload Screenshot Proof": private upload; an admin then verifies it. */
export async function POST(request: NextRequest) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  try {
    const form = await request.formData();
    const platform = String(form.get("platform") ?? "");
    if (!(PLATFORMS as readonly string[]).includes(platform)) {
      throw new JoinInputError(
        "Please choose the platform your screenshot is from.",
      );
    }

    const membership = await prisma.memberships.findUnique({
      where: { user_id: auth.user.id },
    });
    if (membership?.proof_status === "verified") {
      throw new JoinInputError("Your proof has already been verified.");
    }

    const path = await uploadPrivateFile(
      "proofs",
      auth.user.id,
      form.get("file"),
    );

    await prisma.memberships.update({
      where: { user_id: auth.user.id },
      data: {
        proof_path: path,
        social_platform: platform as (typeof PLATFORMS)[number],
        proof_status: "pending",
      },
    });
    await prisma.memberships.updateMany({
      where: { user_id: auth.user.id, status: { in: [...EARLY_STATUSES] } },
      data: { status: "subscription_pending" },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
