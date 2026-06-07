"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { OrderTimeline } from "@/components/order-timeline";
import { useCart } from "@/context/cart-context";
import { products, SALE_PRICE_CENTS } from "@/lib/products";
import { trackOrderComplete } from "@/lib/tiktok-pixel";

type OrderItem = {
  name: string;
  size: string;
  quantity: number;
};

type OrderDetails = {
  email: string | null;
  items: OrderItem[];
  value?: number;
  currency?: string;
  tiktokEventId?: string;
};

function orderItemsForTikTok(items: OrderItem[]) {
  return items.map((item) => {
    const product = products.find((p) => p.name === item.name);
    return {
      productId: product?.id ?? item.name,
      name: item.name,
      price: product?.price ?? SALE_PRICE_CENTS,
      quantity: item.quantity,
    };
  });
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadOrder() {
      const id = sessionId;
      if (!id) return;

      try {
        const response = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(id)}`,
        );
        const data = (await response.json()) as OrderDetails & { error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? "Could not load your order.");
        }

        if (!cancelled) {
          setOrder(data);
          const clearedKey = `artifact-checkout-cleared-${id}`;
          if (!sessionStorage.getItem(clearedKey)) {
            clearCart();
            sessionStorage.setItem(clearedKey, "1");
          }

          const tiktokKey = `artifact-tiktok-purchase-${id}`;
          if (!sessionStorage.getItem(tiktokKey) && data.items.length > 0) {
            const tiktokItems = orderItemsForTikTok(data.items);
            const value =
              data.value ??
              tiktokItems.reduce(
                (sum, item) => sum + (item.price * item.quantity) / 100,
                0,
              );

            void trackOrderComplete(
              tiktokItems,
              value,
              data.currency ?? "USD",
              {
                email: data.email ?? undefined,
                externalId: data.email ?? undefined,
              },
              data.tiktokEventId,
            );
            sessionStorage.setItem(tiktokKey, "1");
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load your order.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOrder();

    return () => {
      cancelled = true;
    };
  }, [sessionId, clearCart]);

  return (
    <div className="py-6">
      <div className="rounded-2xl bg-pink-400 p-5 sm:p-6">
        <p className="text-xs font-medium uppercase text-black/60">
          Order confirmed
        </p>
        <h1 className="mt-2 text-xl font-extrabold text-black sm:text-4xl">
          You&apos;re all set
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-black/80">
          {order?.email
            ? `A confirmation email is on its way to ${order.email}.`
            : "You'll receive a confirmation email shortly."}
        </p>

        {loading && (
          <p className="mt-6 text-sm text-black/70">Loading your order…</p>
        )}

        {error && (
          <p className="mt-6 text-sm text-black/80">
            Your payment went through. {error}
          </p>
        )}

        {order && order.items.length > 0 && (
          <div className="mt-6 border-t border-black/15 pt-6">
            <p className="text-xs font-medium uppercase text-black/60">
              Your items
            </p>
            <ul className="mt-3 space-y-2">
              {order.items.map((item) => (
                <li
                  key={`${item.name}-${item.size}`}
                  className="flex items-baseline justify-between gap-4 text-sm text-black"
                >
                  <span className="font-bold">
                    {item.name}
                    {item.quantity > 1 ? ` ×${item.quantity}` : ""}
                  </span>
                  <span className="shrink-0 text-black/70">Size {item.size}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8">
        <OrderTimeline compact />
      </div>

      <p className="mt-8 text-center text-sm leading-relaxed text-neutral-600">
        We pack orders within 1–2 business days. Once shipped, tracking lands
        in your inbox — delivery is typically 7–14 business days worldwide.
      </p>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border-2 border-black px-6 py-2.5 text-sm font-semibold text-black transition active:scale-[0.98]"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-center text-sm text-neutral-600">
          Loading confirmation…
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
