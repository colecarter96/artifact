import { NextResponse } from "next/server";
import {
  cartValue,
  centsToDollars,
  getRequestIp,
  tiktokItemsToContents,
} from "@/lib/tiktok-server-helpers";
import { sendTikTokServerEvent } from "@/lib/tiktok-events-api";
import type { TikTokItem } from "@/lib/tiktok-pixel";

type TikTokEventRequest = {
  event?: string;
  eventId?: string;
  url?: string;
  items?: TikTokItem[];
  value?: number;
  currency?: string;
  email?: string;
  phone?: string;
  externalId?: string;
  ttp?: string;
  ttclid?: string;
};

const ALLOWED_EVENTS = new Set([
  "ViewContent",
  "AddToCart",
  "AddPaymentInfo",
  "InitiateCheckout",
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TikTokEventRequest;

    if (!body.event || !ALLOWED_EVENTS.has(body.event)) {
      return NextResponse.json({ error: "Unsupported event." }, { status: 400 });
    }

    if (!body.eventId || typeof body.eventId !== "string") {
      return NextResponse.json({ error: "Missing event id." }, { status: 400 });
    }

    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json({ error: "Missing page url." }, { status: 400 });
    }

    const items = Array.isArray(body.items) ? body.items : [];
    const value =
      body.value ??
      (items.length > 0
        ? cartValue(items)
        : items[0]
          ? centsToDollars(items[0].price * items[0].quantity)
          : undefined);

    const result = await sendTikTokServerEvent({
      event: body.event,
      eventId: body.eventId,
      url: body.url,
      value,
      currency: body.currency ?? "USD",
      contents: items.length > 0 ? tiktokItemsToContents(items) : undefined,
      user: {
        email: body.email,
        phone: body.phone,
        externalId: body.externalId ?? body.email,
        ttp: body.ttp,
        ttclid: body.ttclid,
        ip: getRequestIp(request),
        userAgent: request.headers.get("user-agent") ?? undefined,
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error ?? "TikTok event failed." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("TikTok event route error:", error);
    return NextResponse.json(
      { error: "Could not send TikTok event." },
      { status: 500 },
    );
  }
}
