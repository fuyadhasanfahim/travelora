import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { ok, errors } from "@/lib/api/respond";
import { log } from "@/lib/api/logger";
import { check, clientKey } from "@/lib/api/rate-limit";
import { newsletterSchema } from "@/lib/validation/schemas";
import { sendNewsletterWelcome } from "@/lib/email/send";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const limit = check(clientKey(req, "newsletter"), 5, 60_000);
  if (!limit.allowed) return errors.rateLimited();

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return errors.badRequest("Invalid JSON body");
  }
  const parse = newsletterSchema.safeParse(payload);
  if (!parse.success) {
    return errors.badRequest("Validation failed", parse.error.flatten());
  }
  const { email, source } = parse.data;

  try {
    const sub = await prisma.newsletterSubscriber.upsert({
      where: { email: email.toLowerCase() },
      update: { status: "active", source: source ?? undefined, unsubscribedAt: null },
      create: { email: email.toLowerCase(), source: source ?? null, status: "active" },
    });

    void sendNewsletterWelcome({ email: sub.email }).catch((err) =>
      log.error("email.newsletter", "send failed", { error: String(err) }),
    );

    return ok({ subscribed: true }, { status: 201 });
  } catch (e) {
    log.error("api.newsletter", "subscribe failed", { error: String(e) });
    return errors.unavailable();
  }
}
