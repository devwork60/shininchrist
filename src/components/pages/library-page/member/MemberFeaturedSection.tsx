import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MemberFeaturedItem } from "@/constant/libraryMemberData";

interface MemberFeaturedSectionProps {
  items: MemberFeaturedItem[];
}

const MemberFeaturedSection: React.FC<MemberFeaturedSectionProps> = ({
  items,
}) => (
  <section className="bg-cream py-10 lg:py-12">
    <div className="wrapper">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
          Featured for You
        </h2>
        <Link
          href="/library/featured"
          className="text-xs font-semibold text-[var(--primary-green-deep)] hover:underline sm:text-sm"
        >
          View All
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Image Container with Play Overlay Icon */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                  <svg
                    className="h-6 w-6 fill-current text-[var(--primary-green-deep)]"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-bold tracking-wider text-[var(--primary-green-deep)] uppercase">
                {item.category}
              </span>
              <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-[var(--primary-green-deep)]">
                {item.title}
              </h3>
              <p className="mt-2 text-xs font-semibold text-gray-500">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MemberFeaturedSection;
