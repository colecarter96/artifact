import { getRedis } from "@/lib/redis";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

const SUBSCRIBER_SET_KEY = "artifact:subscriber-emails";
const SUBSCRIBER_LOG_KEY = "artifact:subscriber-log";

type SaveResult = { ok: true } | { ok: false; error: string };

export async function saveSubscriber(email: string): Promise<SaveResult> {
  const normalized = email.trim().toLowerCase();

  if (!isValidEmail(normalized)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const redis = getRedis();
  if (!redis) {
    console.error("Upstash Redis is not configured.");
    return { ok: false, error: "Email signup is not configured yet." };
  }

  try {
    const signedUpAt = new Date().toISOString();

    await redis.sadd(SUBSCRIBER_SET_KEY, normalized);
    await redis.lpush(SUBSCRIBER_LOG_KEY, {
      email: normalized,
      signedUpAt,
    });

    return { ok: true };
  } catch (error) {
    console.error("Upstash subscriber save error:", error);
    return {
      ok: false,
      error: "Could not save your email. Please try again.",
    };
  }
}
