import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policy-layout";
import { SUPPORT_EMAIL } from "@/lib/trust";

export const metadata: Metadata = {
  title: "Returns | Artifact",
  description: "Artifact return policy.",
};

export default function ReturnsPage() {
  return (
    <PolicyLayout title="Returns & exchanges">
      <p>
        We want you to love your tee. If it&apos;s not right, you can return
        unworn items within 14 days of delivery for a refund or exchange.
      </p>
      <h2 className="text-base font-semibold text-neutral-900">How to return</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Email us at {SUPPORT_EMAIL} with your order number.</li>
        <li>We&apos;ll send return instructions and the address to ship to.</li>
        <li>Once we receive and inspect the item, we process your refund.</li>
      </ol>
      <h2 className="text-base font-semibold text-neutral-900">Condition</h2>
      <p>
        Items must be unworn, unwashed, and in original condition with tags
        attached. We reserve the right to refuse returns that don&apos;t meet
        these criteria.
      </p>
      <h2 className="text-base font-semibold text-neutral-900">Refunds</h2>
      <p>
        Refunds are issued to your original payment method within 5–10 business
        days after we receive your return.
      </p>
    </PolicyLayout>
  );
}
