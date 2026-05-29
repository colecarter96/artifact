import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policy-layout";
import { SHIPPING_WINDOW, SUPPORT_EMAIL } from "@/lib/trust";

export const metadata: Metadata = {
  title: "Shipping & delivery | Artifact",
  description: "How Artifact ships orders worldwide.",
};

export default function ShippingPage() {
  return (
    <PolicyLayout title="Shipping & delivery">
      <p>
        Every Artifact order ships free, worldwide. No minimum order value, no
        surprise fees at checkout.
      </p>
      <h2 className="text-base font-semibold text-neutral-900">
        Processing time
      </h2>
      <p>
        Orders are packed within 1–2 business days (Monday–Friday, excluding
        holidays). You&apos;ll receive a confirmation email as soon as your
        order is placed.
      </p>
      <h2 className="text-base font-semibold text-neutral-900">
        Delivery time
      </h2>
      <p>
        Once shipped, most orders arrive within {SHIPPING_WINDOW}, depending on
        your country and local carrier. International delivery times can vary
        during peak seasons.
      </p>
      <h2 className="text-base font-semibold text-neutral-900">Tracking</h2>
      <p>
        When your package leaves our studio, we email you a tracking link so you
        can follow it to your door.
      </p>
      <p>
        Questions about your shipment? Email{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-neutral-900 underline"
        >
          {SUPPORT_EMAIL}
        </a>{" "}
        with your order number.
      </p>
    </PolicyLayout>
  );
}
