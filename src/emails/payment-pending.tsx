import * as React from "react";
import { BrandLayout, BodyText, SummaryCard, Detail } from "./_layout";

export type PaymentPendingProps = {
  firstName: string;
  paymentRef: string;
  bookingRef: string;
  method: string;
};

export default function PaymentPending({
  firstName,
  paymentRef,
  bookingRef,
  method,
}: PaymentPendingProps) {
  return (
    <BrandLayout
      preview={`Payment pending for booking ${bookingRef}`}
      title={`Hold tight, ${firstName}.`}
      intro="We've recorded your payment intent and are waiting for the funds to clear. Bank transfers usually take 1–2 business days."
    >
      <SummaryCard title="Pending payment">
        <Detail label="Payment ref" value={paymentRef} />
        <Detail label="Booking ref" value={bookingRef} />
        <Detail label="Method" value={method.toUpperCase()} />
        <Detail label="Status" value="Pending" />
      </SummaryCard>

      <BodyText>
        No action needed from your side for now — we&apos;ll email you again as
        soon as the payment clears and your booking is confirmed.
      </BodyText>
    </BrandLayout>
  );
}
