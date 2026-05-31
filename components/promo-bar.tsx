import { promoMessages } from "@/lib/promos";

const separator = "   ·   ";
const marqueeContent = promoMessages.join(separator) + separator;

export function PromoBar() {
  return (
    <div
      className="bg-pink-400 text-black text-xs sm:text-sm font-medium"
      role="region"
      aria-label="Store highlights"
    >
      <p className="sr-only">{promoMessages.join(". ")}</p>
      <div className="overflow-hidden py-1" aria-hidden="true">
        <div className="promo-marquee-track flex w-max">
          <span className="shrink-0 px-6">{marqueeContent}</span>
          <span className="shrink-0 px-6">{marqueeContent}</span>
        </div>
      </div>
    </div>
  );
}
