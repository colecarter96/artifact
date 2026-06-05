import Image from "next/image";
import Link from "next/link";
import { ProductDualGridImage } from "@/components/product-dual-grid-image";
import { formatUSD } from "@/lib/format";
import { hasDualViews, type Product } from "@/lib/products";

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
        {hasDualViews(product) ? (
          <ProductDualGridImage
            views={product.views}
            alt={product.name}
            className="transition-transform duration-300"
          />
        ) : (
          <div className="relative aspect-square overflow-hidden bg-neutral-100">
            <Image
              src={primary.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 512px) 50vw, 240px"
            />
          </div>
        )}
        <div className="mt-2.5 space-y-0.5">
          <h2 className="text-sm font-medium leading-snug">{product.name}</h2>
          <p className="text-xs text-neutral-500 line-clamp-1">
            {product.tagline}
          </p>
          <div className="flex items-baseline gap-2 pt-0.5">
            {onSale && product.compareAtPrice != null && (
              <span className="text-xs text-neutral-400 line-through decoration-red-500">
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
    </article>
  );
}
