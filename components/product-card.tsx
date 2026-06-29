import Image from "next/image";
import Link from "next/link";
import { ProductPrice } from "@/components/product-price";
import { type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const cover =
    product.colors[0].secondaryImage ?? product.colors[0].image;
  const extraColors = product.colors.length - 1;

  return (
    <article className="group text-center">
      <Link href={`/products/${product.slug}`} className="flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Image
            src={cover}
            alt={product.name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 512px) 100vw, 480px"
          />
        </div>
        <div className="mt-4 space-y-1">
          <h2 className="text-sm font-bold uppercase tracking-wide">
            {product.name}
          </h2>
          <ProductPrice
            cents={product.price}
            className="text-sm font-normal text-neutral-900"
          />
          {extraColors > 0 && (
            <p className="pt-1 text-[11px] text-neutral-500">
              + {extraColors} more color{extraColors === 1 ? "" : "s"}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
