import { useEffect, useState } from "react";
import {
  openPaystackCheckout,
  type CheckoutStart,
} from "@/lib/payments/paystack-checkout";
} from "@/lib/payments/paystack-checkout";
import { getJson, postJson } from "../joinApi";
import BankTransferPanel, { type TransferDetails } from "./BankTransferPanel";
import StepFrame from "../StepFrame";
import ManualPaymentPanel from "./ManualPaymentPanel";
import {
  MethodSelector,
  PaymentSummary,
  type Method,
  type Price,
} from "./PaymentParts";
import type { UniformDetails } from "./StepUniform";

interface StepPaymentProps {
  details: UniformDetails;
  onBack: () => void;
}

const StepPayment = ({ details, onBack }: StepPaymentProps) => {
  const [price, setPrice] = useState<Price | null | undefined>(undefined);
  const [method, setMethod] = useState<Method>("manual");

  useEffect(() => {
    getJson<{ price: Price | null }>("/api/join/price")
      .then((data) => setPrice(data.price))
      .catch(() => setPrice(null));
  }, []);

  const quantity = Math.max(1, Number(details.quantity) || 1);

  const pay = async () => {
    if (!price)
      throw new Error(
        "The uniform price for your country has not been set yet. Please contact us.",
      );
    const order = {
      size: details.size,
      quantity: details.quantity,
      deliveryType: details.deliveryType,
      address: details.address,
      city: details.city,
      state: details.state,
      phone: details.phone,
    });
    // Sends the browser to Paystack. The server confirms the payment when the person returns.
    openPaystackCheckout(start);
  };

  if (method === "manual")
    return (
      <ManualPaymentPanel
        details={details}
        price={price}
        onMethod={setMethod}
        onBack={onBack}
      />
    );

  return (
    <StepFrame
      title="Pay for Uniform + Delivery"
      description="Pay by card on Paystack's secure page. ShininChrist never sees your card details."
      onNext={pay}
      onBack={onBack}
      nextLabel="Pay with card"
      locked="Payment confirmation is required."
    >
      <PaymentSummary price={price} size={details.size} quantity={quantity} />
      <MethodSelector method={method} onChange={setMethod} />
      <p className="text-xs text-text-grey">
        The final amount is always calculated by our server when you pay.
      </p>
    </StepFrame>
  );
};

export default StepPayment;
