export const EMAIL_PROMO_SEEN_KEY = "artifact-email-promo-seen";
export const EMAIL_PROMO_CLAIMED_KEY = "artifact-email-promo-claimed";
export const FREE_SHIPPING_PROMO_KEY = "artifact-free-shipping-promo";

export const FREE_SHIPPING_PROMO_CODE =
  process.env.NEXT_PUBLIC_FREE_SHIPPING_PROMO_CODE ?? "FREESHIP";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function hasSeenEmailPromo(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(EMAIL_PROMO_SEEN_KEY) === "1";
}

export function markEmailPromoSeen(): void {
  localStorage.setItem(EMAIL_PROMO_SEEN_KEY, "1");
}

export function claimFreeShippingPromo(email: string): boolean {
  if (!isValidEmail(email)) return false;

  localStorage.setItem(EMAIL_PROMO_CLAIMED_KEY, email.trim().toLowerCase());
  localStorage.setItem(FREE_SHIPPING_PROMO_KEY, FREE_SHIPPING_PROMO_CODE);
  markEmailPromoSeen();
  return true;
}

export function getStoredFreeShippingPromo(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(FREE_SHIPPING_PROMO_KEY);
}

/** Everyone gets free shipping — persist the code for checkout UI. */
export function ensureFreeShippingPromo(): string {
  if (typeof window !== "undefined") {
    localStorage.setItem(FREE_SHIPPING_PROMO_KEY, FREE_SHIPPING_PROMO_CODE);
  }
  return FREE_SHIPPING_PROMO_CODE;
}

export function isFreeShippingPromo(code: string | null | undefined): boolean {
  if (!code) return false;
  return code.trim().toUpperCase() === FREE_SHIPPING_PROMO_CODE.toUpperCase();
}
