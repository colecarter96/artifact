import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/policy-layout";
import { SHIPPING_WINDOW, SUPPORT_EMAIL } from "@/lib/trust";

export const metadata: Metadata = {
  title: "FAQ | Artifact",
  description: "Frequently asked questions about Artifact orders.",
};

const faqs = [
  {
    q: "Is Artifact a real store?",
    a: "Yes. We're a small studio brand. Every order is packed and shipped by our team — you'll get confirmation and tracking emails like any established shop.",
  },
  {
    q: "When will my order arrive?",
    a: `We pack within 1–2 business days. After that, delivery is typically ${SHIPPING_WINDOW} worldwide. You'll get a tracking link when it ships.`,
  },
  {
    q: "Do I need an account to order?",
    a: "No account required. Checkout with your email — we'll send your receipt and tracking there.",
  },
  {
    q: "Is checkout secure?",
    a: "Yes. Payments are processed through Stripe with industry-standard encryption. We never see or store your full card number.",
  },
  {
    q: "What if my shirt doesn't fit?",
    a: "Check our size chart on each product page. If you need to swap sizes, see our returns page — 14-day returns on unworn items.",
  },
  {
    q: "How do I contact you?",
    a: `Email ${SUPPORT_EMAIL}. We respond within one business day.`,
  },
] as const;

export default function FaqPage() {
  return (
    <PolicyLayout title="FAQ">
      <p className="text-neutral-500">
        Quick answers before you check out. Still unsure?{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-neutral-900 underline">
          Email us
        </a>
        .
      </p>
      <dl className="space-y-5">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="font-medium text-neutral-900">{item.q}</dt>
            <dd className="mt-1">{item.a}</dd>
          </div>
        ))}
      </dl>
      <p>
        <Link href="/shipping" className="underline">
          Shipping & delivery
        </Link>
        {" · "}
        <Link href="/returns" className="underline">
          Returns
        </Link>
      </p>
    </PolicyLayout>
  );
}
