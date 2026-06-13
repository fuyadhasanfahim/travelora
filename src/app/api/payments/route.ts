import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { ok, errors } from "@/lib/api/respond";
import { log } from "@/lib/api/logger";
import { check, clientKey } from "@/lib/api/rate-limit";
import { paymentSchema } from "@/lib/validation/schemas";
import { ref } from "@/lib/reference";
import { sendPaymentEmails } from "@/lib/email/send";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const limit = check(clientKey(req, "payments"), 10, 60_000);
  if (!limit.allowed) return errors.rateLimited();

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return errors.badRequest("Invalid JSON body");
  }
  const parse = paymentSchema.safeParse(payload);
  if (!parse.success) {
    return errors.badRequest("Validation failed", parse.error.flatten());
  }
  const { bookingReference, method } = parse.data;

  try {
    const booking = await prisma.booking.findUnique({
      where: { reference: bookingReference },
      include: { tour: true },
    });
    if (!booking) return errors.notFound("Booking not found");

    // Demo: bank/cash → pending; paypal/stripe placeholder → paid (mock).
    const status = method === "stripe" || method === "paypal" ? "paid" : "pending";

    const payment = await prisma.$transaction(async (tx) => {
      const p = await tx.payment.create({
        data: {
          reference: ref.payment(),
          bookingId: booking.id,
          amount: booking.total,
          method,
          status,
        },
      });
      if (status === "paid") {
        await tx.booking.update({
          where: { id: booking.id },
          data: { status: "confirmed" },
        });
      }
      return p;
    });

    void sendPaymentEmails({ booking, payment, tour: booking.tour }).catch((err) =>
      log.error("email.payment", "send failed", { error: String(err) }),
    );

    return ok({ payment }, { status: 201 });
  } catch (e) {
    log.error("api.payments", "create failed", { error: String(e) });
    return errors.unavailable();
  }
}
