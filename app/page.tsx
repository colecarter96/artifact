import { ProductCard } from "@/components/product-card";
import { getProductsByCategory, SUNGLASSES_DESCRIPTION } from "@/lib/products";

export default function HomePage() {
  const sunglasses = getProductsByCategory("sunglasses");

  return (
    <div className="pb-8">
      <header className="border-b border-neutral-300/80 pb-6 pt-2">
        <h1 className="text-lg font-bold uppercase tracking-wide">
          All Sunglasses
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {SUNGLASSES_DESCRIPTION}. Free shipping on every order.
        </p>
      </header>

      <section
        id="shop"
        aria-label="All sunglasses"
        className="mt-8 grid grid-cols-1 gap-y-12"
      >
        {sunglasses.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
