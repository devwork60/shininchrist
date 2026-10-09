"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FLOW = ["paid", "preparing", "shipped", "delivered"] as const;
const NEXT: Record<string, string> = {
  paid: "preparing",
  preparing: "shipped",
  shipped: "delivered",
};

/** Moves a paid uniform order one step forward (preparing, shipped, delivered). */
const OrderStatusControl = ({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const next = NEXT[status];

  if (!FLOW.includes(status as (typeof FLOW)[number])) {
    return (
      <span className="text-xs text-text-grey">
        {status === "cancelled"
          ? "Cancelled"
          : "Waiting for payment, cannot be processed yet"}
      </span>
    );
  }
  if (!next)
    return (
      <span className="text-xs font-semibold text-primary-green">
        Delivered
      </span>
    );

  const move = async () => {
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
    else
      setError(
        (await res.json().catch(() => ({}))).error ?? "Could not update.",
      );
  };

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={move}
        disabled={busy}
        className="rounded-md border border-primary-green px-3 py-1.5 text-xs font-semibold text-primary-green transition-colors hover:bg-primary-green hover:text-white-color disabled:opacity-50"
      >
        {busy ? "Saving…" : `Mark as ${next}`}
      </button>
      {error && <span className="text-xs text-red-700">{error}</span>}
    </span>
  );
};

export default OrderStatusControl;
