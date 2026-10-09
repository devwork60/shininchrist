import React from "react";
import Image from "next/image";
import Link from "next/link";
import UiIcons from "@/components/icons/UiIcons";
import { NON_MEMBER_LIBRARY_DATA } from "@/constant/libraryMemberData";

const NonMemberLibraryView: React.FC = () => {
  const {
    title,
    description,
    benefits,
    primaryCta,
    secondaryCta,
    quote,
    quoteReference,
  } = NON_MEMBER_LIBRARY_DATA;

  return (
    <div className="relative isolate min-h-[85vh] overflow-hidden bg-[var(--primary-green-deep)] text-white-color">
      {/* Background artwork */}
      <Image
        src="/images/library-hero.webp"
        alt="Library Background"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover opacity-25 filter blur-[2px]"
      />
      {/* Gradient dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(18,38,28,0.75)_0%,rgba(18,38,28,0.96)_100%)]"
      />

      <div className="wrapper flex min-h-[85vh] flex-col items-center justify-center py-12 text-center lg:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          {/* Lock Icon Badge */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 p-3 shadow-inner ring-1 ring-white/20 backdrop-blur-md">
            <svg
              className="h-9 w-9 text-[var(--gold-bright)]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm-3.75 5.25a3.75 3.75 0 117.5 0v3h-7.5v-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-base text-white/90 sm:text-lg sm:leading-relaxed">
            {description}
          </p>

          {/* Benefits Card */}
          <div className="mt-8 w-full max-w-lg rounded-2xl border border-white/15 bg-white/10 p-6 text-left shadow-2xl backdrop-blur-md sm:p-8">
            <ul className="space-y-4 text-sm font-medium text-white sm:text-base">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--gold-bright)] text-xs font-bold text-[var(--primary-green-deep)]">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex w-full max-w-md flex-col gap-4 sm:flex-row">
            <Link
              href={primaryCta.url}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary-green)] px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-[var(--gold-bright)] hover:text-[var(--primary-green-deep)] sm:w-1/2"
            >
              <span>{primaryCta.text}</span>
            </Link>
            <Link
              href={secondaryCta.url}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[var(--primary-green-deep)] sm:w-1/2"
            >
              <span>{secondaryCta.text}</span>
            </Link>
          </div>

          {/* Bottom Scripture Quote */}
          <div className="mt-12 text-center italic text-white/80">
            <p className="text-base font-medium text-[var(--gold-bright)]">
              {quote}
            </p>
            <p className="mt-1 text-xs not-italic text-white/60">
              {quoteReference}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonMemberLibraryView;
