import { UNIFORM_SIZES, UNIFORM_TYPES } from "@/constant/joinData";
import JoinField from "../JoinField";
import StepFrame from "../StepFrame";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

const StepUniform = ({ onNext, onBack }: StepProps) => (
  <StepFrame
    title="Request Your ShininChrist Uniform"
    description="The uniform is part of completing your registration. Choose your type and size, then tell us where to deliver it."
    onNext={onNext}
    onBack={onBack}
    locked="Uniform request and delivery information are required."
  >
    <div className="grid gap-4 sm:grid-cols-3">
      <JoinField
        id="uniformType"
        label="Uniform Type"
        options={UNIFORM_TYPES}
      />
      <JoinField id="size" label="Size" options={UNIFORM_SIZES} />
      <JoinField id="quantity" label="Quantity" type="number" placeholder="1" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <JoinField
        id="address"
        label="Delivery Address"
        span={2}
        placeholder="Street address"
      />
      <JoinField id="deliveryCity" label="City" placeholder="Enter city" />
      <JoinField
        id="deliveryState"
        label="State / Region"
        placeholder="Enter state or region"
      />
      <JoinField
        id="deliveryPhone"
        label="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        span={2}
      />
    </div>
  </StepFrame>
);

export default StepUniform;
