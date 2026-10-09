import SocialIcons from "@/components/icons/SocialIcons";
import { JOIN_LINKS, SOCIAL_OPTIONS } from "@/constant/joinData";
import ExternalAction from "../ExternalAction";
import StepFrame from "../StepFrame";

interface StepSubscribeProps {
  platform: string;
  onPlatform: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepSubscribe = ({
  platform,
  onPlatform,
  onNext,
  onBack,
}: StepSubscribeProps) => (
  <StepFrame
    title="Subscribe to Social Community"
    description="To join ShininChrist, complete at least one of the following. You are welcome to connect on more than one platform."
    onNext={() => {
      if (!platform)
        throw new Error(
          "Please choose the platform you subscribed or followed on.",
        );
      onNext();
    }}
    onBack={onBack}
    locked="One platform is required."
  >
    <ul className="grid gap-3 sm:grid-cols-2">
      {SOCIAL_OPTIONS.map(({ id, label, action, hint }, index) => (
        <li
          key={id}
          className={
            platform === id
              ? "grid content-start gap-3 rounded-lg border-2 border-primary-green bg-cream p-4"
              : "grid content-start gap-3 rounded-lg border border-primary-gold/30 bg-cream p-4"
          }
        >
          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <SocialIcons
              name={id}
              className="h-9 w-9 [&>svg]:h-full [&>svg]:w-full"
            />
            <div>
              <p className="text-xs font-semibold uppercase text-text-grey">
                Option {index + 1}
              </p>
              <p className="font-heading text-lg font-semibold text-card-heading">
                {label}
              </p>
            </div>
          </div>
          <p className="text-sm text-text-dark">{hint}</p>
          <div>
            <ExternalAction
              url={JOIN_LINKS[id]}
              text={action}
              tone={id === "youtube" ? "youtube" : "neutral"}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-text-dark">
            <input
              type="radio"
              name="platform"
              value={id}
              checked={platform === id}
              onChange={() => onPlatform(id)}
              className="h-4 w-4 accent-[var(--primary-green)]"
            />
            I did this one
          </label>
        </li>
      ))}
    </ul>
  </StepFrame>
);

export default StepSubscribe;
