import { getModelPhotoUrl } from "@/lib/model-photos";
import { getProductBySlug } from "@/lib/products";

export type HeroSlide = {
  slug: string;
  name: string;
  image: string;
};

/** Carousel order on the home hero */
const HERO_SLUG_ORDER = [
  "empath",
  "open-minded",
  "lesbian",
  "genitals",
  "puh",
  "day-ones",
] as const;

export const heroSlides: HeroSlide[] = HERO_SLUG_ORDER.flatMap((slug) => {
  const image = getModelPhotoUrl(slug);
  if (!image) return [];

  const product = getProductBySlug(slug);
  return [{ slug, name: product?.name ?? slug, image }];
});
