"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { getStripePromise } from "@/lib/stripe-client";

type EmbeddedCheckoutFormProps = {
  clientSecret: string;
};

export function EmbeddedCheckoutForm({ clientSecret }: EmbeddedCheckoutFormProps) {
  return (
    <EmbeddedCheckoutProvider
      stripe={getStripePromise()}
      options={{ clientSecret }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
