const badges = [
  { label: "100% Cotton" },
  { label: "Free Shipping" },
  { label: "Order Tracking" },
  { label: "Secure Checkout" },
  { label: "30-Day Returns" },
  { label: "Real Support" },
] as const;

type TrustBadgesProps = {
  compact?: boolean;
};

export function TrustBadges({ compact = false }: TrustBadgesProps) {
  return (
    <ul
      className={`flex flex-wrap justify-center gap-x-4 gap-y-2 ${
        compact ? "text-[10px] gap-x-3" : "text-xs"
      } text-neutral-600`}
    >
      {badges.map((badge) => (
        <li
          key={badge.label}
          className="inline-flex items-center gap-1 whitespace-nowrap border border-neutral-200 bg-white px-2 py-1"
        >
          <span className="text-brand text-[10px]" aria-hidden>
            ✓
          </span>
          {badge.label}
        </li>
      ))}
    </ul>
  );
}
