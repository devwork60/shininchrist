"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import CartButton from "@/components/pages/store-page/CartButton";

interface MemberDashboardShellProps {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
  memberId?: string | null;
  chapter?: string | null;
  status: string;
  isAdmin?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function MemberDashboardShell({
  children,
  userName,
  userEmail,
  memberId,
  chapter,
  status,
  isAdmin = false,
}: MemberDashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      setSigningOut(false);
    }
  };

  const chapterHref = chapter
    ? `/chapters/${chapter.toLowerCase().replace(/[^a-z0-9]/g, "")}`
    : "/chapters";

  const OVERVIEW_NAV: NavItem[] = [
    {
      label: "Dashboard Overview",
      href: "/account",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: "Membership Status",
      href: "/account#membership-status",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Uniform Order",
      href: "/account#uniform-order",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      label: "Store Purchases",
      href: "/account#store-orders",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      label: "Security & Devices",
      href: "/account#security",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  const RESOURCES_NAV: NavItem[] = [
    {
      label: chapter ? `${chapter} Chapter` : "Fellowship Chapters",
      href: chapterHref,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: "Digital Library",
      href: "/library",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      label: "Kingdom Store",
      href: "/store",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: "Serve & Volunteer",
      href: "/serve",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      label: "Tithes & Giving",
      href: "/give",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Daily Devotional",
      href: "/daily/today",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="mb-6">
      <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-emerald-300/70">
        {title}
      </p>
      <div className="mt-2 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                active
                  ? "bg-primary-gold text-white shadow-sm"
                  : "text-emerald-100/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={`transition-colors ${
                  active ? "text-white" : "text-emerald-300 group-hover:text-white"
                }`}
              >
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto px-4 py-5">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link
            href="/account"
            className="flex items-center gap-3"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative h-9 w-9 rounded-xl bg-white p-1.5 shadow-sm">
              <Image
                src="/images/logo.png"
                alt="ShininChrist"
                fill
                className="object-contain p-0.5"
                sizes="36px"
              />
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-white tracking-wide">
                ShininChrist
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary-gold">
                Member Portal
              </span>
            </div>
          </Link>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-1 text-emerald-200 hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Member Profile Widget in Sidebar */}
        <div className="mt-5 rounded-2xl bg-white/10 p-3.5 border border-white/10 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-gold font-bold text-sm text-white uppercase shadow-xs">
              {userName ? userName[0] : "M"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">
                {userName}
              </p>
              <p className="truncate text-[11px] text-emerald-200/80">
                {userEmail}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-2.5 text-[10px]">
            <span className="rounded-md bg-emerald-500/25 px-2 py-0.5 font-bold uppercase tracking-wider text-emerald-200">
              {status === "active" ? "Active" : status}
            </span>
            {memberId && (
              <span className="truncate font-mono text-emerald-100/90 font-medium">
                {memberId}
              </span>
            )}
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="mt-6">
          {renderNavGroup("Account & Status", OVERVIEW_NAV)}
          {renderNavGroup("Fellowship & Resources", RESOURCES_NAV)}
        </div>
      </div>

      {/* Bottom Profile & Actions */}
      <div className="mt-6 border-t border-white/10 pt-4">
        {/* Action Shortcuts */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
          {isAdmin ? (
            <Link
              href="/admin"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-primary-gold/40 bg-primary-gold/20 px-2.5 py-1.5 text-primary-gold hover:bg-primary-gold hover:text-white transition-colors"
            >
              Admin Portal
            </Link>
          ) : (
            <Link
              href="/join"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-emerald-100 hover:bg-white/10 hover:text-white transition-colors"
            >
              Onboarding
            </Link>
          )}
          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-emerald-100 hover:bg-white/10 hover:text-white transition-colors"
          >
            Public Site
          </Link>
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/25 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {signingOut ? "Signing out..." : "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f5ef] flex flex-col lg:flex-row">
      {/* Desktop Left Aside */}
      <aside
        aria-label="Member Navigation"
        className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-40 border-r border-black/10 bg-primary-green-deep text-white shadow-xl"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Aside */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        aria-label="Member Mobile Navigation"
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-primary-green-deep text-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Right Column: Web App Header + Main Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen flex-1 min-w-0">
        {/* Web App Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/10 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-text-dark hover:bg-cream lg:hidden transition-colors"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="font-heading text-lg font-bold text-primary-green sm:text-xl">
                Member Dashboard
              </h1>
              <p className="hidden sm:block text-[11px] text-text-grey font-medium">
                ShininChrist Fellowship Portal
              </p>
            </div>
          </div>

          {/* Header Action Shortcuts */}
          <div className="flex items-center gap-2 sm:gap-3">
            {chapter && (
              <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary-gold/15 px-3 py-1 text-xs font-bold text-primary-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-gold" />
                {chapter} Chapter
              </span>
            )}

            <Link
              href="/store"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-cream/70 px-3 py-1.5 text-xs font-semibold text-text-dark hover:bg-cream hover:border-primary-gold transition-colors"
            >
              Store
            </Link>

            {/* Shopping Cart Button */}
            <CartButton />

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-cream/70 px-3 py-1.5 text-xs font-semibold text-text-dark hover:bg-cream hover:border-primary-gold transition-colors"
            >
              Public Site
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary-green/30 bg-primary-green/5 px-3 py-1.5 text-xs font-semibold text-primary-green hover:bg-primary-green hover:text-white transition-colors"
              >
                Admin
              </Link>
            )}

            <div className="h-6 w-px bg-black/10 mx-1 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-green text-white font-bold text-xs uppercase shadow-xs">
                {userName ? userName[0] : "M"}
              </div>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                title="Sign Out"
                className="rounded-lg p-1.5 text-text-grey hover:bg-cream hover:text-red-600 transition-colors"
                aria-label="Sign out"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        {children}
      </div>
    </div>
  );
}
