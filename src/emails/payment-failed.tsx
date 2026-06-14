import * as React from "react";
import { BrandLayout, BodyText, SummaryCard, Detail, CtaButton } from "./_layout";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

export default function PaymentFailed({
  firstName,
  bookingRef,
}: {
  firstName: string;
  bookingRef: string;
}) {
  return (
    <BrandLayout
      preview={`Payment failed for booking ${bookingRef}`}
      title={`Hi ${firstName} — your payment didn't go through.`}
      intro="Don't worry — your booking is held for the next 24 hours while you retry."
    >
      <SummaryCard title="Booking on hold">
        <Detail label="Booking ref" value={bookingRef} />
        <Detail label="Status" value="Payment failed" />
        <Detail label="Hold until" value="24 hours from now" />
      </SummaryCard>

      <BodyText>
        Most failures are caused by a bank holding the transaction for review.
        Trying a different card or PayPal usually does the trick.
      </BodyText>

      <CtaButton href={`${SITE}/booking?ref=${bookingRef}`}>Retry payment</CtaButton>
    </BrandLayout>
  );
}
