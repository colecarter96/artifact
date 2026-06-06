"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  claimFreeShippingPromo,
  FREE_SHIPPING_PROMO_CODE,
  hasSeenEmailPromo,
  isValidEmail,
  markEmailPromoSeen,
} from "@/lib/shipping-promo";

export function EmailPromoModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (pathname !== "/" || hasSeenEmailPromo()) return;

    const timer = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  function handleClose() {
    markEmailPromoSeen();
    setOpen(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Could not save your email.");
      }

      if (claimFreeShippingPromo(email)) {
        setClaimed(true);
        return;
      }

      setError("Something went wrong. Try again.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save your email.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-promo-title"
        className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
      >
        {claimed ? (
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-pink-400">
              You&apos;re in
            </p>
            <h2
              id="email-promo-title"
              className="mt-2 text-xl font-extrabold text-neutral-900"
            >
              Free shipping unlocked
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Use this code at checkout:
            </p>
            <p className="mt-4 rounded-xl bg-pink-400 px-4 py-3 text-lg font-extrabold tracking-widest text-black">
              {FREE_SHIPPING_PROMO_CODE}
            </p>
            <p className="mt-3 text-xs text-neutral-500">
              We saved it for this browser. Enter it when you checkout.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-5 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-neutral-400"
              aria-label="Close"
            >
              ✕
            </button>
            <p className="text-xs font-semibold uppercase text-pink-400">
              Welcome offer
            </p>
            <h2
              id="email-promo-title"
              className="mt-2 text-xl font-extrabold text-neutral-900"
            >
              Get free shipping
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              Drop your email and we&apos;ll give you a code for free shipping on
              your first order.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
                className="w-full border border-neutral-200 px-3 py-3 text-sm outline-none focus:border-neutral-900"
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-pink-400 py-3 text-sm font-semibold text-black disabled:opacity-60"
              >
                {submitting ? "Saving…" : "Get my code"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
