"use client";

import { useMemo, useState } from "react";
import { FIELDS } from "@/constant/academyData";
import type {
  AcademyCourse,
  CourseAssignment,
  CourseLesson,
  CourseResource,
  CourseStatus,
} from "@/lib/site-content-schema";
import {
  Field,
  ImageUpload,
  SaveBar,
  Section,
  inputClass,
  useSection,
} from "./contentUi";

const small =
  "rounded border border-primary-green/25 px-2 py-1 text-xs font-semibold disabled:opacity-40";

const STATUS: { value: CourseStatus; label: string; tone: string }[] = [
  { value: "published", label: "Published (open for learning)", tone: "bg-primary-green text-white-color" },
  { value: "coming_soon", label: "Coming soon (listed, not open)", tone: "bg-primary-gold/20 text-card-heading" },
  { value: "draft", label: "Draft (hidden from the public)", tone: "bg-cream text-text-dark" },
];

const stamp = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

const newCourse = (): AcademyCourse => ({
  id: `course-${stamp()}`,
  title: "New course",
  field: FIELDS[0].id,
  summary: "",
  description: "",
  image: "",
  imageAlt: "",
  level: "",
  duration: "",
  status: "draft",
  lessons: [],
  resources: [],
  assignments: [],
});

/** Moves one list item up or down. */
const swap = <T,>(list: T[], index: number, by: -1 | 1): T[] => {
  const j = index + by;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[index], next[j]] = [next[j], next[index]];
  return next;
};

type Listed = "lessons" | "resources" | "assignments";

/** Creates, edits and removes Academy courses, with their lessons, learning resources and assignments. */
const AcademyCoursesForm = ({ initial }: { initial: AcademyCourse[] }) => {
  const [courses, setCourses] = useState(initial);
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { busy, message, save } = useSection("academy_courses");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => !q || c.title.toLowerCase().includes(q));
  }, [courses, query]);

  const patch = (id: string, change: Partial<AcademyCourse>) =>
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...change } : c)));

  const add = () => {
    const course = newCourse();
    setCourses((prev) => [course, ...prev]);
    setOpen(course.id);
    setQuery("");
  };

  const remove = (id: string) => {
    if (!window.confirm("Delete this course and all its lessons, resources and assignments? It disappears when you press Save.")) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  // Generic helpers for the three nested lists.
  const addItem = <K extends Listed>(course: AcademyCourse, key: K, item: AcademyCourse[K][number]) =>
    patch(course.id, { [key]: [...course[key], item] } as Partial<AcademyCourse>);
  const editItem = <K extends Listed>(course: AcademyCourse, key: K, index: number, change: Partial<AcademyCourse[K][number]>) =>
    patch(course.id, {
      [key]: (course[key] as unknown[]).map((row, i) => (i === index ? { ...(row as object), ...change } : row)),
    } as Partial<AcademyCourse>);
  const moveItem = (course: AcademyCourse, key: Listed, index: number, by: -1 | 1) =>
    patch(course.id, { [key]: swap(course[key] as unknown[], index, by) } as Partial<AcademyCourse>);
  const removeItem = (course: AcademyCourse, key: Listed, index: number) => {
    if (!window.confirm("Remove this item? It disappears when you press Save.")) return;
    patch(course.id, { [key]: (course[key] as unknown[]).filter((_, i) => i !== index) } as Partial<AcademyCourse>);
  };

  const ItemTools = ({ course, k, index, count }: { course: AcademyCourse; k: Listed; index: number; count: number }) => (
    <div className="flex gap-1">
      <button type="button" className={small} disabled={index === 0} onClick={() => moveItem(course, k, index, -1)} aria-label="Move up">↑</button>
      <button type="button" className={small} disabled={index === count - 1} onClick={() => moveItem(course, k, index, 1)} aria-label="Move down">↓</button>
      <button type="button" className={`${small} text-red-800`} onClick={() => removeItem(course, k, index)} aria-label="Remove">✕</button>
    </div>
  );

  return (
    <Section
      title="Academy courses, lessons, resources and assignments"
      hint="Create and edit the courses on the Academy pages. Each course can have lessons (text and video), learning resources (links) and assignments. Published courses are open to everyone as an overview; lessons, resources and assignments are for active members."
    >
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={add} className="rounded-md bg-primary-green px-4 py-2 text-sm font-semibold text-white-color hover:bg-primary-green-deep">
          + New course
        </button>
        <input type="search" aria-label="Search courses" placeholder="Search courses…" value={query} onChange={(e) => setQuery(e.target.value)} className={`${inputClass} max-w-xs`} />
        <span className="text-xs text-text-grey">{courses.length} courses</span>
      </div>

      <div className="grid gap-3">
        {visible.length === 0 && <p className="text-sm text-text-grey">No courses match.</p>}
        {visible.map((course) => {
          const isOpen = open === course.id;
          const tag = STATUS.find((s) => s.value === course.status) ?? STATUS[2];
          const field = FIELDS.find((f) => f.id === course.field);
          return (
            <div key={course.id} className="rounded-lg border border-primary-green/15 bg-white-color">
              <div className="flex flex-wrap items-center gap-2 p-3">
                <button type="button" onClick={() => setOpen(isOpen ? null : course.id)} className="min-w-0 flex-1 text-left" aria-expanded={isOpen}>
                  <span className="block truncate font-heading text-base font-semibold text-card-heading">{course.title || "(untitled)"}</span>
                  <span className="block truncate text-xs text-text-grey">
                    {field?.title ?? "No field"} · {course.lessons.length} lessons · {course.resources.length} resources · {course.assignments.length} assignments
                  </span>
                </button>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tag.tone}`}>{tag.value.replace("_", " ")}</span>
                <button type="button" className={`${small} text-red-800`} onClick={() => remove(course.id)} aria-label={`Delete ${course.title}`}>✕</button>
              </div>

              {isOpen && (
                <div className="grid gap-6 border-t border-primary-green/10 p-4">
                  <div className="grid gap-4 md:grid-cols-[minmax(0,230px)_minmax(0,1fr)]">
                    <div className="grid content-start gap-3">
                      <ImageUpload optional value={course.image} onChange={(url) => patch(course.id, { image: url })} />
                      <Field label="Photo description (for screen readers)">
                        <input className={inputClass} value={course.imageAlt} maxLength={160} onChange={(e) => patch(course.id, { imageAlt: e.target.value })} />
                      </Field>
                    </div>
                    <div className="grid min-w-0 gap-3">
                      <Field label="Course title">
                        <input className={inputClass} value={course.title} maxLength={100} onChange={(e) => patch(course.id, { title: e.target.value })} />
                      </Field>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Field of learning">
                          <select className={inputClass} value={course.field} onChange={(e) => patch(course.id, { field: e.target.value })}>
                            {FIELDS.map((f) => (
                              <option key={f.id} value={f.id}>{f.title}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Status">
                          <select className={inputClass} value={course.status} onChange={(e) => patch(course.id, { status: e.target.value as CourseStatus })}>
                            {STATUS.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Level (e.g. Beginner)">
                          <input className={inputClass} value={course.level} maxLength={60} onChange={(e) => patch(course.id, { level: e.target.value })} />
                        </Field>
                        <Field label="Duration (e.g. 6 weeks)">
                          <input className={inputClass} value={course.duration} maxLength={60} onChange={(e) => patch(course.id, { duration: e.target.value })} />
                        </Field>
                      </div>
                      <Field label="Short description (shown in the course list)">
                        <textarea className={inputClass} rows={2} maxLength={300} value={course.summary} onChange={(e) => patch(course.id, { summary: e.target.value })} />
                      </Field>
                      <Field label="About this course (leave a blank line between paragraphs)">
                        <textarea className={inputClass} rows={5} maxLength={8000} value={course.description} onChange={(e) => patch(course.id, { description: e.target.value })} />
                      </Field>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="grid gap-3">
                    <p className="text-sm font-semibold text-card-heading">Lessons ({course.lessons.length})</p>
                    {course.lessons.map((lesson: CourseLesson, i) => (
                      <div key={lesson.id} className="grid gap-3 rounded-md border border-primary-green/10 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-text-grey">Lesson {i + 1}</span>
                          <ItemTools course={course} k="lessons" index={i} count={course.lessons.length} />
                        </div>
                        <Field label="Lesson title">
                          <input className={inputClass} value={lesson.title} maxLength={120} onChange={(e) => editItem(course, "lessons", i, { title: e.target.value })} />
                        </Field>
                        <Field label="Short summary (optional)">
                          <input className={inputClass} value={lesson.summary} maxLength={300} onChange={(e) => editItem(course, "lessons", i, { summary: e.target.value })} />
                        </Field>
                        <Field label="Lesson text (leave a blank line between paragraphs)">
                          <textarea className={inputClass} rows={6} maxLength={20000} value={lesson.content} onChange={(e) => editItem(course, "lessons", i, { content: e.target.value })} />
                        </Field>
                        <Field label="Video address (optional). A YouTube link plays on the page; other sites open as a link.">
                          <input className={inputClass} value={lesson.videoUrl} placeholder="https://www.youtube.com/watch?v=…" onChange={(e) => editItem(course, "lessons", i, { videoUrl: e.target.value })} />
                        </Field>
                      </div>
                    ))}
                    <button type="button" className={`${small} w-fit px-3 py-2`} disabled={course.lessons.length >= 100} onClick={() => addItem(course, "lessons", { id: `lesson-${stamp()}`, title: "New lesson", summary: "", content: "", videoUrl: "" })}>
                      + Add a lesson
                    </button>
                  </div>

                  {/* Learning resources */}
                  <div className="grid gap-3">
                    <p className="text-sm font-semibold text-card-heading">Learning resources ({course.resources.length})</p>
                    {course.resources.map((resource: CourseResource, i) => (
                      <div key={resource.id} className="grid gap-3 rounded-md border border-primary-green/10 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-text-grey">Resource {i + 1}</span>
                          <ItemTools course={course} k="resources" index={i} count={course.resources.length} />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Field label="Title">
                            <input className={inputClass} value={resource.title} maxLength={120} onChange={(e) => editItem(course, "resources", i, { title: e.target.value })} />
                          </Field>
                          <Field label="Link (https://…)">
                            <input className={inputClass} value={resource.url} placeholder="https://…" onChange={(e) => editItem(course, "resources", i, { url: e.target.value })} />
                          </Field>
                        </div>
                        <Field label="Note (optional)">
                          <input className={inputClass} value={resource.note} maxLength={300} onChange={(e) => editItem(course, "resources", i, { note: e.target.value })} />
                        </Field>
                      </div>
                    ))}
                    <button type="button" className={`${small} w-fit px-3 py-2`} disabled={course.resources.length >= 100} onClick={() => addItem(course, "resources", { id: `resource-${stamp()}`, title: "New resource", url: "", note: "" })}>
                      + Add a resource
                    </button>
                  </div>

                  {/* Assignments */}
                  <div className="grid gap-3">
                    <p className="text-sm font-semibold text-card-heading">Assignments ({course.assignments.length})</p>
                    {course.assignments.map((assignment: CourseAssignment, i) => (
                      <div key={assignment.id} className="grid gap-3 rounded-md border border-primary-green/10 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-text-grey">Assignment {i + 1}</span>
                          <ItemTools course={course} k="assignments" index={i} count={course.assignments.length} />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                          <Field label="Title">
                            <input className={inputClass} value={assignment.title} maxLength={120} onChange={(e) => editItem(course, "assignments", i, { title: e.target.value })} />
                          </Field>
                          <Field label="Due note (e.g. End of week 2)">
                            <input className={inputClass} value={assignment.dueNote} maxLength={120} onChange={(e) => editItem(course, "assignments", i, { dueNote: e.target.value })} />
                          </Field>
                        </div>
                        <Field label="Instructions">
                          <textarea className={inputClass} rows={4} maxLength={8000} value={assignment.instructions} onChange={(e) => editItem(course, "assignments", i, { instructions: e.target.value })} />
                        </Field>
                      </div>
                    ))}
                    <button type="button" className={`${small} w-fit px-3 py-2`} disabled={course.assignments.length >= 100} onClick={() => addItem(course, "assignments", { id: `assignment-${stamp()}`, title: "New assignment", instructions: "", dueNote: "" })}>
                      + Add an assignment
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SaveBar busy={busy} message={message} onSave={() => save({ items: courses })} />
    </Section>
  );
};

export default AcademyCoursesForm;
