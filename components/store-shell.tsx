"use client";

import { useEffect } from "react";
import { ensureFreeShippingPromo } from "@/lib/shipping-promo";
import { CartDrawer } from "./cart-drawer";
import { EmailPromoModal } from "./email-promo-modal";
import { PromoBar } from "./promo-bar";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function StoreShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ensureFreeShippingPromo();
  }, []);

  return (
    <>
      <PromoBar />
      <SiteHeader />
      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-6">{children}</main>
      <SiteFooter />
      <CartDrawer />
      <EmailPromoModal />
    </>
  );
}
