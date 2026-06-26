export const SIZES = ["S", "M", "L", "XL", "2XL"] as const;
export const ONE_SIZE = "OS" as const;
export type Size = (typeof SIZES)[number] | typeof ONE_SIZE;

export type ProductCategory = "shirt" | "sunglasses";

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
  /** Primary image — model/lifestyle shot for sunglasses */
  image: string;
  /** Cropped/zoomed image for home grid */
  gridImage: string;
  /** Second carousel slide (e.g. flat product shot) */
  secondaryImage?: string;
};

export type DualViews = {
  front: { full: string; grid: string };
  back: { full: string; grid: string };
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category?: ProductCategory;
  tagline: string;
  description: string;
  /** Price in USD cents */
  price: number;
  compareAtPrice?: number;
  /** Omit until a Stripe Price is created for this design */
  stripePriceId?: string;
  /** Front/back graphics — grid auto-flips, product page swipe gallery */
  views?: DualViews;
  /** Second product photo in the swipe gallery (e.g. flat lay after lifestyle shot) */
  secondaryImage?: string;
  /** Extra gallery slides after the primary product image */
  galleryImages?: string[];
  colors: ColorVariant[];
  sizes: Size[];
  featured?: boolean;
  tags: string[];
  sizeChart?: SizeChartRow[];
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
/** World Cup + It's Called Soccer shirts */
export const SOCCER_SHIRT_PRICE_CENTS = 1950;

export const PRODUCT_DESCRIPTION =
  "100% cotton shirts for people with something wrong with them. In a good way.";

export const SUNGLASSES_DESCRIPTION =
  "UV400 acetate sunglasses for the summer";

function image(path: string): string {
  return `/shirtImages/${path}`;
}

function sunglassesColor(
  folder: string,
  id: string,
  name: string,
  hex: string,
  modelFile: string,
  productFile: string,
): ColorVariant {
  const base = `/sunglasses/${folder}`;
  return {
    id,
    name,
    hex,
    image: `${base}/${modelFile}`,
    gridImage: `${base}/${modelFile}`,
    secondaryImage: `${base}/${productFile}`,
  };
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
    id: "usflag",
    slug: "usflag",
    name: "US World Cup",
    tagline: "",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SOCCER_SHIRT_PRICE_CENTS,
    stripePriceId: "price_1TjrJ5AKB242hqM6VrhUU9TG",
    colors: singleColor("usaflagBro.jpeg", "usaflagBro.jpeg", "Default", "#1a1a1a"),
    secondaryImage: image("usaflag.png"),
    sizes: allSizes,
    featured: true,
    tags: [],
    sizeChart: defaultSizeChart,
  },
  {
    id: "itscalledsoccerb",
    slug: "soccerb",
    name: "It's Called Soccer",
    tagline: "",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SOCCER_SHIRT_PRICE_CENTS,
    stripePriceId: "price_1TjrIiAKB242hqM6y0NX2LWG",
    colors: singleColor("icsbBro.jpeg", "icsbBro.jpeg", "Default", "#1a1a1a"),
    secondaryImage: image("icsb.png"),
    sizes: allSizes,
    featured: true,
    tags: [],
    sizeChart: defaultSizeChart,
  },
  {
    id: "itscalledsoccer",
    slug: "soccerrwb",
    name: "It's Called Soccer RWB",
    tagline: "",
    description: PRODUCT_DESCRIPTION,
    compareAtPrice: LIST_PRICE_CENTS,
    price: SOCCER_SHIRT_PRICE_CENTS,
    stripePriceId: "price_1TjrIJAKB242hqM6nKixE9De",
    colors: singleColor("icsrwbGirl2.jpeg", "icsrwbGirl2.jpeg", "Default", "#1a1a1a"),
    secondaryImage: image("icsrwb.png"),
    sizes: allSizes,
    featured: true,
    tags: [],
    sizeChart: defaultSizeChart,
  },
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
    tags: [],
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
    tags: [],
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
    tags: [],
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
    colors: singleColor("genitals2.jpg", "zoomed/genitals.jpg", "Default", "#f5f5f5"),
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
    tags: [],
    sizeChart: defaultSizeChart,
  },
  // {
  //   id: "day-ones",
  //   slug: "day-ones",
  //   name: "Switch Up on my Day Ones",
  //   tagline: "From the jump",
  //   description: PRODUCT_DESCRIPTION,
  //   compareAtPrice: LIST_PRICE_CENTS,
  //   price: SALE_PRICE_CENTS,
  //   stripePriceId: "price_1TeIfAAKB242hqM6uZXeK1oZ",
  //   views: {
  //     front: {
  //       full: image("dayOnesFront.jpg"),
  //       grid: image("zoomed/switch.jpg"),
  //     },
  //     back: {
  //       full: image("dayOnesBack.jpg"),
  //       grid: image("zoomed/switchBack.jpg"),
  //     },
  //   },
  //   colors: singleColor(
  //     "dayOnesFront.jpg",
  //     "zoomed/switch.jpg",
  //     "Default",
  //     "#d4d4d4",
  //   ),
  //   sizes: allSizes,
  //   featured: true,
  //   tags: [],
  //   sizeChart: defaultSizeChart,
  // },
  {
    id: "cat",
    slug: "cat",
    name: "Lynx",
    category: "sunglasses",
    tagline: "UV400",
    description: SUNGLASSES_DESCRIPTION,
    compareAtPrice: 4500,
    price: 1200,
    stripePriceId: "price_1Tmd53AKB242hqM66aeImAY6",
    colors: [
      sunglassesColor("cat", "black-brown", "Black / Brown", "#3d2914", "catBlackBrownModel.png", "catBlackBrown.avif"),
      sunglassesColor("cat", "brown", "Brown", "#6b4423", "catBrownModel.png", "catBrown.avif"),
      sunglassesColor("cat", "black", "Black", "#1a1a1a", "catBlackModel.png", "catBlack.avif"),
      
    ],
    sizes: [],
    featured: true,
    tags: ["new"],
  },
  {
    id: "chimi",
    slug: "chimi",
    name: "Seafarer",
    category: "sunglasses",
    tagline: "UV400",
    description: SUNGLASSES_DESCRIPTION,
    compareAtPrice: 4500,
    price: 900,
    stripePriceId: "price_1Tmd23AKB242hqM6LAm8OBkR",
    colors: [
      sunglassesColor("Chimi", "yellow", "Yellow", "#d4a017", "ChimiYellowModel.png", "ChimiYellow.png"),
      sunglassesColor("Chimi", "black", "Black", "#1a1a1a", "ChimiBlackModel.png", "ChimiBlack.avif"),
      sunglassesColor("Chimi", "tort", "Tortoise", "#8b5a2b", "ChimiTortModel.png", "ChimiTort.avif"),
      
    ],
    sizes: [],
    featured: true,
    tags: ["new"],
  },
  {
    id: "jmm",
    slug: "jmm",
    name: "Oliver",
    category: "sunglasses",
    tagline: "UV400",
    description: SUNGLASSES_DESCRIPTION,
    compareAtPrice: 4500,
    price: 950,
    stripePriceId: "price_1Tmd4NAKB242hqM6s0vosdhM",
    colors: [
      sunglassesColor("JMM", "beige", "Beige", "#d4c4a8", "JMMBeigeModel.png", "JMMBeige.avif"),
      sunglassesColor("JMM", "black", "Black", "#1a1a1a", "JMMBlackModel.png", "JMMBlack.avif"),
      sunglassesColor("JMM", "tort", "Tortoise", "#8b5a2b", "JMMTortModel.png", "JMMTort.avif"),
    ],
    sizes: [],
    featured: true,
    tags: ["new"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductCategory(product: Product): ProductCategory {
  return product.category ?? "shirt";
}

export function isOneSizeProduct(product: Product): boolean {
  return getProductCategory(product) === "sunglasses";
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => getProductCategory(p) === category);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug).filter(Boolean);
}

export function isProductCheckoutReady(product: Product): boolean {
  return Boolean(product.stripePriceId);
}

/** Vertical crop anchor for shirt images (% from top). Lower = more top visible. */
const PRODUCT_IMAGE_OBJECT_POSITION_Y: Partial<Record<string, number>> = {
  soccerrwb: 0,
  soccerb: 0,
  usflag: 0,
};

export function getProductImageProps(slug: string): {
  className: string;
  style?: { objectPosition: string };
} {
  const y = PRODUCT_IMAGE_OBJECT_POSITION_Y[slug];
  if (y !== undefined) {
    return {
      className: "object-cover",
      style: { objectPosition: `center ${y}%` },
    };
  }
  return { className: "object-cover object-center" };
}
