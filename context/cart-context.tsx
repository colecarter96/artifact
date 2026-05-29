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
  cartLineKey,
  createLineId,
} from "@/lib/cart";
import type { Size } from "@/lib/products";

const STORAGE_KEY = "artifact-cart";

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
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (input: AddItemInput) => void;
  buyNow: (input: AddItemInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadStoredItems(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bagPulse, setBagPulse] = useState(false);

  useEffect(() => {
    setItems(loadStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
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

  const upsertItem = useCallback((input: AddItemInput, replaceCart: boolean) => {
    const quantity = input.quantity ?? 1;
    const lineId = createLineId(input.productId, input.colorId, input.size);

    setItems((prev) => {
      const base = replaceCart ? [] : prev;
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
  }, []);

  const addItem = useCallback(
    (input: AddItemInput) => {
      upsertItem(input, false);
      pulseBag();
    },
    [upsertItem, pulseBag],
  );

  const buyNow = useCallback(
    (input: AddItemInput) => {
      upsertItem({ ...input, quantity: input.quantity ?? 1 }, true);
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

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      bagPulse,
      openDrawer: () => setIsOpen(true),
      closeDrawer: () => setIsOpen(false),
      addItem,
      buyNow,
      removeItem,
      updateQuantity,
      clearCart: () => setItems([]),
    }),
    [
      items,
      itemCount,
      subtotal,
      isOpen,
      bagPulse,
      addItem,
      buyNow,
      removeItem,
      updateQuantity,
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

export { cartLineKey };
