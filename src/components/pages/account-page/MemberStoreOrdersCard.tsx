import Link from "next/link";
import UiIcons from "@/components/icons/UiIcons";

export interface MemberStoreOrder {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  designation: string | null;
  date: string;
}

export const MemberStoreOrdersCard = ({
  orders,
}: {
  orders: MemberStoreOrder[];
}) => {
  if (orders.length === 0) return null;

  return (
    <section className="rounded-2xl border border-primary-gold/20 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-black/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-cream p-2 text-primary-gold">
            <UiIcons name="cart" />
          </div>
          <h2 className="font-heading text-lg font-bold text-primary-green">
            Store Orders
          </h2>
        </div>
        <Link
          href="/store"
          className="text-xs font-semibold text-primary-gold hover:underline"
        >
          Visit Store →
        </Link>
      </div>

      <div className="mt-4 divide-y divide-black/5">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="flex items-center justify-between py-3 text-sm"
          >
            <div>
              <p className="font-semibold text-card-heading">
                {ord.designation || `Order ${ord.reference}`}
              </p>
              <p className="text-xs text-text-grey">
                Ref: {ord.reference} · {ord.date}
              </p>
            </div>
            <div className="text-right">
              <span className="font-bold text-primary-green">
                {ord.currency === "NGN"
                  ? `₦${ord.amount.toLocaleString()}`
                  : `$${ord.amount.toFixed(2)}`}
              </span>
              <span className="block text-[10px] uppercase font-semibold text-emerald-700">
                {ord.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemberStoreOrdersCard;
