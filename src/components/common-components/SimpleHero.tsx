import Image from "next/image";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import HeroTagline from "@/components/pages/typography/HeroTagline";

export interface SimpleHeroData {
  titleLines: string[];
  taglineLines: string[];
  image: string;
}

/** Title + gold bar + tagline over a photo that fades in from the right. */
const SimpleHero = ({ titleLines, taglineLines, image }: SimpleHeroData) => (
  <section className="relative isolate overflow-hidden bg-primary-green-deep text-white-color">
    <div
      aria-hidden="true"
      className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%] md:[mask-image:linear-gradient(to_right,transparent,black_30%)]"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 62vw, 100vw"
        className="object-cover object-[center_30%]"
      />
    </div>
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,14,12,0.45)_0%,rgba(8,14,12,0.2)_40%,rgba(8,14,12,0)_65%)] max-md:bg-[linear-gradient(180deg,rgba(8,14,12,0.6)_0%,rgba(8,14,12,0.8)_100%)]"
    />

    <div className="wrapper flex min-h-[360px] flex-col justify-center py-12 lg:min-h-[440px]">
      <div className="max-w-xl">
        <HeroHeading>
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </HeroHeading>
        <span
          aria-hidden="true"
          className="mt-5 block h-1 w-14 bg-gold-bright"
        />
        <HeroTagline className="mt-5 max-w-sm !font-semibold">
          {taglineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </HeroTagline>
      </div>
    </div>
  </section>
);

export default SimpleHero;
