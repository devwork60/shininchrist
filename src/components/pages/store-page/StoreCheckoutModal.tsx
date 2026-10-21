"use client";

import React, { useState } from "react";
import Image from "next/image";
import UiIcons from "@/components/icons/UiIcons";
import { type CartItem } from "@/context/CartContext";

interface StoreCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
}

export const StoreCheckoutModal = ({
  isOpen,
  onClose,
  items,
  totalAmount,
}: StoreCheckoutModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("United States");
  const [notes, setNotes] = useState("");
  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const ngnAmount = Math.round(totalAmount * 1500);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      setError("Please fill in all required shipping and contact details.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/payments/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
          customer: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim(),
            city: city.trim(),
            state: state.trim() || undefined,
            country: country.trim() || "US",
            notes: notes.trim() || undefined,
          },
          currency,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout with payment gateway.");
      }

      // Redirect customer to Paystack hosted checkout
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={loading ? undefined : onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-primary-gold/30 bg-white-color p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <div>
            <h2 className="font-heading text-2xl font-bold text-primary-green">
              Checkout & Shipping
            </h2>
            <p className="text-xs text-text-grey">
              Secure Paystack hosted payment · Test & Live mode
            </p>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-text-grey hover:bg-black/5 hover:text-black-color"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Order Summary Mini-Box */}
          <div className="rounded-xl border border-primary-gold/20 bg-cream/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-gold">
              Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </p>
            <div className="mt-2.5 max-h-36 divide-y divide-black/5 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.slug} className="flex items-center justify-between py-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    {item.image && (
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-white-color">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="font-medium text-text-dark">
                      {item.title} <span className="text-xs text-text-grey">× {item.quantity}</span>
                    </span>
                  </div>
                  <span className="font-semibold text-primary-green">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-primary-gold/30 pt-2.5">
              <span className="text-sm font-bold text-card-heading">Total Due:</span>
              <div className="text-right">
                <span className="font-heading text-xl font-bold text-primary-green">
                  {currency === "USD" ? `$${totalAmount.toFixed(2)}` : `₦${ngnAmount.toLocaleString()}`}
                </span>
                <span className="block text-[11px] text-text-grey">
                  {currency === "USD" ? `(approx. ₦${ngnAmount.toLocaleString()})` : `($${totalAmount.toFixed(2)} USD)`}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Currency Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-dark">
              Payment Currency
            </label>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`rounded-lg border px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
                  currency === "USD"
                    ? "border-primary-green bg-primary-green text-white-color shadow-sm"
                    : "border-black/15 bg-white-color text-text-dark hover:border-primary-green"
                }`}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("NGN")}
                className={`rounded-lg border px-4 py-2.5 text-center text-sm font-semibold transition-colors ${
                  currency === "NGN"
                    ? "border-primary-green bg-primary-green text-white-color shadow-sm"
                    : "border-black/15 bg-white-color text-text-dark hover:border-primary-green"
                }`}
              >
                NGN (₦)
              </button>
            </div>
          </div>

          {/* Customer Contact */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-text-dark">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Georgia Morris"
                className="mt-1 w-full rounded-md border border-black/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-green focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-dark">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="georgia@example.com"
                className="mt-1 w-full rounded-md border border-black/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-green focus:outline-hidden"
              />
            </div>
          </div>

          {/* Phone & Country */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-text-dark">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className="mt-1 w-full rounded-md border border-black/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-green focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-dark">
                Country <span className="text-red-600">*</span>
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 w-full rounded-md border border-black/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-green focus:outline-hidden"
              >
                <option value="United States">United States</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Jamaica">Jamaica</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Ghana">Ghana</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Delivery Address & City/State */}
          <div>
            <label className="block text-xs font-semibold text-text-dark">
              Street / Delivery Address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Faith Way, Suite 4B"
              className="mt-1 w-full rounded-md border border-black/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-green focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-text-dark">
                City <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Houston"
                className="mt-1 w-full rounded-md border border-black/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-green focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-dark">
                State / Province
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Texas"
                className="mt-1 w-full rounded-md border border-black/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-green focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark">
              Delivery Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Gate code, instructions, etc."
              className="mt-1 w-full rounded-md border border-black/20 bg-white-color px-3 py-2 text-sm text-text-dark focus:border-primary-green focus:outline-hidden"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-gold py-3.5 font-semibold text-white-color shadow-md transition-opacity hover:opacity-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white-color border-t-transparent" />
                  Connecting to Paystack…
                </>
              ) : (
                <>
                  <UiIcons name="creditCard" />
                  Pay with Paystack ·{" "}
                  {currency === "USD"
                    ? `$${totalAmount.toFixed(2)}`
                    : `₦${ngnAmount.toLocaleString()}`}
                </>
              )}
            </button>
            <p className="mt-2 text-center text-[11px] text-text-grey">
              Cards, Apple Pay, Bank Transfer supported securely via Paystack.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreCheckoutModal;
