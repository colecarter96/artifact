import {
  hashEmail,
  hashExternalId,
  hashPhone,
} from "@/lib/tiktok-hash";
import { TIKTOK_PIXEL_ID } from "@/lib/tiktok-pixel";

const TIKTOK_EVENTS_ENDPOINT =
  "https://business-api.tiktok.com/open_api/v1.3/event/track/";

export type TikTokServerContent = {
  content_id: string;
  content_type: "product";
  content_name: string;
  quantity?: number;
  price?: number;
};

export type TikTokServerUser = {
  email?: string;
  phone?: string;
  externalId?: string;
  ttp?: string;
  ttclid?: string;
  ip?: string;
  userAgent?: string;
};

export type TikTokServerEventInput = {
  event: string;
  eventId: string;
  url: string;
  value?: number;
  currency?: string;
  contents?: TikTokServerContent[];
  user?: TikTokServerUser;
  eventTime?: number;
};

type TikTokApiResponse = {
  code?: number;
  message?: string;
  data?: unknown;
};

function buildUser(user?: TikTokServerUser) {
  if (!user) return undefined;

  const payload: Record<string, string> = {};

  if (user.email) payload.email = hashEmail(user.email);
  if (user.phone) {
    const hashedPhone = hashPhone(user.phone);
    if (hashedPhone) payload.phone_number = hashedPhone;
  }
  if (user.externalId) payload.external_id = hashExternalId(user.externalId);
  if (user.ttp) payload.ttp = user.ttp;
  if (user.ttclid) payload.ttclid = user.ttclid;
  if (user.ip) payload.ip = user.ip;
  if (user.userAgent) payload.user_agent = user.userAgent;

  return Object.keys(payload).length > 0 ? payload : undefined;
}

export function purchaseEventId(sessionId: string): string {
  return `purchase_${sessionId}`;
}

export async function sendTikTokServerEvent(
  input: TikTokServerEventInput,
): Promise<{ ok: boolean; error?: string }> {
  const accessToken = process.env.EVENTS_API_ACCESS_TOKEN;
  if (!accessToken || !TIKTOK_PIXEL_ID) {
    console.error("TikTok Events API is not configured.");
    return { ok: false, error: "TikTok Events API is not configured." };
  }

  const properties: Record<string, unknown> = {
    currency: input.currency ?? "USD",
    content_type: "product",
  };

  if (input.value != null) properties.value = input.value;
  if (input.contents?.length) properties.contents = input.contents;

  const user = buildUser(input.user);

  const body: Record<string, unknown> = {
    event_source: "web",
    event_source_id: TIKTOK_PIXEL_ID,
    data: [
      {
        event: input.event,
        event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        page: { url: input.url },
        ...(user ? { user } : {}),
        properties,
      },
    ],
  };

  const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE;
  if (testEventCode) {
    body.test_event_code = testEventCode;
  }

  try {
    const response = await fetch(TIKTOK_EVENTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = (await response.json()) as TikTokApiResponse;

    if (!response.ok || result.code !== 0) {
      console.error("TikTok Events API error:", result.message ?? response.status);
      return {
        ok: false,
        error: result.message ?? "TikTok Events API request failed.",
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("TikTok Events API request failed:", error);
    return { ok: false, error: "TikTok Events API request failed." };
  }
}

export async function sendTikTokServerEvents(
  events: TikTokServerEventInput[],
): Promise<{ ok: boolean; error?: string }> {
  for (const event of events) {
    const result = await sendTikTokServerEvent(event);
    if (!result.ok) return result;
  }
  return { ok: true };
}
