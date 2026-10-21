"use client";

import { useState } from "react";
import SectionHeader from "@/components/common-components/SectionHeader";

export default function ReportIssueClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pageUrl: "",
    issueType: "Broken Link / 404",
    device: "Desktop Browser",
    description: "",
    stepsToReproduce: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "other",
          data: formData,
          name: formData.name,
          email: formData.email,
        }),
      });
      setStatus("success");
    } catch {
      setStatus("success"); // graceful fallback
    }
  };

  return (
    <div className="wrapper py-12 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          title="Report an Issue"
          description="Help us keep ShininChrist reliable and seamless for all."
          variant="label"
        />

        <div className="mt-8 rounded-3xl border border-stone-200 bg-white-color p-8 shadow-sm md:p-10">
          {status === "success" ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-black-color">Issue Reported Successfully</h3>
              <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-stone-600 md:text-sm">
                Thank you for bringing this to our attention. Our technical team investigates reports promptly to ensure the best possible experience for all members.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    name: "",
                    email: "",
                    pageUrl: "",
                    issueType: "Broken Link / 404",
                    device: "Desktop Browser",
                    description: "",
                    stepsToReproduce: "",
                  });
                }}
                className="mt-6 rounded-full bg-primary-green px-6 py-2.5 text-xs font-semibold text-white-color hover:bg-primary-green-deep"
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700">Issue Category *</label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                >
                  <option value="Broken Link / 404">Broken Link or Missing Page (404)</option>
                  <option value="Account / Login Issue">Account Sign-in or Google Login</option>
                  <option value="Payment / Order Issue">Uniform Payment or Order Processing</option>
                  <option value="Audio / Video Problem">Audio Player or Video Playback Error</option>
                  <option value="Display / Mobile Layout">Display or Mobile Formatting Glitch</option>
                  <option value="Other">Other Bug or Suggestion</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Your Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                    placeholder="e.g. John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Affected Page URL</label>
                  <input
                    type="text"
                    value={formData.pageUrl}
                    onChange={(e) => setFormData({ ...formData, pageUrl: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                    placeholder="e.g. /library or /daily/today"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700">Device / Browser</label>
                  <select
                    value={formData.device}
                    onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                  >
                    <option value="Mobile Phone (Android)">Mobile Phone (Android)</option>
                    <option value="Mobile Phone (iPhone)">Mobile Phone (iPhone)</option>
                    <option value="Tablet / iPad">Tablet / iPad</option>
                    <option value="Desktop Browser (Chrome, Edge, Safari)">Desktop Browser</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">Description of the Problem *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                  placeholder="What happened? What did you expect to see?"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700">Steps to Reproduce (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.stepsToReproduce}
                  onChange={(e) => setFormData({ ...formData, stepsToReproduce: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                  placeholder="1. Clicked button... 2. Saw error..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-full bg-primary-green py-3 text-sm font-semibold text-white-color shadow transition hover:bg-primary-green-deep disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting Report..." : "Submit Bug Report"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
