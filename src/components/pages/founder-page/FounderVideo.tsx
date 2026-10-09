import CardDescSm from "@/components/pages/typography/CardDescSm";
import { FOUNDER_VIDEO } from "@/constant/founderPageData";

/** Meet the Founder: plays the supplied ShininChrist intro video until the founder story is ready. */
const FounderVideo = () => (
  <section id={FOUNDER_VIDEO.id} className="scroll-mt-24 bg-cream pb-6">
    <div className="wrapper grid items-center gap-6 rounded-xl border border-primary-gold/20 bg-white-color/70 p-5 md:grid-cols-[1.2fr_1fr] lg:p-6">
      <video
        controls
        preload="metadata"
        playsInline
        aria-label={FOUNDER_VIDEO.cta}
        className="aspect-video w-full rounded-lg bg-primary-green-deep object-cover"
      >
        <source src={FOUNDER_VIDEO.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div>
        <h2 className="font-heading text-2xl font-semibold text-primary-green">
          {FOUNDER_VIDEO.title}
        </h2>
        <CardDescSm className="mt-2 !text-text-dark">
          {FOUNDER_VIDEO.text}
        </CardDescSm>
        <p className="mt-4 text-sm font-semibold text-primary-gold">
          {FOUNDER_VIDEO.cta}
        </p>
      </div>
    </div>
  </section>
);

export default FounderVideo;
