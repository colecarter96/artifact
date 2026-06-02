export const SIZES = ["S", "M", "L", "XL", "2XL"] as const;
export type Size = (typeof SIZES)[number];

export type SizeChartRow = {
  size: Size;
  length: string;
  shoulder: string;
  chest: string;
  sleeveLength: string;
};

export type ColorVariant = {
  id: string;
  name: string;
  hex: string;
  /** Full image for product page & cart */
  image: string;
  /** Cropped/zoomed image for home grid */
  gridImage: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Price in USD cents */
  price: number;
  compareAtPrice?: number;
  /** Omit until a Stripe Price is created for this design */
  stripePriceId?: string;
  colors: ColorVariant[];
  sizes: Size[];
  featured?: boolean;
  tags: string[];
  sizeChart: SizeChartRow[];
};

const defaultSizeChart: SizeChartRow[] = [
  { size: "S", length: "25.59", shoulder: "17.32", chest: "18.50", sleeveLength: "7.48" },
  { size: "M", length: "26.77", shoulder: "18.50", chest: "19.68", sleeveLength: "7.87" },
  { size: "L", length: "27.95", shoulder: "19.68", chest: "20.87", sleeveLength: "8.27" },
  { size: "XL", length: "29.13", shoulder: "20.87", chest: "22.05", sleeveLength: "8.66" },
  { size: "2XL", length: "30.31", shoulder: "22.05", chest: "23.23", sleeveLength: "9.06" },
];

const allSizes: Size[] = ["S", "M", "L", "XL", "2XL"];

/** $25 list price, 15% off */
export const LIST_PRICE_CENTS = 2500;
export const SALE_PRICE_CENTS = 2125;

function image(path: string): string {
  return `/shirtImages/${path}`;
}

function singleColor(
  mainFile: string,
  gridFile: string,
  name: string,
  hex: string,
): ColorVariant[] {
  return [
    {
      id: "default",
      name,
      hex,
      image: image(mainFile),
      gridImage: image(gridFile),
    },
  ];
}

export const products: Product[] = [
  {
    id: "empath",
    slug: "empath",
    name: "Empath",
    tagline: "Feel everything",
    description:
      "Premium cotton jersey with a classic unisex cut. Soft hand, sharp print, made to last.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TdGXpAKB242hqM6SX6sfJEl",
    colors: singleColor("empath.jpg", "zoomed/empath.jpg", "Default", "#1a1a1a"),
    sizes: allSizes,
    featured: true,
    tags: ["new"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "genitals",
    slug: "genitals",
    name: "Genitals",
    tagline: "Say it loud",
    description:
      "100% cotton tee with garment-washed comfort and a true-to-size unisex fit.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TdGX0AKB242hqM6HKJA359Q",
    colors: singleColor("genitals.jpg", "zoomed/genitals.jpg", "Default", "#f5f5f5"),
    sizes: allSizes,
    tags: ["limited"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "lesbian",
    slug: "lesbian",
    name: "Lesbian",
    tagline: "Wear it proud",
    description:
      "Heavyweight feel, everyday ease. Double-stitched hems and a fit that works on everyone.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TdGWbAKB242hqM6YTaducRH",
    colors: singleColor("lesbian.jpg", "zoomed/lesbian.jpg", "Default", "#1a1a1a"),
    sizes: allSizes,
    featured: true,
    tags: ["popular"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "open-minded",
    slug: "open-minded",
    name: "Open Minded",
    tagline: "Think bigger",
    description:
      "Midweight 100% cotton with a relaxed unisex fit. Pre-shrunk and built to soften with every wash.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    colors: singleColor(
      "openMinded.jpg",
      "zoomed/openMinded.jpg",
      "Default",
      "#1a1a1a",
    ),
    sizes: allSizes,
    featured: true,
    tags: ["new"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "puh",
    slug: "puh",
    name: "Puh",
    tagline: "No explanation needed",
    description:
      "Classic crew neck in premium cotton. Clean lines, bold graphic, ships free worldwide.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TdGW1AKB242hqM680TMEfHj",
    colors: singleColor("puh.jpg", "zoomed/puh.jpg", "Default", "#e5e5e5"),
    sizes: allSizes,
    tags: ["new"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "switch-up",
    slug: "switch-up",
    name: "Switch Up",
    tagline: "Flip the script",
    description:
      "Our signature graphic tee on a soft cotton blank. Breathable, durable, designed for repeat buys.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TdGY7AKB242hqM6PYg7ooBv",
    colors: singleColor(
      "zoomed/switch.jpg",
      "zoomed/switch.jpg",
      "Default",
      "#1a1a1a",
    ),
    sizes: allSizes,
    featured: true,
    tags: ["bestseller"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "day-ones",
    slug: "day-ones",
    name: "Day Ones",
    tagline: "From the jump",
    description:
      "Premium cotton jersey with a classic unisex cut. Soft hand, sharp print, made to last.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    colors: singleColor(
      "dayOnesFront.jpg",
      "dayOnesFront.jpg",
      "Default",
      "#d4d4d4",
    ),
    sizes: allSizes,
    tags: ["new"],
    sizeChart: defaultSizeChart,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function isProductCheckoutReady(product: Product): boolean {
  return Boolean(product.stripePriceId);
}
