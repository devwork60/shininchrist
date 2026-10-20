export interface Price {
  currency: string;
  uniformPrice: number;
  deliveryFee: number;
}

export type Method = "manual" | "card";

export const money = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

interface SummaryProps {
  price: Price | null | undefined;
  size: string;
  quantity: number;
}

/** Uniform + delivery breakdown. Display only: the server always recalculates the real amount. */
export const PaymentSummary = ({ price, size, quantity }: SummaryProps) => {
  const uniformCost = price ? price.uniformPrice * quantity : 0;
  const total = price ? uniformCost + price.deliveryFee : 0;
  return (
    <>
      <dl className="rounded-lg border border-primary-gold/40 bg-primary-gold/10 p-4">
        <div className="flex items-center justify-between py-1.5 text-sm text-text-dark">
          <dt>
            Uniform ({size} × {quantity})
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
    </>
  );
};

const OPTIONS: { value: Method; label: string; hint: string }[] = [
  {
    value: "manual",
    label: "Bank transfer / manual payment",
    hint: "Pay into our bank account, then upload your receipt for verification.",
  },
  {
    value: "card",
    label: "Pay with card (Paystack)",
    hint: "Pay securely on Paystack's page. Confirmed automatically.",
  },
];

export const MethodSelector = ({
  method,
  onChange,
  disabled,
}: {
  method: Method;
  onChange: (method: Method) => void;
  disabled?: boolean;
}) => (
  <fieldset className="grid gap-2" disabled={disabled}>
    <legend className="mb-1 text-sm font-semibold text-card-heading">
      How would you like to pay?
    </legend>
    {OPTIONS.map(({ value, label, hint }) => (
      <label
        key={value}
        className="flex cursor-pointer items-start gap-3 rounded-md border border-primary-green/20 bg-white-color p-3 text-sm has-[:checked]:border-primary-gold has-[:checked]:bg-primary-gold/10"
      >
        <input
          type="radio"
          name="method"
          checked={method === value}
          onChange={() => onChange(value)}
          className="mt-1 accent-primary-gold"
        />
        <span>
          <span className="block font-semibold text-text-dark">{label}</span>
          <span className="text-xs text-text-grey">{hint}</span>
        </span>
      </label>
    ))}
  </fieldset>
);
