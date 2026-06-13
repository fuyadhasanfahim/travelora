import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend | null {
  if (cached) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  cached = new Resend(key);
  return cached;
}

export const FROM = process.env.RESEND_FROM_EMAIL ?? "Travelora <noreply@travelora.app>";
export const REPLY_TO = process.env.RESEND_REPLY_TO ?? "support@travelora.app";
export const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? "admin@travelora.app";
