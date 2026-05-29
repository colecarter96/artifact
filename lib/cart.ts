import type { Size } from "./products";

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
