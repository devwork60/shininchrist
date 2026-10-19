import { useEffect, useState } from "react";
import {
  openPaystackCheckout,
  type CheckoutStart,
} from "@/lib/payments/paystack-checkout";
import { getJson, postJson } from "../joinApi";
import BankTransferPanel, { type TransferDetails } from "./BankTransferPanel";
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
  const [method, setMethod] = useState<"transfer" | "card">("transfer");
  const [transfer, setTransfer] = useState<TransferDetails | null>(null);

  useEffect(() => {
    getJson<{ price: Price | null }>("/api/join/price")
      .then((data) => setPrice(data.price))
      .catch(() => setPrice(null));
  }, []);

  const quantity = Math.max(1, Number(details.quantity) || 1);
  const uniformCost = price ? price.uniformPrice * quantity : 0;
  const total = price ? uniformCost + price.deliveryFee : 0;
  // Bank transfer is a Nigerian (NGN) option. Other currencies pay by card.
  const canTransfer = price?.currency === "NGN";
  const useTransfer = canTransfer && method === "transfer";

  const pay = async () => {
    if (!price)
      throw new Error(
        "The uniform price for your country has not been set yet. Please contact us.",
      );
    const order = {
      size: details.size,
      quantity: details.quantity,
      address: details.address,
      city: details.city,
      state: details.state,
      phone: details.phone,
    };
    if (useTransfer) {
      setTransfer(
        await postJson<TransferDetails>(
          "/api/payments/uniform-transfer",
          order,
        ),
      );
      return;
    }
    const start = await postJson<CheckoutStart>("/api/payments/uniform", order);
    openPaystackCheckout(start);
  };

  if (transfer)
    return (
      <BankTransferPanel
        transfer={transfer}
        onChangeMethod={() => setTransfer(null)}
      />
    );

  return (
    <StepFrame
      title="Pay for Uniform + Delivery"
      description="Make payment for your uniform and delivery charge using the secure payment options provided. ShininChrist never sees your card details."
      onNext={pay}
      onBack={onBack}
      nextLabel={useTransfer ? "Get account number" : "Pay by card"}
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
      {canTransfer && (
        <fieldset className="grid gap-2">
          <legend className="mb-1 text-sm font-semibold text-card-heading">
            How would you like to pay?
          </legend>
          {(
            [
              [
                "transfer",
                "Bank transfer",
                "Pay from any bank app. Stays on this page.",
              ],
              ["card", "Card (Paystack)", "Opens Paystack's secure card window."],
            ] as const
          ).map(([value, label, hint]) => (
            <label
              key={value}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-primary-green/20 bg-white-color p-3 text-sm has-[:checked]:border-primary-gold has-[:checked]:bg-primary-gold/10"
            >
              <input
                type="radio"
                name="method"
                checked={method === value}
                onChange={() => setMethod(value)}
                className="mt-1 accent-primary-gold"
              />
              <span>
                <span className="block font-semibold text-text-dark">
                  {label}
                </span>
                <span className="text-xs text-text-grey">{hint}</span>
              </span>
            </label>
          ))}
        </fieldset>
      )}
      {price === undefined && (
        <p className="text-xs text-text-grey">Loading your price…</p>
      )}
      {price === null && (
        <p className="text-sm text-red-800">
          The uniform price for your country has not been set yet. Please
          contact us so we can help.
        </p>
      )}
      <p className="text-xs text-text-grey">
        The final amount is always calculated by our server when you pay.
      </p>
    </StepFrame>
  );
};

export default StepPayment;
