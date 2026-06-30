"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductPrice } from "@/components/product-price";
import { useCart } from "@/context/cart-context";
import { formatUSD } from "@/lib/format";
import { ONE_SIZE } from "@/lib/products";
import { startCheckout } from "@/lib/start-checkout";

export function CartDrawer() {
  const {
    items,
    subtotal,
    isOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
  } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleCheckout() {
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      await startCheckout(
        items.map((line) => ({
          productId: line.productId,
          slug: line.slug,
          name: line.name,
          colorName: line.colorName,
          size: line.size,
          quantity: line.quantity,
        })),
        items.map((line) => ({
          productId: line.productId,
          name: line.name,
          price: line.price,
          quantity: line.quantity,
        })),
      );
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Checkout failed. Please try again.",
      );
      setCheckoutLoading(false);
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden={!isOpen}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4">
          <h2 className="text-base font-bold uppercase tracking-wide">Cart</h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="flex h-9 w-9 items-center justify-center text-neutral-500 hover:bg-neutral-100"
            aria-label="Close bag"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-neutral-600">Your bag is empty</p>
            <button
              type="button"
              onClick={closeDrawer}
              className="bg-neutral-900 px-6 py-3 text-xs font-medium uppercase tracking-widest text-white"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-4 py-4">
              {items.map((line) => (
                <li
                  key={line.lineId}
                  className="flex gap-3 border-b border-neutral-100 py-4 last:border-0"
                >
                  <Link
                    href={`/products/${line.slug}`}
                    onClick={closeDrawer}
                    className="relative h-24 w-24 shrink-0 overflow-hidden bg-white"
                  >
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/products/${line.slug}`}
                      onClick={closeDrawer}
                      className="truncate text-sm font-bold uppercase tracking-wide hover:underline"
                    >
                      {line.name}
                    </Link>
                    {(line.colorName !== "Default" || line.size !== ONE_SIZE) && (
                      <p className="text-xs text-neutral-500">
                        {[
                          line.colorName !== "Default" ? line.colorName : null,
                          line.size !== ONE_SIZE ? line.size : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                    <ProductPrice
                      cents={line.price}
                      className="mt-1 text-sm font-normal text-neutral-900"
                    />
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center text-neutral-600"
                          onClick={() =>
                            updateQuantity(line.lineId, line.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center text-neutral-600"
                          onClick={() =>
                            updateQuantity(line.lineId, line.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-neutral-500 underline"
                        onClick={() => removeItem(line.lineId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-neutral-300/80 bg-white p-4">
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <ProductPrice
                  cents={subtotal}
                  className="font-normal text-neutral-900"
                />
              </div>
              <p className="mb-4 text-xs text-neutral-600">
                Free shipping on all orders.
              </p>
              {checkoutError && (
                <p className="mb-3 text-xs text-red-600">{checkoutError}</p>
              )}
              <button
                type="button"
                disabled={checkoutLoading}
                className="w-full bg-neutral-900 py-3.5 text-xs font-medium uppercase tracking-widest text-white transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleCheckout}
              >
                {checkoutLoading
                  ? "Opening checkout…"
                  : `Checkout — ${formatUSD(subtotal)}`}
              </button>
              <button
                type="button"
                onClick={closeDrawer}
                className="mt-3 w-full py-2 text-center text-sm text-neutral-600 underline"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
