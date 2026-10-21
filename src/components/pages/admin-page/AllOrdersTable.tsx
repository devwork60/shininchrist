"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdminOrderRow } from "@/lib/members-admin";

const ORDER_STATUS_CLASSES: Record<string, string> = {
  requested: "bg-stone-100 text-stone-700 border-stone-300",
  payment_pending: "bg-amber-100 text-amber-800 border-amber-300",
  paid: "bg-emerald-100 text-emerald-800 border-emerald-300",
  preparing: "bg-blue-100 text-blue-800 border-blue-300",
  shipped: "bg-purple-100 text-purple-800 border-purple-300",
  delivered: "bg-teal-100 text-teal-800 border-teal-300",
  cancelled: "bg-red-100 text-red-700 border-red-300",
};

export default function AllOrdersTable({ initialOrders }: { initialOrders: AdminOrderRow[] }) {
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrderRow[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (!q) return true;
      return (
        o.reference.toLowerCase().includes(q) ||
        o.userName.toLowerCase().includes(q) ||
        o.userEmail.toLowerCase().includes(q) ||
        o.deliveryCity.toLowerCase().includes(q) ||
        o.deliveryPhone.toLowerCase().includes(q)
      );
    });
  }, [orders, search, statusFilter]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setBusyId(orderId);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
        );
        setMessage(`Order updated to ${newStatus}.`);
        router.refresh();
      } else {
        setMessage(data.error ?? "Failed to update order status.");
      }
    } catch {
      setMessage("Network error.");
    }
    setBusyId(null);
  };

  const money = (val: number | null, curr: string) =>
    val === null
      ? "—"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: curr || "NGN",
        }).format(val);

  return (
    <div className="space-y-6">
      {/* Search and Status Filters */}
      <div className="rounded-2xl border border-primary-green/15 bg-white-color p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-stone-600">
              Search Orders
            </label>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Order reference, customer name, email, city, phone..."
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2 text-sm text-black-color focus:border-gold-bright focus:outline-none focus:ring-2 focus:ring-gold-bright/20"
            >
              <option value="all">All Orders ({orders.length})</option>
              <option value="requested">Requested</option>
              <option value="payment_pending">Payment Pending</option>
              <option value="paid">Paid (Awaiting Fulfillment)</option>
              <option value="preparing">Preparing / Packaging</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
          <span>
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
          {(search || statusFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
              }}
              className="font-semibold text-primary-green hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="rounded-xl border border-primary-green/30 bg-primary-green/5 p-3 text-xs font-semibold text-primary-green">
          {message}
        </div>
      )}

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white-color shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50/75 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-5 py-3.5">Reference</th>
                <th className="px-5 py-3.5">Customer / Member</th>
                <th className="px-5 py-3.5">Item & Size</th>
                <th className="px-5 py-3.5">Delivery Destination</th>
                <th className="px-5 py-3.5">Total</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const statusClass =
                    ORDER_STATUS_CLASSES[o.status] ??
                    "bg-stone-100 text-stone-700 border-stone-200";
                  const dateStr = new Date(o.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    },
                  );

                  return (
                    <tr
                      key={o.id}
                      className="transition-colors hover:bg-stone-50/60"
                    >
                      <td className="px-5 py-4 font-mono text-xs font-bold text-primary-green">
                        <div>{o.reference}</div>
                        <div className="text-[11px] font-normal text-stone-400">
                          {dateStr}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/admin/members/${o.userId}`}
                          className="font-semibold text-black-color hover:text-primary-gold hover:underline"
                        >
                          {o.userName}
                        </Link>
                        <div className="text-xs text-stone-500">
                          {o.userEmail}
                        </div>
                        <div className="text-xs text-stone-500">
                          {o.deliveryPhone}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-stone-800">
                        <div className="font-semibold">
                          {o.quantity}x {o.uniformType}
                        </div>
                        <div className="text-stone-500">Size: {o.size}</div>
                      </td>
                      <td className="px-5 py-4 text-xs text-stone-700 max-w-[220px]">
                        <div className="truncate font-medium">
                          {o.deliveryAddress}
                        </div>
                        <div className="text-stone-500">
                          {o.deliveryCity}
                          {o.deliveryState ? `, ${o.deliveryState}` : ""} (
                          {o.countryCode})
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-black-color whitespace-nowrap">
                        {money(o.total, o.currency)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusClass}`}
                        >
                          {o.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {o.status === "paid" && (
                            <button
                              type="button"
                              disabled={busyId === o.id}
                              onClick={() => updateStatus(o.id, "preparing")}
                              className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-100 disabled:opacity-50"
                            >
                              Pack
                            </button>
                          )}
                          {(o.status === "paid" || o.status === "preparing") && (
                            <button
                              type="button"
                              disabled={busyId === o.id}
                              onClick={() => updateStatus(o.id, "shipped")}
                              className="rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 border border-purple-200 hover:bg-purple-100 disabled:opacity-50"
                            >
                              Ship
                            </button>
                          )}
                          {o.status === "shipped" && (
                            <button
                              type="button"
                              disabled={busyId === o.id}
                              onClick={() => updateStatus(o.id, "delivered")}
                              className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700 border border-teal-200 hover:bg-teal-100 disabled:opacity-50"
                            >
                              Deliver
                            </button>
                          )}
                          {(o.status === "requested" ||
                            o.status === "payment_pending") && (
                            <span className="text-xs text-stone-400 italic">
                              Awaiting payment
                            </span>
                          )}
                          {o.status === "delivered" && (
                            <span className="text-xs font-semibold text-teal-600">
                              ✓ Completed
                            </span>
                          )}
                          {o.status === "cancelled" && (
                            <span className="text-xs font-semibold text-red-500">
                              Cancelled
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
