"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/common-components/SectionHeader";
import { FAQ_ITEMS } from "@/constant/faqData";

interface SearchEntry {
  title: string;
  category: "Chapters" | "Daily" | "Academy" | "Library & Store" | "Serve" | "Give" | "About" | "FAQ";
  description: string;
  href: string;
  badge?: string;
}

const SEARCH_DATABASE: SearchEntry[] = [
  // Chapters
  {
    title: "Chapters Overview",
    category: "Chapters",
    description: "Discover ShininChrist chapters for Men, Women, and Youth designed for holistic discipleship and fellowship.",
    href: "/chapters",
  },
  {
    title: "Men’s Chapter (I AM ADAM)",
    category: "Chapters",
    description: "Faith, leadership, integrity, family, brotherhood, and purpose for Christian men.",
    href: "/chapters/men",
  },
  {
    title: "Women’s Chapter (Daughters of the King)",
    category: "Chapters",
    description: "Spiritual depth, sisterhood, godly character, mentorship, and faith formation for women.",
    href: "/chapters/women",
  },
  {
    title: "Youth Chapter (NextGen Lights)",
    category: "Chapters",
    description: "Equipping young people to stand firm in Christ, thrive in school, and build godly character.",
    href: "/chapters/youth",
  },

  // Daily
  {
    title: "ShininChrist Daily — Today",
    category: "Daily",
    description: "Daily faith formation: Worship, The Word, Explore the Word, Live the Word, Prayer, and Go & Shine.",
    href: "/daily/today",
    badge: "Public Access",
  },
  {
    title: "Daily — This Week",
    category: "Daily",
    description: "Review current week devotional movements and audio recordings for active members.",
    href: "/daily/this-week",
    badge: "Members Only",
  },
  {
    title: "Daily — Archive",
    category: "Daily",
    description: "Browse past daily formations, search scripture references, and thematic teachings.",
    href: "/daily/archive",
    badge: "Members Only",
  },

  // Academy
  {
    title: "ShininChrist Academy",
    category: "Academy",
    description: "Holistic Christian education organized across six fields of learning.",
    href: "/academy",
  },
  {
    title: "Academy Courses & Fields of Learning",
    category: "Academy",
    description: "Scripture, Arts & Humanities, Sciences, Business, Technology, and Practical Life Skills.",
    href: "/academy/courses",
  },
  {
    title: "Examination Assessments Preparation",
    category: "Academy",
    description: "Educational preparation and resources for WAEC, NECO, UTME/JAMB, GCE, CXC/CSEC, and CAPE exams.",
    href: "/academy/assessments",
  },
  {
    title: "Teachers & Educators",
    category: "Academy",
    description: "Meet qualified born-again Christian teachers committed to academic excellence and character.",
    href: "/academy/teachers",
  },
  {
    title: "Learner Support Services",
    category: "Academy",
    description: "Tutoring, guidance, academic mentorship, and student care.",
    href: "/academy/learner-support",
  },

  // Library & Store
  {
    title: "ShininChrist Library",
    category: "Library & Store",
    description: "Protected member resource library featuring faith, hope, life, wisdom collections, music and teachings.",
    href: "/library",
    badge: "Members Only",
  },
  {
    title: "ShininChrist Store",
    category: "Library & Store",
    description: "Shop official ShininChrist books, music, apparel, uniforms, wristbands, and study materials.",
    href: "/store",
  },

  // Serve
  {
    title: "Serve With ShininChrist",
    category: "Serve",
    description: "Many ways to serve, one greater purpose. Use your time, talents, and compassion.",
    href: "/serve",
  },
  {
    title: "Volunteer Your Time",
    category: "Serve",
    description: "Serve locally or remotely in media, education, administration, events, and community outreach.",
    href: "/serve/volunteer",
  },
  {
    title: "Share Your Skills",
    category: "Serve",
    description: "Apply your professional talents in IT, medicine, law, teaching, media, and counseling for Christ.",
    href: "/serve/skills",
  },
  {
    title: "Serve in Prayer",
    category: "Serve",
    description: "Commit to interceding for the ministry, leaders, members, communities, and nations.",
    href: "/serve/prayer",
  },
  {
    title: "Serve in the Field & Missions",
    category: "Serve",
    description: "Join community outreach, evangelism teams, mission trips, and field initiatives.",
    href: "/serve/field-missions",
  },
  {
    title: "Prison Outreach Ministry",
    category: "Serve",
    description: "Bringing hope, Christian literature, and restorative spiritual support to incarcerated individuals.",
    href: "/serve/prison-outreach",
  },
  {
    title: "Community Impact (C.A.R.E.)",
    category: "Serve",
    description: "Compassion in action: food drives, school supplies, emergency relief, and compassionate aid.",
    href: "/serve/community-impact",
  },

  // Give
  {
    title: "Give & Support ShininChrist",
    category: "Give",
    description: "Support global ministry through financial gifts, in-kind donations, or major property assets.",
    href: "/give",
  },
  {
    title: "Give Financially",
    category: "Give",
    description: "Make a one-time gift to advance the gospel, fund community C.A.R.E., and build physical chapters.",
    href: "/give/financially",
  },
  {
    title: "Give In-Kind",
    category: "Give",
    description: "Donate supplies, Bibles, technology, musical instruments, vehicles, or equipment.",
    href: "/give/in-kind",
  },
  {
    title: "Give Property & Major Assets",
    category: "Give",
    description: "Inquire about donating land, buildings, vehicles, and major resources to expand ministry reach.",
    href: "/give/property-assets",
  },

  // About
  {
    title: "Meet the Founder (Evangelist Mercy)",
    category: "About",
    description: "Learn about Evangelist Georgia “Mercy” Nnabuihe, her calling, vision, and ministry journey.",
    href: "/about/founder",
  },
  {
    title: "Invite Mercy to Speak",
    category: "About",
    description: "Submit a speaking engagement request for church services, conferences, youth rallies, and ministry events.",
    href: "/about/invite-mercy",
  },
  {
    title: "Statement of Faith",
    category: "About",
    description: "Our core biblical convictions on Elohim, Jesus Christ, Salvation, Holy Scripture, and holy living.",
    href: "/about#statement-of-faith",
  },
  {
    title: "Join ShininChrist Membership",
    category: "About",
    description: "Start the membership onboarding journey, verify requirements, and receive your Member ID.",
    href: "/join",
  },
];

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories = ["All", "Chapters", "Daily", "Academy", "Library & Store", "Serve", "Give", "About", "FAQ"];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const siteMatches = SEARCH_DATABASE.filter((item) => {
      if (categoryFilter !== "All" && item.category !== categoryFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });

    const faqMatches: SearchEntry[] =
      categoryFilter === "All" || categoryFilter === "FAQ"
        ? FAQ_ITEMS.filter((item) => {
            if (!q) return false;
            return (
              item.question.toLowerCase().includes(q) ||
              item.answer.toLowerCase().includes(q) ||
              item.category.toLowerCase().includes(q)
            );
          }).map((item) => ({
            title: item.question,
            category: "FAQ" as const,
            description: item.answer.slice(0, 140) + "...",
            href: `/faqs?q=${encodeURIComponent(item.question)}`,
            badge: item.category,
          }))
        : [];

    return [...siteMatches, ...faqMatches];
  }, [query, categoryFilter]);

  return (
    <div className="wrapper py-12 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          title="Search ShininChrist"
          description="Explore resources, teachings, chapters, and ways to get involved."
          variant="label"
        />

        {/* Input */}
        <div className="relative mt-8">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type anything (e.g. Men's chapter, Daily Today, Uniform, WAEC, Volunteer, Give)..."
            className="w-full rounded-2xl border-2 border-stone-200 bg-white-color px-5 py-4 pl-12 text-base text-black-color shadow-sm transition-all focus:border-gold-bright focus:outline-none focus:ring-4 focus:ring-gold-bright/10"
            autoFocus
          />
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                categoryFilter === cat
                  ? "bg-primary-green text-white-color"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results summary */}
        <div className="mt-6 flex items-center justify-between text-xs text-stone-500">
          <span>
            {results.length} {results.length === 1 ? "result" : "results"} found
            {query && ` for “${query}”`}
          </span>
          {(query || categoryFilter !== "All") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategoryFilter("All");
              }}
              className="text-primary-green hover:underline"
            >
              Reset search
            </button>
          )}
        </div>

        {/* Results list */}
        <div className="mt-6 space-y-3">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-10 text-center">
              <p className="text-stone-700 font-medium">No results found for your search.</p>
              <p className="mt-1 text-xs text-stone-500">Try broader terms or browse the navigation menu above.</p>
            </div>
          ) : (
            results.map((item, idx) => (
              <Link
                key={`${item.href}-${idx}`}
                href={item.href}
                className="group block rounded-2xl border border-stone-200 bg-white-color p-5 shadow-sm transition hover:border-gold-bright hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary-green/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-green">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="rounded bg-gold-bright/15 px-2 py-0.5 text-[10px] font-semibold text-stone-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <svg
                    className="h-4 w-4 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-gold-bright"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="mt-2 text-base font-semibold text-black-color transition-colors group-hover:text-primary-green md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-600 md:text-sm">
                  {item.description}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
