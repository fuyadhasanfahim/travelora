import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { ok, errors } from "@/lib/api/respond";
import { log } from "@/lib/api/logger";
import { check, clientKey } from "@/lib/api/rate-limit";
import { bookingSchema } from "@/lib/validation/schemas";
import { ref } from "@/lib/reference";
import { sendBookingEmails } from "@/lib/email/send";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const limit = check(clientKey(req, "bookings"), 5, 60_000);
  if (!limit.allowed) return errors.rateLimited();

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return errors.badRequest("Invalid JSON body");
  }
  const parse = bookingSchema.safeParse(payload);
  if (!parse.success) {
    return errors.badRequest("Validation failed", parse.error.flatten());
  }
  const data = parse.data;

  try {
    const tour = await prisma.tour.findUnique({ where: { slug: data.tourSlug } });
    if (!tour) return errors.notFound("Tour not found");

    const unitPrice = tour.price;
    const childPrice = Math.round(tour.price * 0.65);
    const extraPrice = data.extras ? 25 : 0;
    const subtotal = data.adults * unitPrice + data.children * childPrice + extraPrice;
    const couponDiscount = 0; // future
    const total = Math.max(0, subtotal - couponDiscount);

    const booking = await prisma.booking.create({
      data: {
        reference: ref.booking(),
        tourId: tour.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address || null,
        city: data.city || null,
        zip: data.zip || null,
        province: data.province || null,
        country: data.country,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        adults: data.adults,
        children: data.children,
        extras: data.extras,
        requirements: data.requirements || null,
        unitPrice,
        childPrice,
        extraPrice,
        couponCode: data.couponCode || null,
        couponDiscount,
        total,
        status: "pending",
      },
    });

    // Fire-and-forget email send (don't block the response on email failures).
    void sendBookingEmails({ booking, tour }).catch((err) =>
      log.error("email.booking", "send failed", { error: String(err) }),
    );

    return ok({ booking }, { status: 201 });
  } catch (e) {
    log.error("api.bookings", "create failed", { error: String(e) });
    return errors.unavailable();
  }
}
