import SocialIcons from "@/components/icons/SocialIcons";
import { JOIN_LINKS, SOCIAL_OPTIONS } from "@/constant/joinData";
import ExternalAction from "../ExternalAction";
import StepFrame from "../StepFrame";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const StepSubscribe = ({ onNext, onBack }: StepProps) => (
  <StepFrame
    title="Subscribe to Social Community"
    description="To join ShininChrist, complete at least one of the following. You are welcome to connect on more than one platform."
    onNext={onNext}
    onBack={onBack}
    locked="One platform is required."
  >
    <ul className="grid gap-3 sm:grid-cols-2">
      {SOCIAL_OPTIONS.map(({ id, label, action, hint }, index) => (
        <li
          key={id}
          className="grid content-start gap-3 rounded-lg border border-primary-gold/30 bg-cream p-4"
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
        </li>
      ))}
    </ul>
    <label className="flex items-start gap-3 text-sm text-text-dark">
      <input
        type="checkbox"
        required
        className="mt-1 h-4 w-4 accent-[var(--primary-green)]"
      />
      I have subscribed or followed on at least one of the platforms above.
    </label>
  </StepFrame>
);

export default StepSubscribe;
