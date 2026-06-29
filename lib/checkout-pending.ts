import type { CheckoutItem, CheckoutTrackItem } from "@/lib/start-checkout";

export const CHECKOUT_PENDING_KEY = "artifact-checkout-pending";

export type PendingCheckout = {
  items: CheckoutItem[];
  trackItems: CheckoutTrackItem[];
};

export function savePendingCheckout(pending: PendingCheckout): void {
  sessionStorage.setItem(CHECKOUT_PENDING_KEY, JSON.stringify(pending));
}

export function readPendingCheckout(): PendingCheckout | null {
  const raw = sessionStorage.getItem(CHECKOUT_PENDING_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PendingCheckout;
    if (!Array.isArray(parsed.items) || parsed.items.length === 0) return null;
    if (!Array.isArray(parsed.trackItems)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearPendingCheckout(): void {
  sessionStorage.removeItem(CHECKOUT_PENDING_KEY);
}
