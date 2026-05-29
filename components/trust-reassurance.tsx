import Link from "next/link";
import { reassurancePoints, SUPPORT_EMAIL } from "@/lib/trust";

type TrustReassuranceProps = {
  showLinks?: boolean;
};

export function TrustReassurance({ showLinks = true }: TrustReassuranceProps) {
  return (
    <section
      className="border border-neutral-200 bg-neutral-50 p-4"
      aria-label="Why shop with Artifact"
    >
      <h2 className="text-sm font-semibold">Shop with confidence</h2>
      <ul className="mt-3 space-y-3">
        {reassurancePoints.map((point) => (
          <li key={point.title} className="flex gap-2.5">
            <span
              className="mt-0.5 shrink-0 text-brand"
              aria-hidden
            >
              ✓
            </span>
            <div>
              <p className="text-xs font-medium text-neutral-900">
                {point.title}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-neutral-500">
                {point.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {showLinks && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-neutral-200 pt-3 text-[11px]">
          <Link href="/shipping" className="text-neutral-600 underline underline-offset-2 hover:text-neutral-900">
            Shipping & delivery
          </Link>
          <Link href="/returns" className="text-neutral-600 underline underline-offset-2 hover:text-neutral-900">
            Returns
          </Link>
          <Link href="/faq" className="text-neutral-600 underline underline-offset-2 hover:text-neutral-900">
            FAQ
          </Link>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-neutral-600 underline underline-offset-2 hover:text-neutral-900"
          >
            Contact
          </a>
        </div>
      )}
    </section>
  );
}
