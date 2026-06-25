import { OrderTimeline } from "@/components/order-timeline";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TrustReassurance } from "@/components/trust-reassurance";
import { getProductsByCategory } from "@/lib/products";

function ProductGrid({
  items,
  startDelay = 0,
}: {
  items: ReturnType<typeof getProductsByCategory>;
  startDelay?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-5">
      {items.map((product, index) => (
        <ScrollReveal
          key={product.id}
          delay={startDelay + index * 50}
          rootMargin="0px 0px 25% 0px"
        >
          <ProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default function HomePage() {
  const shirts = getProductsByCategory("shirt");
  const sunglasses = getProductsByCategory("sunglasses");

  return (
    <div className="pt-4">
      <section id="sunglasses" aria-label="Sunglasses">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xs font-semibold uppercase">Sunglasses</h2>
          <span className="text-xs text-neutral-500">
            {sunglasses.length} styles
          </span>
        </div>
        <ProductGrid items={sunglasses} />
      </section>

      <section id="shirts" className="mt-10" aria-label="Shirts">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xs font-semibold uppercase">Shirts</h2>
          <span className="text-xs text-neutral-500">
            {shirts.length} styles
          </span>
        </div>
        <ProductGrid items={shirts} startDelay={sunglasses.length * 50} />
      </section>

      <section className="mt-10 space-y-8">
        <ScrollReveal>
          <OrderTimeline />
        </ScrollReveal>
        {/* <ScrollReveal delay={120}>
          <TrustReassurance />
        </ScrollReveal> */}
      </section>

      <section className="-mx-3 mt-10 bg-neutral-900 px-3 py-6 text-center text-white">
        <p className="text-xs font-medium uppercase text-neutral-400">
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
