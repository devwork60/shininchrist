import { UNIFORM_SIZES, UNIFORM_TYPES } from "@/constant/joinData";
import JoinField from "../JoinField";
import { formToObject } from "../joinApi";
import StepFrame from "../StepFrame";

export interface UniformDetails {
  size: string;
  quantity: string;
  address: string;
  city: string;
  state: string;
  phone: string;
}

interface StepUniformProps {
  details: UniformDetails | null;
  onSave: (details: UniformDetails) => void;
  onBack: () => void;
}

const StepUniform = ({ details, onSave, onBack }: StepUniformProps) => (
  <StepFrame
    title="Request Your ShininChrist Uniform"
    description="The uniform is part of completing your registration. Choose your type and size, then tell us where to deliver it."
    onNext={(data) => {
      const values = formToObject(data);
      onSave({
        size: String(values.size),
        quantity: String(values.quantity),
        address: String(values.address),
        city: String(values.city),
        state: String(values.state ?? ""),
        phone: String(values.phone),
      });
    }}
    onBack={onBack}
    locked="Uniform request and delivery information are required."
  >
    <div className="grid gap-4 sm:grid-cols-3">
      <JoinField
        id="uniformType"
        label="Uniform Type"
        options={UNIFORM_TYPES}
        defaultValue={UNIFORM_TYPES[0]}
      />
      <JoinField
        id="size"
        label="Size"
        options={UNIFORM_SIZES}
        defaultValue={details?.size ?? ""}
      />
      <JoinField
        id="quantity"
        label="Quantity"
        type="number"
        placeholder="1"
        defaultValue={details?.quantity ?? "1"}
      />
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <JoinField
        id="address"
        label="Delivery Address"
        span={2}
        placeholder="Street address"
        defaultValue={details?.address ?? ""}
      />
      <JoinField
        id="city"
        label="City"
        placeholder="Enter city"
        defaultValue={details?.city ?? ""}
      />
      <JoinField
        id="state"
        label="State / Region"
        placeholder="Enter state or region"
        required={false}
        defaultValue={details?.state ?? ""}
      />
      <JoinField
        id="phone"
        label="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        span={2}
        defaultValue={details?.phone ?? ""}
      />
    </div>
  </StepFrame>
);

export default StepUniform;
