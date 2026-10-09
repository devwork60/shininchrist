import Image from "next/image";
import Link from "next/link";
import AuthIcons from "@/components/icons/AuthIcons";
import SocialIcons from "@/components/icons/SocialIcons";
import { JOIN_GLANCE, SOCIAL_OPTIONS } from "@/constant/joinData";

type ActionKind = "google" | "social" | "upload" | "uniform";

/** Picture and optional action button for each of the ten steps (index = step number - 1). */
const VISUALS: {
  image: string;
  w: number;
  h: number;
  action?: ActionKind;
  actionAfterText?: boolean;
}[] = [
  { image: "s1", w: 258, h: 276, action: "google" },
  { image: "s2", w: 408, h: 408 },
  { image: "s3", w: 378, h: 378 },
  { image: "social", w: 480, h: 336, action: "social", actionAfterText: true },
  { image: "s5", w: 582, h: 402, action: "upload", actionAfterText: true },
  { image: "s6", w: 528, h: 336, action: "uniform", actionAfterText: true },
  { image: "s7", w: 390, h: 336 },
  { image: "s8", w: 408, h: 300 },
  { image: "s9", w: 300, h: 300 },
  { image: "s10", w: 516, h: 402 },
];

const ActionButton = ({ kind }: { kind: ActionKind }) => {
  const google = kind === "google";
  const label = {
    google: "Sign in with Google",
    social: "Choose a platform",
    upload: "Upload Screenshot",
    uniform: "Request Uniform",
  }[kind];
  return (
    <Link
      href="#join-wizard"
      className={
        google
          ? "inline-flex items-center justify-center gap-2 rounded-md bg-[#1a73e8] px-4 py-2.5 text-sm font-semibold text-white-color hover:bg-[#1557b0]"
          : "inline-flex items-center justify-center gap-2 rounded-md bg-primary-green px-4 py-2.5 text-sm font-semibold text-white-color hover:bg-primary-green-deep"
      }
    >
      {google && (
        <AuthIcons
          name="google"
          className="h-5 w-5 rounded-sm bg-white-color p-0.5 [&>svg]:h-full [&>svg]:w-full"
        />
      )}
      {label}
    </Link>
  );
};

/** The ten steps, laid out like the approved flow graphic: picture, text, action, green lock note. */
const JoinStepsGlance = () => (
  <section className="bg-cream py-8 lg:py-10">
    <div className="wrapper">
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8 lg:gap-y-6">
        {JOIN_GLANCE.map(({ title, text, list, note }, index) => {
          const visual = VISUALS[index];
          const hasArrow = index % 5 !== 4;
          return (
            <li
              key={title}
              className="relative flex flex-col rounded-xl border border-primary-gold/25 bg-white-color shadow-sm"
            >
              <div className="flex flex-1 flex-col p-4">
                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-text-dark text-sm font-bold text-white-color">
                    {index + 1}
                  </span>
                  <h3 className="text-[15px] font-bold leading-tight text-text-dark">
                    {title}
                  </h3>
                </div>

                <div className="relative mx-auto mt-4 h-24 w-full max-w-[150px]">
                  {visual.image === "social" ? (
                    <div className="grid h-full grid-cols-2 place-items-center gap-2">
                      {SOCIAL_OPTIONS.map(({ id }) => (
                        <SocialIcons
                          key={id}
                          name={id}
                          className="h-9 w-9 [&>svg]:h-full [&>svg]:w-full"
                        />
                      ))}
                    </div>
                  ) : (
                    <Image
                      src={`/images/join/${visual.image}.webp`}
                      alt=""
                      fill
                      sizes="150px"
                      className="object-contain"
                    />
                  )}
                </div>

                {visual.action && !visual.actionAfterText && (
                  <div className="mt-4 grid">
                    <ActionButton kind={visual.action} />
                  </div>
                )}

                <p className="mt-4 text-[13px] leading-5 text-text-dark">
                  {text}
                </p>

                {list && (
                  <ul className="mt-2 grid list-disc gap-0.5 pl-4 text-xs text-text-dark">
                    {list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {visual.action && visual.actionAfterText && (
                  <div className="mt-auto grid pt-4">
                    <ActionButton kind={visual.action} />
                  </div>
                )}
              </div>
              <p className="rounded-b-xl bg-primary-green px-3 py-3 text-xs font-medium leading-snug text-white-color">
                🔒 {note}
              </p>

              {hasArrow && (
                <span
                  aria-hidden="true"
                  className="absolute -right-6 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center text-xl font-bold text-primary-green lg:flex"
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default JoinStepsGlance;
