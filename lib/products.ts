export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export type SizeChartRow = {
  size: Size;
  chest: string;
  length: string;
  shoulder: string;
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
  colors: ColorVariant[];
  sizes: Size[];
  featured?: boolean;
  tags: string[];
  sizeChart: SizeChartRow[];
};

const defaultSizeChart: SizeChartRow[] = [
  { size: "XS", chest: '34"', length: '27"', shoulder: '16"' },
  { size: "S", chest: '36"', length: '28"', shoulder: '17"' },
  { size: "M", chest: '40"', length: '29"', shoulder: '18"' },
  { size: "L", chest: '44"', length: '30"', shoulder: '19"' },
  { size: "XL", chest: '48"', length: '31"', shoulder: '20"' },
  { size: "XXL", chest: '52"', length: '32"', shoulder: '21"' },
];

/** $25 list price, 15% off */
export const LIST_PRICE_CENTS = 2500;
export const SALE_PRICE_CENTS = 2125;

function image(path: string): string {
  return `/shirtImages/${path}`;
}

function singleColor(
  imageFile: string,
  name: string,
  hex: string,
): ColorVariant[] {
  return [
    {
      id: "default",
      name,
      hex,
      image: image(imageFile),
      gridImage: image(`zoomed/${imageFile}`),
    },
  ];
}

export const products: Product[] = [
  {
    id: "drywall",
    slug: "drywall",
    name: "Drywall",
    tagline: "Built different",
    description:
      "Midweight 100% cotton with a relaxed unisex fit. Pre-shrunk and built to soften with every wash.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    colors: singleColor("drywall.jpg", "Default", "#d4d4d4"),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    tags: ["bestseller"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "empath",
    slug: "empath",
    name: "Empath",
    tagline: "Feel everything",
    description:
      "Premium cotton jersey with a classic unisex cut. Soft hand, sharp print, made to last.",
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    colors: singleColor("empath.jpg", "Default", "#1a1a1a"),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
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
    colors: singleColor("genitals.jpg", "Default", "#f5f5f5"),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
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
    colors: singleColor("lesbian.jpg", "Default", "#1a1a1a"),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    tags: ["popular"],
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
    colors: singleColor("puh.jpg", "Default", "#e5e5e5"),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
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
    colors: singleColor("switchUp.jpg", "Default", "#1a1a1a"),
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    tags: ["bestseller"],
    sizeChart: defaultSizeChart,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
