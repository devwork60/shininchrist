import { useEffect, useState } from "react";
import {
  STALLED_MESSAGE,
  openPaystackCheckout,
  type CheckoutStart,
} from "@/lib/payments/paystack-popup";
import { getJson, postJson } from "../joinApi";
import StepFrame from "../StepFrame";
import type { UniformDetails } from "./StepUniform";

interface Price {
  currency: string;
  uniformPrice: number;
  deliveryFee: number;
}

interface StepPaymentProps {
  details: UniformDetails;
  onBack: () => void;
}

const money = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

const StepPayment = ({ details, onBack }: StepPaymentProps) => {
  const [price, setPrice] = useState<Price | null | undefined>(undefined);
  const [stalled, setStalled] = useState<string | null>(null);

  useEffect(() => {
    getJson<{ price: Price | null }>("/api/join/price")
      .then((data) => setPrice(data.price))
      .catch(() => setPrice(null));
  }, []);

  const quantity = Math.max(1, Number(details.quantity) || 1);
  const uniformCost = price ? price.uniformPrice * quantity : 0;
  const total = price ? uniformCost + price.deliveryFee : 0;

  const pay = async () => {
    setStalled(null);
    if (!price)
      throw new Error(
        "The uniform price for your country has not been set yet. Please contact us.",
      );
    const start = await postJson<CheckoutStart>("/api/payments/uniform", {
      size: details.size,
      quantity: details.quantity,
      address: details.address,
      city: details.city,
      state: details.state,
      phone: details.phone,
    });
    await openPaystackCheckout(start, (url) => setStalled(url));
  };

  return (
    <StepFrame
      title="Pay for Uniform + Delivery"
      description="Make payment for your uniform and delivery charge using the secure payment options provided. You will be taken to Paystack to pay; ShininChrist never sees your card details."
      onNext={pay}
      onBack={onBack}
      nextLabel="Pay securely"
      locked="Payment confirmation is required."
    >
      <dl className="rounded-lg border border-primary-gold/40 bg-primary-gold/10 p-4">
        <div className="flex items-center justify-between py-1.5 text-sm text-text-dark">
          <dt>
            Uniform ({details.size} × {quantity})
          </dt>
          <dd className="font-semibold">
            {price ? money(uniformCost, price.currency) : "—"}
          </dd>
        </div>
        <div className="flex items-center justify-between py-1.5 text-sm text-text-dark">
          <dt>Delivery charge</dt>
          <dd className="font-semibold">
            {price ? money(price.deliveryFee, price.currency) : "—"}
          </dd>
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-primary-gold/40 pt-2 text-base font-bold text-card-heading">
          <dt>Total</dt>
          <dd>{price ? money(total, price.currency) : "—"}</dd>
        </div>
      </dl>
      {price === undefined && (
        <p className="text-xs text-text-grey">Loading your price…</p>
      )}
      {price === null && (
        <p className="text-sm text-red-800">
          The uniform price for your country has not been set yet. Please
          contact us so we can help.
        </p>
      )}
      {stalled && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {STALLED_MESSAGE}{" "}
          <a
            href={stalled}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Open the payment page in a new tab
          </a>
        </p>
      )}
      <p className="text-xs text-text-grey">
        The final amount is always calculated by our server when you pay.
      </p>
    </StepFrame>
  );
};

export default StepPayment;
