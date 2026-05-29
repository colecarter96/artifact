"use client";

import { CartProvider } from "@/context/cart-context";
import { StoreShell } from "@/components/store-shell";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <StoreShell>{children}</StoreShell>
    </CartProvider>
  );
}
