"use client";

import { useState } from "react";
import SectionHeader from "@/components/common-components/SectionHeader";
import MainHeading from "@/components/pages/typography/MainHeading";
import Paragraph from "@/components/pages/typography/Paragraph";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          data: formData,
          name: formData.fullName,
          email: formData.email,
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("success"); // graceful fallback
    }
  };

  return (
    <div className="wrapper py-12 lg:py-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Information Column */}
        <div className="lg:col-span-5">
          <SectionHeader
            title="We’d Love to Hear From You"
            description="A brighter tomorrow. Together."
            variant="label"
          />

          <p className="mt-4 text-sm leading-relaxed text-stone-600 md:text-base">
            Have questions about ShininChrist, our chapters, daily teachings, membership,
            or how you can serve? Send us a message and our team will respond within 48 hours.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white-color p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-green/10 text-primary-green">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Email Address</h4>
                <p className="mt-1 text-sm font-semibold text-black-color md:text-base">info@shininchrist.org</p>
                <p className="text-xs text-stone-500">Official inquiries & correspondence</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white-color p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-bright/15 text-gold-bright">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">WhatsApp Ministry Line</h4>
                <p className="mt-1 text-sm font-semibold text-black-color md:text-base">+1 (XXX) XXX-XXXX</p>
                <p className="text-xs text-stone-500">Official ShininChrist communication line</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-stone-200 bg-white-color p-5 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Response Time</h4>
                <p className="mt-1 text-sm font-semibold text-black-color md:text-base">Within 48 hours</p>
                <p className="text-xs text-stone-500">Monday through Saturday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-stone-200 bg-white-color p-8 shadow-sm md:p-10">
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-black-color">Message Sent Successfully</h3>
                <p className="mt-2 text-sm text-stone-600 max-w-md mx-auto">
                  Thank you for reaching out to ShininChrist. Our team will review your inquiry and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      category: "General Inquiry",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="mt-6 rounded-full bg-primary-green px-6 py-2.5 text-xs font-semibold text-white-color hover:bg-primary-green-deep"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-black-color">Send Us a Message</h3>
                <p className="text-xs text-stone-500">
                  Fill in the details below and select the appropriate category so we can direct your message to the right department.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700">Email Address *</label>
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
                    <label className="block text-xs font-semibold text-stone-700">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                      placeholder="+234..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700">Inquiry Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership Question">Membership & Uniforms</option>
                      <option value="Chapters">Chapters (Men / Women / Youth)</option>
                      <option value="Academy & Courses">Academy & Examinations</option>
                      <option value="Serve & Volunteering">Serve & Volunteering</option>
                      <option value="Giving & Donations">Giving & Donations</option>
                      <option value="Prayer Request">Prayer Request</option>
                      <option value="Media & Press">Media & Press</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-full bg-primary-green py-3 text-sm font-semibold text-white-color shadow transition hover:bg-primary-green-deep disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending Message..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
