import { NextResponse } from "next/server";
import { parseCheckoutMetadata } from "@/lib/checkout-metadata";
import { getRedis } from "@/lib/redis";
import {
  cartValue,
  getRequestIp,
  metadataItemsToTikTokItems,
  tiktokItemsToContents,
} from "@/lib/tiktok-server-helpers";
import {
  purchaseEventId,
  sendTikTokServerEvents,
} from "@/lib/tiktok-events-api";
import { getStripe } from "@/lib/stripe";

const TIKTOK_DEDUPE_TTL_SECONDS = 60 * 60 * 24 * 30;
const TIKTOK_SENT_METADATA_KEY = "tiktok_sent";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");
  const ttp = url.searchParams.get("ttp") ?? undefined;
  const ttclid = url.searchParams.get("ttclid") ?? undefined;

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing checkout session." },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed." },
        { status: 400 },
      );
    }

    const items = parseCheckoutMetadata(session.metadata ?? undefined);
    const value =
      session.amount_total != null ? session.amount_total / 100 : undefined;
    const currency = session.currency?.toUpperCase() ?? "USD";
    const email = session.customer_details?.email ?? null;
    const tiktokEventId = purchaseEventId(sessionId);
    const origin = url.origin;
    const tiktokItems = metadataItemsToTikTokItems(items);

    const redis = getRedis();
    const dedupeKey = `tiktok:purchase:${sessionId}`;
    let shouldSendTikTok = session.metadata?.[TIKTOK_SENT_METADATA_KEY] !== "1";

    if (redis) {
      const existing = await redis.get<string>(dedupeKey);
      if (existing) shouldSendTikTok = false;
    }

    if (shouldSendTikTok && tiktokItems.length > 0) {
      const resolvedValue = value ?? cartValue(tiktokItems);
      const user = {
        email: email ?? undefined,
        externalId: email ?? undefined,
        ttp,
        ttclid,
        ip: getRequestIp(request),
        userAgent: request.headers.get("user-agent") ?? undefined,
      };

      await sendTikTokServerEvents([
        {
          event: "PlaceAnOrder",
          eventId: tiktokEventId.replace(/^purchase_/, "place_order_"),
          url: `${origin}/checkout/success?session_id=${encodeURIComponent(sessionId)}`,
          value: resolvedValue,
          currency,
          contents: tiktokItemsToContents(tiktokItems),
          user,
        },
        {
          event: "Purchase",
          eventId: tiktokEventId,
          url: `${origin}/checkout/success?session_id=${encodeURIComponent(sessionId)}`,
          value: resolvedValue,
          currency,
          contents: tiktokItemsToContents(tiktokItems),
          user,
        },
      ]);

      await stripe.checkout.sessions.update(sessionId, {
        metadata: {
          ...session.metadata,
          [TIKTOK_SENT_METADATA_KEY]: "1",
        },
      });

      if (redis) {
        await redis.set(dedupeKey, "1", { ex: TIKTOK_DEDUPE_TTL_SECONDS });
      }
    }

    return NextResponse.json({
      email,
      items,
      value,
      currency,
      tiktokEventId,
    });
  } catch (error) {
    console.error("Stripe session lookup error:", error);
    return NextResponse.json(
      { error: "Could not load order details." },
      { status: 500 },
    );
  }
}
