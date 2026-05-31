import { TrustBadges } from "@/components/trust-badges";

export function ShopHeroClassic() {
  return (
    <section className="mb-8 text-center">
      <h1 className="text-2xl font-semibold sm:text-3xl">
        Premium cotton tees
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        Minimal blanks. Built to last. Shipped free, worldwide.
      </p>
      <div className="mt-5">
        <TrustBadges />
      </div>
    </section>
  );
}
