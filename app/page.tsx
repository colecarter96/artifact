import { OrderTimeline } from "@/components/order-timeline";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ShopHeroModel } from "@/components/shop-hero-model";
import { TrustReassurance } from "@/components/trust-reassurance";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="pt-4">
      {/* <ShopHeroModel /> */}

      <section id="shop" aria-label="All shirts">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-sm font-semibold uppercase">
            Shop all
          </h2>
          <span className="text-xs text-neutral-500">
            {products.length} styles
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8">
          {products.map((product, index) => (
            <ScrollReveal
              key={product.id}
              delay={index * 50}
              rootMargin="0px 0px 25% 0px"
            >
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-8">
        <ScrollReveal>
          <OrderTimeline />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <TrustReassurance />
        </ScrollReveal>
      </section>

      <section className="mt-10 bg-neutral-900 px-5 py-6 text-center text-white">
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
