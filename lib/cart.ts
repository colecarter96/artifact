import { products, type Size } from "./products";

export const CART_STORAGE_KEY = "artifact-cart";

export type CartLine = {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  colorId: string;
  colorName: string;
  size: Size;
  price: number;
  image: string;
  quantity: number;
};

export function cartLineKey(
  productId: string,
  colorId: string,
  size: Size,
): string {
  return `${productId}:${colorId}:${size}`;
}

export function createLineId(
  productId: string,
  colorId: string,
  size: Size,
): string {
  return cartLineKey(productId, colorId, size);
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  return (
    typeof line.lineId === "string" &&
    typeof line.productId === "string" &&
    typeof line.slug === "string" &&
    typeof line.name === "string" &&
    typeof line.size === "string" &&
    typeof line.price === "number" &&
    typeof line.quantity === "number" &&
    line.quantity >= 1
  );
}

/** Drop lines for removed products; refresh name/price/image from catalog. */
export function normalizeCartLines(lines: unknown[]): CartLine[] {
  const productById = new Map(products.map((product) => [product.id, product]));

  return lines.filter(isCartLine).flatMap((line) => {
    const product = productById.get(line.productId);
    if (!product || product.slug !== line.slug) return [];

    const color = product.colors.find((c) => c.id === line.colorId) ?? product.colors[0];

    return [
      {
        ...line,
        lineId: createLineId(line.productId, color.id, line.size),
        name: product.name,
        price: product.price,
        image: color.image,
        colorId: color.id,
        colorName: color.name,
      },
    ];
  });
}

export function readCartFromStorage(): CartLine[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return normalizeCartLines(parsed);
  } catch {
    return [];
  }
}

export function writeCartToStorage(items: CartLine[]): void {
  if (typeof window === "undefined") return;

  if (items.length === 0) {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearCartStorage(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CART_STORAGE_KEY);
}
