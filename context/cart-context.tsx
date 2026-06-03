"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type CartLine,
  clearCartStorage,
  createLineId,
  readCartFromStorage,
  writeCartToStorage,
} from "@/lib/cart";
import type { Size } from "@/lib/products";

type AddItemInput = {
  productId: string;
  slug: string;
  name: string;
  colorId: string;
  colorName: string;
  size: Size;
  price: number;
  image: string;
  quantity?: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  bagPulse: boolean;
  hydrated: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (input: AddItemInput) => void;
  buyNow: (input: AddItemInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bagPulse, setBagPulse] = useState(false);

  useEffect(() => {
    setItems(readCartFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeCartToStorage(items);
  }, [items, hydrated]);

  const itemCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items],
  );

  const pulseBag = useCallback(() => {
    setBagPulse(true);
    window.setTimeout(() => setBagPulse(false), 450);
  }, []);

  const upsertItem = useCallback(
    (input: AddItemInput, replaceCart: boolean) => {
      const quantity = input.quantity ?? 1;
      const lineId = createLineId(input.productId, input.colorId, input.size);

      setItems((prev) => {
        const base = replaceCart
          ? []
          : hydrated
            ? prev
            : readCartFromStorage();
        const existing = base.find((line) => line.lineId === lineId);

        if (existing) {
          return base.map((line) =>
            line.lineId === lineId
              ? { ...line, quantity: line.quantity + quantity }
              : line,
          );
        }

        const line: CartLine = {
          lineId,
          productId: input.productId,
          slug: input.slug,
          name: input.name,
          colorId: input.colorId,
          colorName: input.colorName,
          size: input.size,
          price: input.price,
          image: input.image,
          quantity,
        };

        return [...base, line];
      });
    },
    [hydrated],
  );

  const addItem = useCallback(
    (input: AddItemInput) => {
      upsertItem(input, false);
      pulseBag();
    },
    [upsertItem, pulseBag],
  );

  const buyNow = useCallback(
    (input: AddItemInput) => {
      upsertItem({ ...input, quantity: input.quantity ?? 1 }, false);
      setIsOpen(true);
    },
    [upsertItem],
  );

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((line) => line.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((line) => line.lineId !== lineId));
      return;
    }
    setItems((prev) =>
      prev.map((line) =>
        line.lineId === lineId ? { ...line, quantity } : line,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    clearCartStorage();
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      bagPulse,
      hydrated,
      openDrawer: () => setIsOpen(true),
      closeDrawer: () => setIsOpen(false),
      addItem,
      buyNow,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isOpen,
      bagPulse,
      hydrated,
      addItem,
      buyNow,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
