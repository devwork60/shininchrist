import Image from "next/image";
import AuthIcons from "@/components/icons/AuthIcons";
import HeroHeading from "@/components/pages/typography/HeroHeading";
import Paragraph from "@/components/pages/typography/Paragraph";
import { JOIN_HERO, JOIN_NEEDS } from "@/constant/joinData";

const JoinHero = () => (
  <section className="bg-cream">
    <div className="wrapper grid items-stretch gap-6 pt-8 lg:grid-cols-[1.3fr_1fr_0.9fr] lg:pt-10">
      <div className="self-center">
        <p className="font-heading text-sm italic text-primary-green">
          {JOIN_HERO.eyebrow}
        </p>
        <HeroHeading compact className="mt-2 !text-primary-green">
          {JOIN_HERO.titleTop}{" "}
          <span className="text-primary-gold">{JOIN_HERO.titleAccent}</span>
        </HeroHeading>
        <p className="mt-2 font-heading text-2xl text-primary-green">
          {JOIN_HERO.subtitle}
        </p>
        <Paragraph className="mt-4 max-w-md !text-text-dark lg:!text-base lg:!leading-7">
          {JOIN_HERO.description}
        </Paragraph>
      </div>

      <div className="relative min-h-[280px] lg:min-h-[330px] overflow-hidden rounded-xl lg:rounded-none lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]">
        <Image
          src={JOIN_HERO.image}
          alt="Young ShininChrist members in uniform"
          fill
          priority
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="rounded-xl bg-primary-green-deep p-6 text-white-color">
        <h2 className="font-heading text-2xl leading-snug">
          {JOIN_NEEDS.title}
        </h2>
        <ul className="mt-4 grid gap-3">
          {JOIN_NEEDS.items.map((item) => (
            <li
              key={item}
              className="grid grid-cols-[auto_1fr] items-center gap-3 text-sm"
            >
              <AuthIcons
                name="check"
                className="h-5 w-5 text-gold-bright [&>svg]:h-full [&>svg]:w-full"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default JoinHero;
