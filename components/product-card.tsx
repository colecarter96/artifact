import Image from "next/image";
import Link from "next/link";
import { ProductPrice } from "@/components/product-price";
import {
  getModelPhotoImageProps,
  getModelPhotoUrl,
} from "@/lib/model-photos";
import { getProductImageProps, getProductCategory, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const modelPhoto = getModelPhotoUrl(product.slug);
  const category = getProductCategory(product);

  return (
    <article className="group relative flex flex-col">
      <Link href={`/products/${product.slug}`} className="flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={modelPhoto ?? product.colors[0].image}
            alt={product.name}
            fill
            {...(modelPhoto
              ? getModelPhotoImageProps(product.slug)
              : getProductImageProps(product.slug))}
            sizes="(max-width: 512px) 50vw, 240px"
          />
          {/* {category === "sunglasses" && (
            <span className="absolute left-1.5 top-1.5 bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-neutral-700">
              Shades
            </span>
          )} */}
        </div>
        <div className="mt-1.5 space-y-0">
          <h2 className="text-xs font-medium leading-snug">{product.name}</h2>
          <p className="text-[11px] text-neutral-500 line-clamp-1">
            {product.tagline}
          </p>
          <div className="flex items-baseline gap-2">
            <ProductPrice
              cents={product.price}
              className="text-xs font-light text-gray-700"
            />
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
