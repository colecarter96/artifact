import { formatUSD } from "@/lib/format";
import { SALE_PRICE_CENTS } from "@/lib/products";

type ProductPriceProps = {
  cents?: number;
  className?: string;
};

export function ProductPrice({
  cents = SALE_PRICE_CENTS,
  className = "text-sm font-semibold text-red-600",
}: ProductPriceProps) {
  return <span className={className}>{formatUSD(cents)}</span>;
}
