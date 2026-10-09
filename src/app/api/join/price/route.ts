import { NextResponse } from "next/server";
import { getUniformPrice } from "@/lib/join";
import { joinErrorResponse, requireUser } from "@/lib/join-http";
import { prisma } from "@/lib/prisma";

/** Uniform price for the applicant's own country (from the admin-managed price list). */
export async function GET() {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  try {
    const profile = await prisma.profiles.findUnique({
      where: { id: auth.user.id },
    });
    if (!profile?.country_code) return NextResponse.json({ price: null });
    return NextResponse.json({
      price: await getUniformPrice(profile.country_code),
    });
  } catch (error) {
    return joinErrorResponse(error);
  }
}
