"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatUSD } from "@/lib/format";
import {
  hasDualViews,
  isProductCheckoutReady,
  type ColorVariant,
  type Product,
  type Size,
} from "@/lib/products";
import { CheckoutTrust } from "./checkout-trust";
import { ProductDualGallery } from "./product-dual-gallery";
import { OrderTimeline } from "./order-timeline";
import { SizeChartModal } from "./size-chart-modal";
import { TrustBadges } from "./trust-badges";

type ProductPurchaseProps = {
  product: Product;
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const { addItem, buyNow } = useCart();
  const [color, setColor] = useState<ColorVariant>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const onSale =
    product.compareAtPrice != null &&
    product.compareAtPrice > product.price;
  const checkoutReady = isProductCheckoutReady(product);

  function validateSize(): boolean {
    if (!selectedSize) {
      setSizeError(true);
      return false;
    }
    setSizeError(false);
    return true;
  }

  function buildPayload() {
    if (!selectedSize) throw new Error("Size required");
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colorId: color.id,
      colorName: color.name,
      size: selectedSize,
      price: product.price,
      image: color.image,
    };
  }

  function handleAddToBag() {
    if (!validateSize()) return;
    addItem(buildPayload());
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 2000);
  }

  function handleBuyNow() {
    if (!validateSize()) return;
    buyNow(buildPayload());
  }

  return (
    <>
      {hasDualViews(product) ? (
        <ProductDualGallery views={product.views} alt={product.name} />
      ) : (
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            key={color.id}
            src={color.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 480px"
            priority
          />
        </div>
      )}

      <div className="mt-5 space-y-5">
        <div>
          {product.tags[0] && (
            <p className="mb-1 text-[10px] font-semibold uppercase text-neutral-500">
              {product.tags[0]}
            </p>
          )}
          <h1 className="text-2xl font-semibold">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-neutral-600">{product.tagline}</p>
          <div className="mt-3 flex flex-wrap items-baseline gap-2">
            {onSale && product.compareAtPrice != null && (
              <span className="text-sm text-neutral-400 line-through">
                {formatUSD(product.compareAtPrice)}
              </span>
            )}
            <span
              className={`text-xl font-semibold ${onSale ? "text-red-600" : ""}`}
            >
              {formatUSD(product.price)}
            </span>
            {onSale && (
              <span className="text-[10px] font-medium uppercase text-red-600">
                15% off
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-500">
            Free worldwide shipping · USD · Includes tracking
          </p>
          {!checkoutReady && (
            <p className="mt-2 text-xs text-neutral-600">
              Coming soon — checkout not live for this design yet.
            </p>
          )}
          <p className="mt-2 flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="border border-neutral-200 px-1.5 py-0.5 text-[10px] font-medium uppercase text-neutral-600">
              Secure
            </span>
            Secure checkout · 14-day returns
          </p>
        </div>

        {product.colors.length > 1 && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium uppercase">
                Color — {color.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`h-9 w-9 border-2 transition ${
                    color.id === c.id
                      ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                      : "border-neutral-200"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                  aria-pressed={color.id === c.id}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase">
              Size
            </span>
            <button
              type="button"
              onClick={() => setChartOpen(true)}
              className="text-xs text-neutral-600 underline underline-offset-2"
            >
              Size chart
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSelectedSize(s);
                  setSizeError(false);
                }}
                className={`h-10 border text-sm font-medium transition ${
                  selectedSize === s
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {sizeError && (
            <p className="mt-2 text-xs text-red-600">Select a size to continue</p>
          )}
        </div>

        <TrustBadges compact />

        <p className="text-sm leading-relaxed text-neutral-600">
          {product.description}
        </p>

        <OrderTimeline compact />
      </div>

      {/* Spacer for sticky bar */}
      <div className="h-36" aria-hidden />

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto max-w-lg px-3 pt-2">
          <CheckoutTrust />
        </div>
        <div className="mx-auto flex max-w-lg gap-2 p-3 pt-2">
          <button
            type="button"
            onClick={handleAddToBag}
            className="flex h-12 flex-1 items-center justify-center border-2 border-neutral-900 text-sm font-semibold transition active:scale-[0.98]"
          >
            {addedFeedback ? "Added ✓" : "Add to bag"}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex h-12 flex-[1.15] items-center justify-center bg-brand text-sm font-semibold text-brand-foreground transition active:scale-[0.98]"
          >
            Buy now
          </button>
        </div>
      </div>

      <SizeChartModal
        open={chartOpen}
        onClose={() => setChartOpen(false)}
        rows={product.sizeChart}
        productName={product.name}
      />
    </>
  );
}
