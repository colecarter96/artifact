import { trackCheckoutStart } from "@/lib/tiktok-pixel";
import {
  clearPendingCheckout,
  savePendingCheckout,
} from "@/lib/checkout-pending";

export type CheckoutItem = {
  productId: string;
  slug: string;
  name: string;
  colorName: string;
  size: string;
  quantity: number;
};

export type CheckoutTrackItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export async function startCheckout(
  items: CheckoutItem[],
  trackItems: CheckoutTrackItem[],
): Promise<void> {
  savePendingCheckout({ items, trackItems });
  window.location.assign("/checkout");
}

export async function createCheckoutSession(
  items: CheckoutItem[],
  trackItems: CheckoutTrackItem[],
): Promise<string> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  const data = (await response.json()) as {
    clientSecret?: string;
    error?: string;
  };

  if (!response.ok || !data.clientSecret) {
    throw new Error(data.error ?? "Checkout failed. Please try again.");
  }

  void trackCheckoutStart(
    trackItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  );

  clearPendingCheckout();
  return data.clientSecret;
}
