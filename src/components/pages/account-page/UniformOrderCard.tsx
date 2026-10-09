import Link from "next/link";
import AuthIcons from "@/components/icons/AuthIcons";
import CardDescSm from "@/components/pages/typography/CardDescSm";
import {
  ORDER_STEPS,
  orderStepsDone,
  type OrderView,
} from "@/lib/account-view";

const money = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

/** Real uniform order and delivery progress for the signed-in member. */
const UniformOrderCard = ({ order }: { order: OrderView | null }) => {
  if (!order) {
    return (
      <div className="rounded-xl border border-primary-green/10 bg-white-color p-6">
        <h2 className="font-heading text-xl font-semibold text-primary-green">
          Uniform order
        </h2>
        <CardDescSm className="mt-1">
          You have not ordered your ShininChrist uniform yet. It is part of
          completing your registration.
        </CardDescSm>
        <Link
          href="/join"
          className="mt-4 inline-block text-sm font-semibold text-primary-gold hover:underline"
        >
          Order your uniform →
        </Link>
      </div>
    );
  }

  const done = orderStepsDone(order.status);
  const paidOn = order.paidAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        order.paidAt,
      )
    : null;

  return (
    <div className="rounded-xl border border-primary-green/10 bg-white-color p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-semibold text-primary-green">
            Uniform order
          </h2>
          <CardDescSm className="mt-1">
            {order.item} · Ref {order.reference}
          </CardDescSm>
        </div>
        {order.total !== null && (
          <span className="shrink-0 font-heading text-lg font-semibold text-card-heading">
            {money(order.total, order.currency)}
          </span>
        )}
      </div>

      <ol className="mt-5 grid grid-cols-5 gap-1 text-center">
        {ORDER_STEPS.map((label, index) => {
          const finished = index < done;
          return (
            <li key={label} className="grid justify-items-center gap-2">
              <span
                className={
                  finished
                    ? "flex h-8 w-8 items-center justify-center rounded-full bg-primary-green text-white-color"
                    : "flex h-8 w-8 items-center justify-center rounded-full border border-primary-green/25"
                }
              >
                {finished && (
                  <AuthIcons
                    name="check"
                    className="h-4 w-4 [&>svg]:h-full [&>svg]:w-full"
                  />
                )}
              </span>
              <span
                className={
                  finished
                    ? "text-[11px] font-medium text-text-dark"
                    : "text-[11px] text-text-grey"
                }
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      <dl className="mt-5 grid gap-1.5 border-t border-primary-green/10 pt-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-text-grey">Delivery to</dt>
          <dd className="text-right text-text-dark">{order.deliveryAddress}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-text-grey">Payment</dt>
          <dd className="text-right text-text-dark">
            {order.paymentRef
              ? `Confirmed${paidOn ? ` on ${paidOn}` : ""} · ${order.paymentRef}`
              : "Not confirmed yet"}
          </dd>
        </div>
      </dl>

      {!order.paymentRef && (
        <Link
          href="/join"
          className="mt-4 inline-block text-sm font-semibold text-primary-gold hover:underline"
        >
          Finish payment →
        </Link>
      )}
      <CardDescSm className="mt-4 !text-xs">
        Delivery of the uniform is not required before your account is
        activated. Activation follows confirmed payment.
      </CardDescSm>
    </div>
  );
};

export default UniformOrderCard;
