import { createHash } from "crypto";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

export function hashSha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function hashEmail(email: string): string {
  return hashSha256(normalizeEmail(email));
}

export function hashPhone(phone: string): string {
  const normalized = normalizePhone(phone);
  return normalized ? hashSha256(normalized) : "";
}

export function hashExternalId(id: string): string {
  return hashSha256(id.trim());
}
