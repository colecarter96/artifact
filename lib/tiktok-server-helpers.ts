import { parseCheckoutMetadata } from "@/lib/checkout-metadata";
import { products, SALE_PRICE_CENTS } from "@/lib/products";
import type { TikTokServerContent } from "@/lib/tiktok-events-api";
import type { TikTokItem } from "@/lib/tiktok-pixel";

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
    const product = products.find((entry) => entry.name === item.name);
    return {
      productId: product?.id ?? item.name,
      name: item.name,
      price: product?.price ?? SALE_PRICE_CENTS,
      quantity: item.quantity,
    };
  });
}

export function getRequestIp(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? undefined;
}
