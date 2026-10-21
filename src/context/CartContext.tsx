"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

export interface CartItem {
  slug: string;
  title: string;
  price: number;
  priceFormatted: string;
  category: string;
  image?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    item: {
      slug: string;
      title: string;
      price?: string;
      category: string;
      images?: string[];
    },
    quantity?: number,
  ) => boolean;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, deltaOrExact: number, isDelta?: boolean) => void;
  clearCart: () => void;
  totalCount: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "shininchrist_store_cart_v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore JSON errors
    } finally {
      setMounted(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items, mounted]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (
      product: {
        slug: string;
        title: string;
        price?: string;
        category: string;
        images?: string[];
      },
      quantity = 1,
    ): boolean => {
      if (!product.price) return false;
      const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
      if (isNaN(numericPrice) || numericPrice <= 0) return false;

      const qty = Math.max(1, quantity);
      const img = product.images?.[0];
      const priceFormatted = product.price ?? "$0.00";

      setItems((prev) => {
        const existingIndex = prev.findIndex((i) => i.slug === product.slug);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: Math.min(50, updated[existingIndex].quantity + qty),
          };
          return updated;
        }
        return [
          ...prev,
          {
            slug: product.slug,
            title: product.title,
            price: numericPrice,
            priceFormatted,
            category: product.category,
            image: img,
            quantity: qty,
          },
        ];
      });

      setIsOpen(true);
      return true;
    },
    [],
  );

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, value: number, isDelta = false) => {
      setItems((prev) =>
        prev
          .map((item) => {
            if (item.slug !== slug) return item;
            const newQty = isDelta ? item.quantity + value : value;
            return { ...item, quantity: Math.max(0, Math.min(50, newQty)) };
          })
          .filter((item) => item.quantity > 0),
      );
    },
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalAmount = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalCount,
      totalAmount,
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalCount,
      totalAmount,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
