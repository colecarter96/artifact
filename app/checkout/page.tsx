"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EmbeddedCheckoutForm } from "@/components/embedded-checkout-form";
import { readPendingCheckout } from "@/lib/checkout-pending";
import { createCheckoutSession } from "@/lib/start-checkout";

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function initCheckout() {
      const pending = readPendingCheckout();

      if (!pending) {
        if (!cancelled) {
          setError("Your checkout session expired. Add items and try again.");
          setLoading(false);
        }
        return;
      }

      try {
        const secret = await createCheckoutSession(
          pending.items,
          pending.trackItems,
        );

        if (!cancelled) {
          setClientSecret(secret);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Checkout failed. Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void initCheckout();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="pb-8">
      <header className="border-b border-neutral-300/80 pb-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-lg font-bold uppercase tracking-wide">Checkout</h1>
          <Link
            href="/"
            className="text-xs uppercase tracking-wide text-neutral-600 underline-offset-2 hover:underline"
          >
            Back to shop
          </Link>
        </div>
        <p className="mt-2 text-sm text-neutral-600">
          Free shipping · Secure payment via Stripe
        </p>
      </header>

      {loading && (
        <p className="mt-8 text-sm text-neutral-600">Loading checkout…</p>
      )}

      {error && (
        <div className="mt-8 space-y-4">
          <p className="text-sm text-red-600">{error}</p>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center bg-neutral-900 px-6 text-xs font-medium uppercase tracking-widest text-white"
          >
            Continue shopping
          </Link>
        </div>
      )}

      {clientSecret && (
        <div className="mt-6 min-h-[720px] overflow-hidden rounded-sm bg-white">
          <EmbeddedCheckoutForm clientSecret={clientSecret} />
        </div>
      )}
    </div>
  );
}
