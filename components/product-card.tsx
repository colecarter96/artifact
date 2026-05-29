import Image from "next/image";
import Link from "next/link";
import { formatUSD } from "@/lib/format";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const primary = product.colors[0];
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;

  return (
    <article className="group relative flex flex-col">
      <Link href={`/products/${product.slug}`} className="flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={primary.gridImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 512px) 50vw, 240px"
          />
          {product.featured && (
            <span className="absolute left-2 top-2 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
              Popular
            </span>
          )}
        </div>
        <div className="mt-2.5 space-y-0.5">
          <h2 className="text-sm font-medium leading-snug">{product.name}</h2>
          <p className="text-xs text-neutral-500 line-clamp-1">
            {product.tagline}
          </p>
          <div className="flex items-baseline gap-2 pt-0.5">
            {onSale && product.compareAtPrice != null && (
              <span className="text-xs text-neutral-400 line-through">
                {formatUSD(product.compareAtPrice)}
              </span>
            )}
            <span
              className={`text-sm font-semibold ${onSale ? "text-red-600" : ""}`}
            >
              {formatUSD(product.price)}
            </span>
          </div>
          {product.colors.length > 1 && (
            <p className="text-[10px] text-neutral-400">
              {product.colors.length} colors
            </p>
          )}
        </div>
      </Link>
      <Link
        href={`/products/${product.slug}`}
        className="mt-2.5 flex h-9 items-center justify-center border border-neutral-900 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
      >
        Shop now
      </Link>
    </article>
  );
}
