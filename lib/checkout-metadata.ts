type CheckoutMetadataItem = {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
};

function formatLineSummary(item: CheckoutMetadataItem): string {
  const parts = [item.name];
  if (item.color && item.color !== "Default") {
    parts.push(item.color);
  }
  if (item.size !== "OS") {
    parts.push(`Size ${item.size}`);
  }
  const summary = parts.join(" — ");
  return item.quantity > 1 ? `${summary} (×${item.quantity})` : summary;
}

export function buildCheckoutMetadata(
  items: CheckoutMetadataItem[],
): Record<string, string> {
  const metadata: Record<string, string> = {
    item_count: String(items.length),
    order_summary: items.map(formatLineSummary).join(" | ").slice(0, 500),
  };

  items.forEach((item, index) => {
    const line = index + 1;
    metadata[`item_${line}_id`] = item.productId.slice(0, 500);
    metadata[`item_${line}_name`] = item.name.slice(0, 500);
    metadata[`item_${line}_color`] = item.color.slice(0, 500);
    metadata[`item_${line}_size`] = item.size;
    metadata[`item_${line}_qty`] = String(item.quantity);
  });

  return metadata;
}

export function parseCheckoutMetadata(
  metadata: Record<string, string> | null | undefined,
): {
  productId?: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
}[] {
  if (!metadata) return [];

  const count = Number.parseInt(metadata.item_count ?? "0", 10);
  const items: {
    productId?: string;
    name: string;
    color: string;
    size: string;
    quantity: number;
  }[] = [];

  for (let line = 1; line <= count; line += 1) {
    const name = metadata[`item_${line}_name`];
    const size = metadata[`item_${line}_size`];
    if (!name || !size) continue;

    items.push({
      productId: metadata[`item_${line}_id`],
      name,
      color: metadata[`item_${line}_color`] ?? "Default",
      size,
      quantity: Number.parseInt(metadata[`item_${line}_qty`] ?? "1", 10) || 1,
    });
  }

  return items;
}
