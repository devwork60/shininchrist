import AuthIcons from "@/components/icons/AuthIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";

// DESIGN ONLY: sample order. Real order data comes with the uniform / payment backend.
const ORDER = {
  reference: "UNI-2026-0042",
  item: "ShininChrist T-shirt, Size M × 1",
  steps: [
    { label: "Requested", done: true },
    { label: "Payment confirmed", done: true },
    { label: "Preparing", done: false },
    { label: "Shipped", done: false },
    { label: "Delivered", done: false },
  ],
};

const UniformOrderCard = () => (
  <div className="rounded-xl border border-primary-green/10 bg-white-color p-6">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="font-heading text-xl font-semibold text-primary-green">
          Uniform order
        </h2>
        <CardDescSm className="mt-1">
          {ORDER.item} · Ref {ORDER.reference}
        </CardDescSm>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-md border border-primary-green/30 px-3 py-2 text-xs font-semibold text-text-dark hover:bg-cream"
      >
        View receipt
      </button>
    </div>

    <ol className="mt-5 grid grid-cols-5 gap-1 text-center">
      {ORDER.steps.map(({ label, done }) => (
        <li key={label} className="grid justify-items-center gap-2">
          <span
            className={
              done
                ? "flex h-8 w-8 items-center justify-center rounded-full bg-primary-green text-white-color"
                : "flex h-8 w-8 items-center justify-center rounded-full border border-primary-green/25"
            }
          >
            {done && (
              <AuthIcons
                name="check"
                className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full"
              />
            )}
          </span>
          <span
            className={
              done
                ? "text-[11px] font-medium text-text-dark"
                : "text-[11px] text-text-grey"
            }
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
    <CardDescSm className="mt-4 !text-xs">
      Delivery of the uniform is not required before your account is activated.
      Activation follows confirmed payment.
    </CardDescSm>
  </div>
);

export default UniformOrderCard;
