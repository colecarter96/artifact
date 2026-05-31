type CheckoutMetadataItem = {
  name: string;
  size: string;
  quantity: number;
};

export function buildCheckoutMetadata(
  items: CheckoutMetadataItem[],
): Record<string, string> {
  const metadata: Record<string, string> = {
    item_count: String(items.length),
    order_summary: items
      .map(
        (item) =>
          `${item.name} — Size ${item.size}${item.quantity > 1 ? ` (×${item.quantity})` : ""}`,
      )
      .join(" | ")
      .slice(0, 500),
  };

  items.forEach((item, index) => {
    const line = index + 1;
    metadata[`item_${line}_name`] = item.name.slice(0, 500);
    metadata[`item_${line}_size`] = item.size;
    metadata[`item_${line}_qty`] = String(item.quantity);
  });

  return metadata;
}

export function parseCheckoutMetadata(
  metadata: Record<string, string> | null | undefined,
): { name: string; size: string; quantity: number }[] {
  if (!metadata) return [];

  const count = Number.parseInt(metadata.item_count ?? "0", 10);
  const items: { name: string; size: string; quantity: number }[] = [];

  for (let line = 1; line <= count; line += 1) {
    const name = metadata[`item_${line}_name`];
    const size = metadata[`item_${line}_size`];
    if (!name || !size) continue;

    items.push({
      name,
      size,
      quantity: Number.parseInt(metadata[`item_${line}_qty`] ?? "1", 10) || 1,
    });
  }

  return items;
}
