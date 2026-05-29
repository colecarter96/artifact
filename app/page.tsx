import { OrderTimeline } from "@/components/order-timeline";
import { ProductCard } from "@/components/product-card";
import { TrustBadges } from "@/components/trust-badges";
import { TrustReassurance } from "@/components/trust-reassurance";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="pt-4">
      <section className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Premium cotton tees
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Minimal blanks. Built to last. Shipped free, worldwide.
        </p>
        <div className="mt-5">
          <TrustBadges />
        </div>
      </section>

      <section aria-label="All shirts">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Shop all
          </h2>
          <span className="text-xs text-neutral-500">
            {products.length} styles
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-8">
        <OrderTimeline />
        <TrustReassurance />
      </section>

      <section className="mt-10 bg-neutral-900 px-5 py-6 text-center text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">
          Limited launch offer
        </p>
        <p className="mt-2 text-lg font-semibold">
          Free shipping on every order
        </p>
        <p className="mt-2 text-sm text-neutral-300">
          No minimum. Tracking emailed when we ship. Delivered worldwide in
          7–14 business days.
        </p>
      </section>
    </div>
  );
}
