"use client";

import { CartDrawer } from "./cart-drawer";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-3 pb-6 pt-4">{children}</main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
