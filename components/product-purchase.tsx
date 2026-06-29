"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import {
  isOneSizeProduct,
  isProductCheckoutReady,
  ONE_SIZE,
  type ColorVariant,
  type Product,
  type Size,
} from "@/lib/products";
import { ProductGallery } from "./product-gallery";
import { ProductPrice } from "./product-price";
import { ProductReviews } from "./product-reviews";
import { OrderTimeline } from "./order-timeline";
import { SizeChartModal } from "./size-chart-modal";
import { trackViewContent } from "@/lib/tiktok-pixel";
import { startCheckout } from "@/lib/start-checkout";

type ProductPurchaseProps = {
  product: Product;
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const { addItem } = useCart();
  const [color, setColor] = useState<ColorVariant>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [sizeFlash, setSizeFlash] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [buyNowError, setBuyNowError] = useState<string | null>(null);

  const oneSize = isOneSizeProduct(product);
  const checkoutReady = isProductCheckoutReady(product);

  useEffect(() => {
    void trackViewContent({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }, [product.id, product.name, product.price]);

  useEffect(() => {
    if (!sizeFlash) return;
    const id = window.setTimeout(() => setSizeFlash(false), 2000);
    return () => window.clearTimeout(id);
  }, [sizeFlash]);

  function validateSize(): boolean {
    if (oneSize) return true;
    if (!selectedSize) {
      setSizeFlash(true);
      return false;
    }
    return true;
  }

  function buildPayload() {
    const size = oneSize ? ONE_SIZE : selectedSize;
    if (!size) throw new Error("Size required");
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colorId: color.id,
      colorName: color.name,
      size,
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

  async function handleBuyNow() {
    if (!validateSize()) return;

    setBuyNowLoading(true);
    setBuyNowError(null);

    try {
      const payload = buildPayload();
      await startCheckout(
        [
          {
            productId: payload.productId,
            slug: payload.slug,
            name: payload.name,
            colorName: payload.colorName,
            size: payload.size,
            quantity: 1,
          },
        ],
        [
          {
            productId: payload.productId,
            name: payload.name,
            price: payload.price,
            quantity: 1,
          },
        ],
      );
    } catch (error) {
      setBuyNowError(
        error instanceof Error
          ? error.message
          : "Checkout failed. Please try again.",
      );
      setBuyNowLoading(false);
    }
  }

  return (
    <>
      <ProductGallery
        key={color.id}
        product={product}
        productImage={color.image}
        secondaryImage={color.secondaryImage}
        alt={`${product.name} — ${color.name}`}
      />

      <div className="mt-6 space-y-6">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-base font-bold uppercase tracking-wide">
              {product.name}
            </h1>
            <ProductPrice
              cents={product.price}
              className="shrink-0 text-base font-normal text-neutral-900"
            />
          </div>

          <a
            href="#details"
            className="mt-2 inline-flex items-center gap-1 text-xs text-neutral-600 underline-offset-2 hover:underline"
          >
            View details →
          </a>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={handleAddToBag}
              disabled={!checkoutReady}
              className="flex h-12 w-full items-center justify-center bg-neutral-900 text-xs font-medium uppercase tracking-widest text-white transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {addedFeedback ? "Added ✓" : "Add to cart"}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!checkoutReady || buyNowLoading}
              className="flex h-12 w-full items-center justify-center border border-neutral-900 bg-surface text-xs font-medium uppercase tracking-widest text-neutral-900 transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {buyNowLoading ? "Opening checkout…" : "Buy now"}
            </button>
          </div>

          {buyNowError && (
            <p className="mt-3 text-xs text-red-600">{buyNowError}</p>
          )}

          {!checkoutReady && (
            <p className="mt-3 text-xs text-neutral-600">
              Coming soon — checkout not live for this style yet.
            </p>
          )}

          <p className="mt-4 text-xs text-neutral-500">
            Free shipping · Includes tracking · Secure checkout
          </p>
        </div>

        {product.colors.length > 1 && (
          <section className="border-t border-neutral-300/80 pt-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide">
              <span className="text-neutral-500">More colors</span>
              <span className="font-medium text-neutral-900">{color.name}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {product.colors.map((c) => {
                const selected = color.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`relative aspect-[4/3] w-full overflow-hidden bg-surface transition ${
                      selected
                        ? "border-2 border-neutral-900"
                        : "border-2 border-transparent opacity-75 hover:opacity-100"
                    }`}
                    aria-label={c.name}
                    aria-pressed={selected}
                  >
                    <img
                      src={c.secondaryImage ?? c.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-contain p-3"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {!oneSize && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide">
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
                  onClick={() => setSelectedSize(s)}
                  className={`h-10 border text-sm font-medium transition ${
                    selectedSize === s
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-300 bg-white hover:border-neutral-900"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div id="details" className="space-y-6 border-t border-neutral-300/80 pt-6">
          <p className="text-sm leading-relaxed text-neutral-600">
            {product.description}
          </p>
          <ProductReviews slug={product.slug} />
          <OrderTimeline compact />
        </div>
      </div>

      <div className="h-6" aria-hidden />

      {sizeFlash && (
        <div
          className="pointer-events-none fixed inset-0 z-70 flex items-center justify-center px-6"
          role="status"
          aria-live="polite"
        >
          <p className="bg-neutral-900 px-5 py-3 text-center text-sm font-medium tracking-wide text-white">
            Please select a size
          </p>
        </div>
      )}

      {!oneSize && (
        <SizeChartModal
          open={chartOpen}
          onClose={() => setChartOpen(false)}
          rows={product.sizeChart ?? []}
          productName={product.name}
        />
      )}
    </>
  );
}
