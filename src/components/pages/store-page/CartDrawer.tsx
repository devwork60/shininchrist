"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UiIcons from "@/components/icons/UiIcons";
import { useCart } from "@/context/CartContext";
import StoreCheckoutModal from "./StoreCheckoutModal";

export const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    totalAmount,
  } = useCart();

  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    setCheckoutOpen(true);
  };

  return (
    <>
      <div
        role="dialog"
        aria-label="Shopping Cart"
        className="fixed inset-0 z-50 overflow-hidden"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={closeCart}
        />

        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="w-screen max-w-md bg-white-color shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-xl font-bold text-primary-green">
                  Your Cart
                </h2>
                {totalCount > 0 && (
                  <span className="rounded-full bg-primary-gold px-2.5 py-0.5 text-xs font-semibold text-white-color">
                    {totalCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full p-2 text-text-grey hover:bg-black/5 hover:text-black-color"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-cream p-4 text-primary-gold">
                    <UiIcons name="cart" className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-card-heading">
                    Your cart is empty
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-text-grey">
                    Explore books, music albums, study materials, and Christian resources in our store.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-6 rounded-lg bg-primary-green px-5 py-2.5 text-sm font-semibold text-white-color hover:bg-primary-green-deep"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-black/5">
                  {items.map((item) => (
                    <li key={item.slug} className="py-4 flex gap-4 items-center">
                      {/* Product Thumbnail */}
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-cream/40">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-primary-gold font-bold text-xs">
                            SC
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/store/${item.slug}`}
                          onClick={closeCart}
                          className="block truncate text-sm font-semibold text-card-heading hover:text-primary-green"
                        >
                          {item.title}
                        </Link>
                        <p className="text-xs text-text-grey">{item.category}</p>
                        <p className="mt-1 text-sm font-bold text-primary-green">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, -1, true)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-black/20 text-xs font-bold text-text-dark hover:bg-black/5"
                          >
                            -
                          </button>
                          <span className="min-w-[1.25rem] text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.slug, 1, true)}
                            className="flex h-6 w-6 items-center justify-center rounded border border-black/20 text-xs font-bold text-text-dark hover:bg-black/5"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.slug)}
                            className="ml-auto text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer Summary & Checkout Action */}
            {items.length > 0 && (
              <div className="border-t border-black/10 bg-cream/40 p-6">
                <div className="flex items-center justify-between text-base font-semibold text-card-heading">
                  <span>Subtotal</span>
                  <span className="font-heading text-xl font-bold text-primary-green">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-text-grey">
                  Shipping and payment currency (USD or NGN) calculated at checkout.
                </p>

                <div className="mt-4 space-y-2">
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-gold py-3 text-sm font-semibold text-white-color shadow-sm transition-opacity hover:opacity-95"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full text-center text-xs text-text-grey hover:text-red-700"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <StoreCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={items}
        totalAmount={totalAmount}
      />
    </>
  );
};

export default CartDrawer;
