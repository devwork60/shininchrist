import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MemberCollectionItem } from "@/constant/libraryMemberData";

interface MemberCollectionsSectionProps {
  collections: MemberCollectionItem[];
}

const MemberCollectionsSection: React.FC<MemberCollectionsSectionProps> = ({
  collections,
}) => (
  <section className="bg-white py-10 lg:py-14">
    <div className="wrapper">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
          ShininChrist Collections
        </h2>
        <Link
          href="#collections"
          className="text-xs font-semibold text-[var(--primary-green-deep)] hover:underline sm:text-sm"
        >
          View All
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {collections.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {/* Card Thumbnail */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Title & Description */}
            <div className="flex flex-1 flex-col p-4 text-center">
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-[var(--primary-green-deep)] sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default MemberCollectionsSection;
