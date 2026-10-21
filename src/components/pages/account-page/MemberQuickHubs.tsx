import Link from "next/link";
import UiIcons from "@/components/icons/UiIcons";

interface MemberQuickHubsProps {
  chapter?: string | null;
}

export const MemberQuickHubs = ({ chapter }: MemberQuickHubsProps) => {
  const chapterHref = chapter
    ? `/chapters/${chapter.toLowerCase()}`
    : "/chapters";

  const hubs = [
    {
      title: "Digital Library",
      description: "Bible teachings, audio messages, and member study resources.",
      href: "/library",
      icon: "book" as const,
      badge: "Resources",
    },
    {
      title: chapter ? `${chapter} Chapter` : "Ministry Chapters",
      description: "Connect with fellow believers in your active fellowship chapter.",
      href: chapterHref,
      icon: "users" as const,
      badge: "Fellowship",
    },
    {
      title: "Daily Faith Formation",
      description: "Scripture reading, daily devotional, and community prayer.",
      href: "/daily/today",
      icon: "sparkle" as const,
      badge: "Daily Devotion",
    },
    {
      title: "Ministry Store",
      description: "Christian books, original gospel music, and study aids.",
      href: "/store",
      icon: "cart" as const,
      badge: "Shop",
    },
    {
      title: "Volunteer & Serve",
      description: "Impact communities through outreach, prayer, and mission work.",
      href: "/serve",
      icon: "home" as const,
      badge: "Service",
    },
    {
      title: "Give & Support",
      description: "Partner with our missions, prison outreach, and compassion care.",
      href: "/give",
      icon: "creditCard" as const,
      badge: "Support",
    },
  ];

  return (
    <div className="mt-8 rounded-2xl border border-primary-gold/20 bg-white p-6 shadow-xs">
      <div className="border-b border-black/10 pb-3">
        <h2 className="font-heading text-lg font-bold text-primary-green">
          Member Portals & Services
        </h2>
        <p className="text-xs text-text-grey">
          Quick access to your spiritual resources, fellowship chapter, and community impact
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hubs.map((hub) => (
          <Link
            key={hub.href}
            href={hub.href}
            className="group flex flex-col justify-between rounded-xl border border-black/10 bg-cream/30 p-4 transition-all hover:border-primary-gold hover:bg-cream/60 hover:shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase text-primary-gold">
                  {hub.badge}
                </span>
                <span className="text-primary-green group-hover:text-primary-gold transition-colors">
                  <UiIcons name={hub.icon} />
                </span>
              </div>
              <h3 className="mt-3 font-heading text-base font-bold text-card-heading group-hover:text-primary-green transition-colors">
                {hub.title}
              </h3>
              <p className="mt-1 text-xs text-text-grey line-clamp-2">
                {hub.description}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-green group-hover:text-primary-gold">
              Open {hub.badge} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MemberQuickHubs;
