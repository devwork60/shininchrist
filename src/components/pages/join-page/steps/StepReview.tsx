import AuthIcons from "@/components/icons/AuthIcons";
import StepFrame from "../StepFrame";

interface StepReviewProps {
  minor: boolean;
  onNext: () => void;
  onBack: () => void;
}

const StepReview = ({ minor, onNext, onBack }: StepReviewProps) => {
  const checks = [
    "Registration information completed",
    ...(minor ? ["Parental consent verified"] : []),
    "YouTube subscription proof received",
    "Uniform requested",
    "Payment confirmed",
  ];

  return (
    <StepFrame
      title="Registration Pending"
      description="Thank you! ShininChrist is verifying your registration. Your account stays locked from member content until every item below is confirmed."
      onNext={onNext}
      onBack={onBack}
      nextLabel="Preview: account activated"
      locked="Account remains pending until verification is complete."
    >
      <ul className="grid gap-2.5">
        {checks.map((check) => (
          <li
            key={check}
            className="grid grid-cols-[auto_1fr] items-center gap-3 text-sm text-text-dark"
          >
            <AuthIcons
              name="check"
              className="h-5 w-5 text-primary-green [&>svg]:h-full [&>svg]:w-full"
            />
            {check}
          </li>
        ))}
      </ul>
    </StepFrame>
  );
};

export default StepReview;
