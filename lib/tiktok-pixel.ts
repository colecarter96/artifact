export const TIKTOK_PIXEL_ID =
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "D8H6U7BC77UDLID684IG";

type TikTokContent = {
  content_id: string;
  content_type: "product";
  content_name: string;
  quantity?: number;
  price?: number;
};

export type TikTokItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type IdentifyParams = {
  email?: string;
  phone?: string;
  externalId?: string;
};

type TrackOptions = {
  value?: number;
  currency?: string;
  includeQuantity?: boolean;
  identify?: IdentifyParams;
  eventId?: string;
  server?: boolean;
};

declare global {
  interface Window {
    ttq?: {
      track: (
        event: string,
        data?: Record<string, unknown>,
        options?: Record<string, unknown>,
      ) => void;
      identify: (data: Record<string, string>) => void;
      page: () => void;
    };
  }
}

function centsToDollars(cents: number): number {
  return Math.round(cents) / 100;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function createEventId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function getTtclid(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get("ttclid") ?? undefined;
}

async function identifyTikTokUser(params: IdentifyParams) {
  if (typeof window === "undefined" || !window.ttq) return;

  const payload: Record<string, string> = {};

  if (params.email) {
    payload.email = await sha256(normalizeEmail(params.email));
  }

  if (params.phone) {
    const normalizedPhone = params.phone.replace(/[^\d+]/g, "");
    if (normalizedPhone) {
      payload.phone_number = await sha256(normalizedPhone);
    }
  }

  if (params.externalId) {
    payload.external_id = await sha256(params.externalId.trim());
  }

  if (Object.keys(payload).length === 0) return;
  window.ttq.identify(payload);
}

function toContents(items: TikTokItem[], includeQuantity = true): TikTokContent[] {
  return items.map((item) => ({
    content_id: item.productId,
    content_type: "product",
    content_name: item.name,
    ...(includeQuantity
      ? {
          quantity: item.quantity,
          price: centsToDollars(item.price),
        }
      : {}),
  }));
}

function cartValue(items: TikTokItem[]): number {
  return centsToDollars(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
}

function trackBrowser(
  event: string,
  data: Record<string, unknown>,
  eventId: string,
) {
  if (typeof window === "undefined" || !window.ttq) return;
  window.ttq.track(event, data, { event_id: eventId });
}

async function sendServerEvent(
  event: string,
  eventId: string,
  items: TikTokItem[],
  options?: TrackOptions,
) {
  const email = options?.identify?.email;

  try {
    await fetch("/api/tiktok/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        eventId,
        url: window.location.href,
        items,
        value: options?.value,
        currency: options?.currency ?? "USD",
        email,
        phone: options?.identify?.phone,
        externalId: options?.identify?.externalId ?? email,
        ttp: getCookie("_ttp"),
        ttclid: getTtclid(),
      }),
    });
  } catch (error) {
    console.error("TikTok server event proxy failed:", error);
  }
}

async function identifyIfAvailable(identify?: IdentifyParams) {
  if (!identify?.email && !identify?.phone && !identify?.externalId) return;

  await identifyTikTokUser({
    email: identify.email,
    phone: identify.phone,
    externalId: identify.externalId ?? identify.email,
  });
}

async function trackEcommerce(
  event: string,
  items: TikTokItem[],
  options?: TrackOptions,
) {
  if (items.length === 0) return;

  const eventId = options?.eventId ?? createEventId(event.toLowerCase());
  const value = options?.value ?? cartValue(items);
  const currency = options?.currency ?? "USD";
  const payload = {
    contents: toContents(items, options?.includeQuantity ?? true),
    value,
    currency,
  };

  await identifyIfAvailable(options?.identify);
  trackBrowser(event, payload, eventId);

  if (options?.server !== false) {
    void sendServerEvent(event, eventId, items, { ...options, value, currency });
  }
}

export async function trackViewContent(item: TikTokItem) {
  await trackEcommerce("ViewContent", [item], {
    value: centsToDollars(item.price),
    includeQuantity: false,
  });
}

export async function trackAddToCart(item: TikTokItem) {
  await trackEcommerce("AddToCart", [item], {
    value: centsToDollars(item.price * item.quantity),
  });
}

export async function trackInitiateCheckout(items: TikTokItem[]) {
  await trackEcommerce("InitiateCheckout", items);
}

export async function trackAddPaymentInfo(items: TikTokItem[]) {
  await trackEcommerce("AddPaymentInfo", items);
}

export async function trackCheckoutStart(items: TikTokItem[]) {
  const baseId = createEventId("checkout");
  await trackEcommerce("InitiateCheckout", items, { eventId: `${baseId}_initiate` });
  await trackEcommerce("AddPaymentInfo", items, {
    eventId: `${baseId}_payment`,
  });
}

export async function trackOrderComplete(
  items: TikTokItem[],
  value: number,
  currency = "USD",
  identify?: IdentifyParams,
  purchaseEventIdFromServer?: string,
) {
  const purchaseId = purchaseEventIdFromServer ?? createEventId("purchase");
  const orderId = purchaseEventIdFromServer
    ? purchaseEventIdFromServer.replace(/^purchase_/, "place_order_")
    : createEventId("place_order");

  await trackEcommerce("PlaceAnOrder", items, {
    value,
    currency,
    identify,
    eventId: orderId,
    server: false,
  });
  await trackEcommerce("Purchase", items, {
    value,
    currency,
    identify,
    eventId: purchaseId,
    server: false,
  });
}
