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

export type DualViews = {
  front: { full: string; grid: string };
  back: { full: string; grid: string };
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
  /** Front/back graphics — grid auto-flips, product page swipe gallery */
  views?: DualViews;
  colors: ColorVariant[];
  sizes: Size[];
  featured?: boolean;
  tags: string[];
  sizeChart: SizeChartRow[];
};

export function hasDualViews(
  product: Product,
): product is Product & { views: DualViews } {
  return product.views != null;
}

const defaultSizeChart: SizeChartRow[] = [
  { size: "S", length: "25.59", shoulder: "17.32", chest: "18.50", sleeveLength: "7.48" },
  { size: "M", length: "26.77", shoulder: "18.50", chest: "19.68", sleeveLength: "7.87" },
  { size: "L", length: "27.95", shoulder: "19.68", chest: "20.87", sleeveLength: "8.27" },
  { size: "XL", length: "29.13", shoulder: "20.87", chest: "22.05", sleeveLength: "8.66" },
  { size: "2XL", length: "30.31", shoulder: "22.05", chest: "23.23", sleeveLength: "9.06" },
];

const allSizes: Size[] = ["S", "M", "L", "XL", "2XL"];

/** $25 list price, 15% off */
export const LIST_PRICE_CENTS = 4250;
export const SALE_PRICE_CENTS = 2125;

export const PRODUCT_DESCRIPTION =
  "100% cotton shirts for people with something wrong with them. In a good way.";

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
    name: "I'm an Empath",
    tagline: "",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TeIfYAKB242hqM6AMTlv75a",
    colors: singleColor("empath.jpg", "zoomed/empath.jpg", "Default", "#1a1a1a"),
    sizes: allSizes,
    featured: true,
    tags: ["new"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "open-minded",
    slug: "open-minded",
    name: "How Open Minded Are You?",
    tagline: "",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TeIfzAKB242hqM6bi1ONkRk",
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
    id: "lesbian",
    slug: "lesbian",
    name: "Nobody Knows I'm a Lesbian",
    tagline: "",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TeIglAKB242hqM6ZKDvSiWu",
    colors: singleColor("lesbian.jpg", "zoomed/lesbian.jpg", "Default", "#1a1a1a"),
    sizes: allSizes,
    featured: true,
    tags: ["popular"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "genitals",
    slug: "genitals",
    name: "I Have Normal Looking Gentials",
    tagline: "",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TeIgOAKB242hqM6nHGVwoTu",
    colors: singleColor("genitals.jpg", "zoomed/genitals.jpg", "Default", "#f5f5f5"),
    sizes: allSizes,
    tags: ["limited"],
    sizeChart: defaultSizeChart,
  },
  
  
  {
    id: "puh",
    slug: "puh",
    name: "Eat Mor Puh",
    tagline: "No explanation needed",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TeIecAKB242hqM6RixF21Nf",
    colors: singleColor("puh.jpg", "zoomed/puh.jpg", "Default", "#e5e5e5"),
    sizes: allSizes,
    tags: ["new"],
    sizeChart: defaultSizeChart,
  },
  {
    id: "day-ones",
    slug: "day-ones",
    name: "Switch Up on my Day Ones",
    tagline: "From the jump",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SALE_PRICE_CENTS,
    stripePriceId: "price_1TeIfAAKB242hqM6uZXeK1oZ",
    views: {
      front: {
        full: image("dayOnesFront.jpg"),
        grid: image("zoomed/switch.jpg"),
      },
      back: {
        full: image("dayOnesBack.jpg"),
        grid: image("zoomed/switchBack.jpg"),
      },
    },
    colors: singleColor(
      "dayOnesFront.jpg",
      "zoomed/switch.jpg",
      "Default",
      "#d4d4d4",
    ),
    sizes: allSizes,
    featured: true,
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
