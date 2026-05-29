export const SUPPORT_EMAIL = "hello@artifact.store";

export const SHIPPING_WINDOW = "7–14 business days";

export const orderSteps = [
  {
    title: "Order confirmed",
    detail: "Receipt and order summary sent to your email right away.",
  },
  {
    title: "Packed with care",
    detail: "We pick and pack your tee within 1–2 business days.",
  },
  {
    title: "On its way",
    detail: "Tracking link emailed the moment your package ships.",
  },
  {
    title: "At your door",
    detail: `Delivered worldwide, typically within ${SHIPPING_WINDOW}.`,
  },
] as const;

export const reassurancePoints = [
  {
    title: "Real fulfillment",
    detail: "Every order is packed by our team — not a faceless dropshipper.",
  },
  {
    title: "Tracking included",
    detail: "You’ll get a tracking number as soon as your package leaves.",
  },
  {
    title: "Secure checkout",
    detail: "Payments processed securely (Stripe). We never store card details.",
  },
  {
    title: "Human support",
    detail: `Email ${SUPPORT_EMAIL} — we reply within one business day.`,
  },
] as const;
