import StepFrame from "../StepFrame";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const rows = [
  ["Uniform cost", "—"],
  ["Delivery charge", "—"],
] as const;

const StepPayment = ({ onNext, onBack }: StepProps) => (
  <StepFrame
    title="Pay for Uniform + Delivery"
    description="Make payment for your uniform and delivery charge using the secure payment options provided."
    onNext={onNext}
    onBack={onBack}
    nextLabel="Pay securely"
    locked="Payment confirmation is required."
  >
    <dl className="rounded-lg border border-primary-gold/40 bg-primary-gold/10 p-4">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between py-1.5 text-sm text-text-dark"
        >
          <dt>{label}</dt>
          <dd className="font-semibold">{value}</dd>
        </div>
      ))}
      <div className="mt-1 flex items-center justify-between border-t border-primary-gold/40 pt-2 text-base font-bold text-card-heading">
        <dt>Total</dt>
        <dd>—</dd>
      </div>
    </dl>
    <p className="text-xs text-text-grey">
      Amounts appear here once ShininChrist sets the uniform price and delivery
      charge for your country.
    </p>
  </StepFrame>
);

export default StepPayment;
