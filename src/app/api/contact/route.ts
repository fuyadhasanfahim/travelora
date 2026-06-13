import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { ok, errors } from "@/lib/api/respond";
import { log } from "@/lib/api/logger";
import { check, clientKey } from "@/lib/api/rate-limit";
import { contactSchema } from "@/lib/validation/schemas";
import { sendContactEmails } from "@/lib/email/send";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const limit = check(clientKey(req, "contact"), 5, 60_000);
  if (!limit.allowed) return errors.rateLimited();

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return errors.badRequest("Invalid JSON body");
  }
  const parse = contactSchema.safeParse(payload);
  if (!parse.success) {
    return errors.badRequest("Validation failed", parse.error.flatten());
  }
  const data = parse.data;

  try {
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });

    void sendContactEmails({ contact }).catch((err) =>
      log.error("email.contact", "send failed", { error: String(err) }),
    );

    return ok({ id: contact.id }, { status: 201 });
  } catch (e) {
    log.error("api.contact", "create failed", { error: String(e) });
    return errors.unavailable();
  }
}
