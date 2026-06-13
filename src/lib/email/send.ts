import type { Booking, Contact, Payment, Tour } from "@prisma/client";
import { render } from "@react-email/render";
import { getResend, FROM, REPLY_TO, ADMIN_EMAIL } from "./client";
import { log } from "@/lib/api/logger";

import BookingReceived from "@/emails/booking-received";
import BookingConfirmation from "@/emails/booking-confirmation";
import ContactReceived from "@/emails/contact-received";
import NewsletterWelcome from "@/emails/newsletter-welcome";
import PaymentReceipt from "@/emails/payment-receipt";
import PaymentPending from "@/emails/payment-pending";
import PaymentFailed from "@/emails/payment-failed";
import AdminBookingNotification from "@/emails/admin-booking-notification";
import AdminContactNotification from "@/emails/admin-contact-notification";

async function deliver(opts: {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
}) {
  const resend = getResend();
  const html = await render(opts.react);
  const text = await render(opts.react, { plainText: true });
  if (!resend) {
    log.info("email", "Resend not configured — skipping send", {
      to: opts.to,
      subject: opts.subject,
    });
    return { id: null, skipped: true };
  }
  const res = await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: opts.to,
    subject: opts.subject,
    html,
    text,
  });
  return res;
}

// ── Booking flow emails ────────────────────────────────────────────────
export async function sendBookingEmails(opts: { booking: Booking; tour: Tour }) {
  const { booking, tour } = opts;
  const startDate = booking.startDate.toISOString().split("T")[0];
  const travellers = `${booking.adults} adult${booking.adults === 1 ? "" : "s"}, ${booking.children} child${booking.children === 1 ? "" : "ren"}`;

  await Promise.all([
    deliver({
      to: booking.email,
      subject: `Booking received — ${booking.reference}`,
      react: BookingReceived({
        firstName: booking.firstName,
        reference: booking.reference,
        tourTitle: tour.title,
        startDate,
        total: booking.total,
      }),
    }),
    deliver({
      to: ADMIN_EMAIL,
      subject: `New booking: ${booking.reference}`,
      react: AdminBookingNotification({
        reference: booking.reference,
        tourTitle: tour.title,
        customer: `${booking.firstName} ${booking.lastName}`,
        email: booking.email,
        phone: booking.phone,
        startDate,
        travellers,
        total: booking.total,
      }),
    }),
  ]);
}

// Confirmation email sent after payment success (also exposed for admin use).
export async function sendBookingConfirmation(opts: { booking: Booking; tour: Tour }) {
  const { booking, tour } = opts;
  const startDate = booking.startDate.toISOString().split("T")[0];
  await deliver({
    to: booking.email,
    subject: `Booking confirmed — ${booking.reference}`,
    react: BookingConfirmation({
      firstName: booking.firstName,
      reference: booking.reference,
      tourTitle: tour.title,
      startDate,
      travellers: `${booking.adults}A / ${booking.children}C`,
      total: booking.total,
    }),
  });
}

// ── Contact ────────────────────────────────────────────────────────────
export async function sendContactEmails(opts: { contact: Contact }) {
  const { contact } = opts;
  await Promise.all([
    deliver({
      to: contact.email,
      subject: "We've received your message",
      react: ContactReceived({ name: contact.name }),
    }),
    deliver({
      to: ADMIN_EMAIL,
      subject: `Contact form: ${contact.subject}`,
      react: AdminContactNotification({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
      }),
    }),
  ]);
}

// ── Newsletter ─────────────────────────────────────────────────────────
export async function sendNewsletterWelcome(opts: { email: string }) {
  await deliver({
    to: opts.email,
    subject: "Welcome to Travelora",
    react: NewsletterWelcome(),
  });
}

// ── Payments ───────────────────────────────────────────────────────────
export async function sendPaymentEmails(opts: {
  booking: Booking;
  payment: Payment;
  tour: Tour;
}) {
  const { booking, payment, tour } = opts;
  if (payment.status === "paid") {
    await Promise.all([
      deliver({
        to: booking.email,
        subject: `Payment receipt — ${payment.reference}`,
        react: PaymentReceipt({
          firstName: booking.firstName,
          paymentRef: payment.reference,
          bookingRef: booking.reference,
          tourTitle: tour.title,
          amount: payment.amount,
          method: payment.method,
        }),
      }),
      sendBookingConfirmation({ booking, tour }),
    ]);
  } else if (payment.status === "pending") {
    await deliver({
      to: booking.email,
      subject: `Payment pending — ${payment.reference}`,
      react: PaymentPending({
        firstName: booking.firstName,
        paymentRef: payment.reference,
        bookingRef: booking.reference,
        method: payment.method,
      }),
    });
  } else if (payment.status === "failed") {
    await deliver({
      to: booking.email,
      subject: `Payment failed — ${booking.reference}`,
      react: PaymentFailed({
        firstName: booking.firstName,
        bookingRef: booking.reference,
      }),
    });
  }
}
