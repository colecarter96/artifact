import { parseCheckoutMetadata } from "@/lib/checkout-metadata";
import { products } from "@/lib/products";
import type { TikTokServerContent } from "@/lib/tiktok-events-api";
import type { TikTokItem } from "@/lib/tiktok-pixel";

function findProduct(productId?: string, name?: string) {
  if (productId) {
    const byId = products.find((entry) => entry.id === productId);
    if (byId) return byId;
  }
  if (name) {
    return products.find((entry) => entry.name === name);
  }
  return undefined;
}

export function centsToDollars(cents: number): number {
  return Math.round(cents) / 100;
}

export function tiktokItemsToContents(items: TikTokItem[]): TikTokServerContent[] {
  return items.map((item) => ({
    content_id: item.productId,
    content_type: "product",
    content_name: item.name,
    quantity: item.quantity,
    price: centsToDollars(item.price),
  }));
}

export function cartValue(items: TikTokItem[]): number {
  return centsToDollars(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
}

export function metadataItemsToTikTokItems(
  items: ReturnType<typeof parseCheckoutMetadata>,
): TikTokItem[] {
  return items.map((item) => {
    const product = findProduct(item.productId, item.name);
    return {
      productId: product?.id ?? item.productId ?? item.name,
      name: item.name,
      price: product?.price ?? 0,
      quantity: item.quantity,
    };
  }).filter((item) => item.price > 0);
}

export function getRequestIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}
