"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export function SiteHeader() {
  const { itemCount, bagPulse, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white ">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <Link href="/" className="flex items-center" aria-label="Artifact home">
          <Image
            src="/logos/logo.jpg"
            alt="Artifact"
            width={477}
            height={100}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <button
          type="button"
          onClick={openDrawer}
          className="relative -mr-1 flex h-10 w-10 items-center justify-center transition-transform active:scale-95"
          aria-label={`Open bag, ${itemCount} items`}
        >
          <BagIcon />
          {itemCount > 0 && (
            <span
              className={`absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center bg-brand px-1 text-[10px] font-semibold text-brand-foreground ${
                bagPulse ? "animate-bag-pulse" : ""
              }`}
            >
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

function BagIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 7h12l-1.2 12H7.2L6 7Z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
