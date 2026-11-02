import { NextResponse } from "next/server";
import { getMemberAccess, getCurrentUser } from "@/lib/auth";
import { notifyFormSubmission } from "@/lib/email/notify";
import { prisma } from "@/lib/prisma";
import { getAcademyCourses } from "@/lib/site-content";

const MAX_PER_ASSIGNMENT = 5;

/** A student (active member) sends an assignment answer to the admins. */
export async function POST(req: Request) {
  const { allowed, userId } = await getMemberAccess();
  if (!userId) return NextResponse.json({ error: "Please log in to submit." }, { status: 401 });
  if (!allowed)
    return NextResponse.json({ error: "Assignments can be submitted once your membership is active." }, { status: 403 });

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const courseId = String(body?.courseId ?? "");
  const assignmentId = String(body?.assignmentId ?? "");
  const answer = String(body?.answer ?? "").trim();
  const link = String(body?.link ?? "").trim();

  if (!answer && !link)
    return NextResponse.json({ error: "Write your answer or add a link to your work." }, { status: 400 });
  if (answer.length > 8000)
    return NextResponse.json({ error: "Your answer is too long (maximum 8000 characters)." }, { status: 400 });
  if (link) {
    let ok = link.length <= 400 && /^https?:\/\/[^\s]+$/i.test(link);
    if (ok) {
      try {
        new URL(link);
      } catch {
        ok = false;
      }
    }
    if (!ok) return NextResponse.json({ error: "The link must be a full web address starting with https://" }, { status: 400 });
  }

  const course = (await getAcademyCourses()).find((c) => c.id === courseId);
  const assignment = course?.assignments.find((a) => a.id === assignmentId);
  if (!course || course.status !== "published" || !assignment)
    return NextResponse.json({ error: "That assignment was not found." }, { status: 404 });

  const mine = await prisma.form_submissions.findMany({
    where: { type: "assignment", user_id: userId },
    select: { data: true },
  });
  const already = mine.filter((row) => {
    const d = row.data as Record<string, unknown>;
    return d.courseId === course.id && d.assignmentId === assignment.id;
  }).length;
  if (already >= MAX_PER_ASSIGNMENT)
    return NextResponse.json({ error: "You have reached the limit of submissions for this assignment." }, { status: 429 });

  const user = await getCurrentUser();
  const profile = await prisma.profiles.findUnique({ where: { id: userId }, select: { full_name: true } });
  const name = profile?.full_name || user?.name || "Student";
  const email = user?.email ?? "";

  const submission = await prisma.form_submissions.create({
    data: {
      type: "assignment",
      status: "submitted",
      user_id: userId,
      name,
      email,
      data: {
        course: course.title,
        courseId: course.id,
        assignment: assignment.title,
        assignmentId: assignment.id,
        answer,
        link,
      },
    },
  });

  try {
    await notifyFormSubmission("Academy Assignment", submission.reference, name, email, [
      { label: "Course", value: course.title },
      { label: "Assignment", value: assignment.title },
    ]);
  } catch (error) {
    console.error("[assignment] admin email failed:", error);
  }

  return NextResponse.json({ ok: true, reference: submission.reference });
}
