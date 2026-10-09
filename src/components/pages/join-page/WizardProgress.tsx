import clsx from "clsx";
import {
  STATUS_BY_STEP,
  WIZARD_STEPS,
  type WizardStepId,
} from "@/constant/joinData";

interface WizardProgressProps {
  steps: readonly { id: WizardStepId; label: string }[];
  current: number;
}

/** Progress bar with step labels, plus the current registration status. */
const WizardProgress = ({ steps, current }: WizardProgressProps) => {
  const percent = Math.round(((current + 1) / steps.length) * 100);
  const currentId = steps[current]?.id ?? WIZARD_STEPS[0].id;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-xs font-semibold">
        <span className="text-primary-green">
          Step {current + 1} of {steps.length}
        </span>
        <span className="rounded-full border border-primary-gold/50 bg-primary-gold/10 px-3 py-1 text-primary-gold">
          Status: {STATUS_BY_STEP[currentId]}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-3 h-2 overflow-hidden rounded-full bg-primary-green/10"
      >
        <div
          className="h-full rounded-full bg-primary-gold transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ol
        className="mt-3 hidden gap-1 text-center text-[11px] font-medium sm:grid"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={clsx(
              index === current
                ? "font-bold text-primary-green"
                : index < current
                  ? "text-primary-green"
                  : "text-text-grey",
            )}
          >
            {step.label}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-text-grey">
        Your progress is saved to your account as you go.
      </p>
    </div>
  );
};

export default WizardProgress;
