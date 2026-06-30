"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export function SiteHeader() {
  const { itemCount, bagPulse, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-300/80 bg-surface/95 backdrop-blur supports-backdrop-filter:bg-surface/90">
      <div className="mx-auto grid h-14 max-w-lg grid-cols-3 items-center px-3">
        <div aria-hidden className="w-10" />
        <Link
          href="/"
          className="flex justify-center"
          aria-label="Appropriate home"
        >
          <Image
            src="/logos/appropriate.png"
            alt="Appropriate"
            width={210}
            height={60}
            className="h-7 w-auto max-w-[40vw] object-contain"
            style={{ width: "auto", height: "1.75rem" }}
            priority
            unoptimized
          />
        </Link>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={openDrawer}
            className="relative text-xs font-medium uppercase tracking-wide transition active:opacity-60"
            aria-label={`Open cart, ${itemCount} items`}
          >
            Cart
            {itemCount > 0 && (
              <span
                className={`ml-1 inline-flex h-[18px] min-w-[18px] items-center justify-center bg-neutral-900 px-1 text-[10px] font-semibold text-white ${
                  bagPulse ? "animate-bag-pulse" : ""
                }`}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
