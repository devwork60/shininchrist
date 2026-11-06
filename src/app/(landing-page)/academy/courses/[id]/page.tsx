import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonOutline from "@/components/button/ButtonOutline";
import ButtonSm from "@/components/button/ButtonSm";
import Breadcrumb from "@/components/common-components/Breadcrumb";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import MainHeading from "@/components/pages/typography/MainHeading";
import AssignmentSubmit from "@/components/pages/courses-page/AssignmentSubmit";
import { fieldTitle } from "@/components/pages/courses-page/CourseResults";
import { getCurrentUser, getMemberAccess } from "@/lib/auth";
import { youtubeEmbedUrl } from "@/lib/daily-video";
import { prisma } from "@/lib/prisma";
import { getAcademyCourses } from "@/lib/site-content";

const findCourse = async (id: string) =>
  (await getAcademyCourses()).find((course) => course.id === id);

export const generateMetadata = async ({
  params,
}: PageProps<"/academy/courses/[id]">): Promise<Metadata> => {
  const { id } = await params;
  const course = await findCourse(id);
  if (!course || course.status === "draft")
    return { title: "Course | ShininChrist Academy", robots: { index: false } };
  return {
    title: `${course.title} | ShininChrist Academy`,
    description: course.summary || undefined,
  };
};

const Paragraphs = ({ text }: { text: string }) => (
  <>
    {text
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((paragraph, index) => (
        <CardDescSm
          key={index}
          className="mt-3 whitespace-pre-line !text-base !leading-7 !text-text-dark"
        >
          {paragraph}
        </CardDescSm>
      ))}
  </>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-10 font-heading text-2xl font-semibold text-primary-green">
    {children}
  </h2>
);

const CoursePage = async ({ params }: PageProps<"/academy/courses/[id]">) => {
  const { id } = await params;
  const course = await findCourse(id);
  if (!course) notFound();

  // Drafts are hidden from everyone except admins, who can preview them.
  if (course.status === "draft") {
    const user = await getCurrentUser();
    if (!user?.isAdmin) notFound();
  }

  const open = course.status !== "coming_soon";
  const { signedIn, allowed, userId } = open
    ? await getMemberAccess()
    : { signedIn: false, allowed: false, userId: null };
  // What this member has already sent for this course, so they can see it arrived.
  const mine =
    allowed && userId && course.assignments.length > 0
      ? await prisma.form_submissions.findMany({
          where: { type: "assignment", user_id: userId },
          orderBy: { created_at: "desc" },
          select: { reference: true, status: true, created_at: true, data: true },
        })
      : [];
  const meta = [fieldTitle(course.field), course.level, course.duration]
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="flex-1 bg-cream py-10 lg:py-14">
      <article className="wrapper-narrow">
        <MainHeading as="h1" className="!text-primary-green">
          {course.title}
        </MainHeading>
        <div className="mt-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Academy", href: "/academy" },
              { label: "Courses", href: "/academy/courses" },
              { label: course.title, href: `/academy/courses/${course.id}` },
            ]}
          />
        </div>
        <CardDescSm className="mt-3 !text-text-grey">{meta}</CardDescSm>
        {course.status === "draft" && (
          <p className="mt-3 rounded-md bg-primary-gold/20 px-3 py-2 text-sm text-card-heading">
            Draft: only admins can see this course.
          </p>
        )}

        {course.image && (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
            <Image
              src={course.image}
              alt={course.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {course.summary && (
          <CardDescSm className="mt-6 !text-lg !leading-8 !text-text-dark">
            {course.summary}
          </CardDescSm>
        )}
        <Paragraphs text={course.description} />

        {course.status === "coming_soon" && (
          <p className="mt-8 rounded-xl border border-primary-gold/30 bg-white-color p-5 text-base text-text-dark">
            This course is coming soon. Lessons will appear here once it opens.
          </p>
        )}

        {open && course.lessons.length > 0 && (
          <>
            <Heading>Lessons</Heading>
            {allowed ? (
              <ol className="mt-4 grid gap-6">
                {course.lessons.map((lesson, index) => {
                  const embed = lesson.videoUrl
                    ? youtubeEmbedUrl(lesson.videoUrl)
                    : null;
                  return (
                    <li
                      key={lesson.id}
                      id={lesson.id}
                      className="scroll-mt-24 rounded-xl border border-primary-green/10 bg-white-color p-5"
                    >
                      <h3 className="font-heading text-xl font-semibold text-card-heading">
                        {index + 1}. {lesson.title}
                      </h3>
                      {lesson.summary && (
                        <CardDescSm className="mt-1 !text-text-grey">
                          {lesson.summary}
                        </CardDescSm>
                      )}
                      {embed && (
                        <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg bg-black">
                          <iframe
                            src={embed}
                            title={`${lesson.title} video`}
                            loading="lazy"
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="absolute inset-0 h-full w-full"
                          />
                        </div>
                      )}
                      <Paragraphs text={lesson.content} />
                      {lesson.videoUrl && !embed && (
                        <Link
                          href={lesson.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex rounded-lg bg-primary-green px-5 py-2.5 text-sm font-semibold text-white-color hover:opacity-90"
                        >
                          Watch the video
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <>
                {/* Visitors see only the lesson names; the lesson text is never sent to them. */}
                <ol className="mt-4 list-decimal rounded-xl border border-primary-green/10 bg-white-color py-4 pl-9 pr-5 text-base text-text-dark">
                  {course.lessons.map((lesson) => (
                    <li key={lesson.id} className="py-1">
                      {lesson.title}
                    </li>
                  ))}
                </ol>
                <div className="mt-4 rounded-xl border border-primary-gold/30 bg-white-color p-5">
                  <p className="text-base text-text-dark">
                    {signedIn
                      ? "Lessons, resources and assignments open once your membership is active. Complete your registration to continue."
                      : "Lessons, resources and assignments are for active ShininChrist members. Join or log in to learn."}
                  </p>
                  {signedIn ? (
                    <Link
                      href="/account"
                      className="mt-3 inline-flex rounded-lg bg-primary-green px-5 py-2.5 text-sm font-semibold text-white-color hover:opacity-90"
                    >
                      Go to my account
                    </Link>
                  ) : (
                    // New visitors join; existing members log in with the site's normal Google sign-in and
                    // come back to this course afterwards. Signing in alone does not unlock the lessons.
                    <div className="mt-4 grid max-w-md gap-3 sm:grid-cols-2">
                      <ButtonSm
                        url="/join"
                        text="Join ShininChrist"
                        bgColor="var(--primary-green)"
                        textColor="var(--white-color)"
                        shape="rounded"
                      />
                      <ButtonOutline
                        url={`/login?next=${encodeURIComponent(`/academy/courses/${course.id}`)}`}
                        text="Log in"
                        borderColor="var(--primary-green)"
                        shape="rounded"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {open && allowed && course.resources.length > 0 && (
          <>
            <Heading>Learning resources</Heading>
            <ul className="mt-4 divide-y divide-primary-green/10 rounded-xl border border-primary-green/10 bg-white-color">
              {course.resources.map((resource) => (
                <li key={resource.id} className="px-5 py-4">
                  <Link
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary-green underline-offset-2 hover:underline"
                  >
                    {resource.title}
                  </Link>
                  {resource.note && (
                    <CardDescSm className="mt-1 !text-text-grey">
                      {resource.note}
                    </CardDescSm>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        {open && allowed && course.assignments.length > 0 && (
          <>
            <Heading>Assignments</Heading>
            <ul className="mt-4 grid gap-4">
              {course.assignments.map((assignment) => (
                <li
                  key={assignment.id}
                  className="rounded-xl border border-primary-green/10 bg-white-color p-5"
                >
                  <h3 className="font-heading text-lg font-semibold text-card-heading">
                    {assignment.title}
                  </h3>
                  {assignment.dueNote && (
                    <CardDescSm className="mt-1 !text-text-grey">
                      {assignment.dueNote}
                    </CardDescSm>
                  )}
                  <Paragraphs text={assignment.instructions} />
                  <AssignmentSubmit
                    courseId={course.id}
                    assignmentId={assignment.id}
                    past={mine
                      .filter((row) => {
                        const d = row.data as Record<string, unknown>;
                        return d.courseId === course.id && d.assignmentId === assignment.id;
                      })
                      .map((row) => ({
                        reference: row.reference,
                        status: row.status,
                        createdAt: row.created_at.toISOString(),
                      }))}
                  />
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-10">
          <Link
            href="/academy/courses#all-courses"
            className="inline-flex rounded-lg border border-primary-green/30 px-5 py-3 text-sm font-semibold text-primary-green hover:bg-primary-green/5"
          >
            All courses
          </Link>
        </div>
      </article>
    </main>
  );
};

export default CoursePage;
