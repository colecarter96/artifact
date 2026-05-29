export function CheckoutTrust() {
  return (
    <ul
      className="space-y-1.5 text-[11px] text-neutral-500"
      aria-label="Checkout reassurance"
    >
      <li className="flex items-start gap-2">
        <span className="text-brand" aria-hidden>
          ✓
        </span>
        <span>Tracking sent when your package ships</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-brand" aria-hidden>
          ✓
        </span>
        <span>Secure checkout · Stripe</span>
      </li>
    </ul>
  );
}
