"use client";

import React from "react";
import UiIcons from "@/components/icons/UiIcons";
import { useCart } from "@/context/CartContext";

export const CartButton = () => {
  const { totalCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Shopping cart with ${totalCount} items`}
      className="relative flex items-center justify-center rounded-full border border-primary-gold/40 bg-white-color p-2.5 text-primary-green shadow-xs transition-colors hover:border-primary-gold hover:text-primary-gold"
    >
      <UiIcons name="cart" className="h-5 w-5" />
      {totalCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-gold text-[11px] font-bold text-white-color shadow-xs animate-scale">
          {totalCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;
