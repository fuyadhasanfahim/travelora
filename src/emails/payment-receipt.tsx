import * as React from "react";
import { BrandLayout, BodyText, SummaryCard, Detail, CtaButton } from "./_layout";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

export type PaymentReceiptProps = {
  firstName: string;
  paymentRef: string;
  bookingRef: string;
  tourTitle: string;
  amount: number;
  method: string;
};

export default function PaymentReceipt({
  firstName,
  paymentRef,
  bookingRef,
  tourTitle,
  amount,
  method,
}: PaymentReceiptProps) {
  return (
    <BrandLayout
      preview={`Payment received — receipt ${paymentRef}`}
      title={`Payment received, ${firstName}.`}
      intro="Your booking is now confirmed. This is your official receipt — keep it for your records."
    >
      <SummaryCard title="Receipt">
        <Detail label="Receipt #" value={paymentRef} />
        <Detail label="Booking #" value={bookingRef} />
        <Detail label="Tour" value={tourTitle} />
        <Detail label="Method" value={method.toUpperCase()} />
        <Detail label="Amount" value={`$${amount}`} />
      </SummaryCard>

      <BodyText>
        We&apos;ll be in touch closer to your departure with the final trip
        details. Until then — start dreaming.
      </BodyText>

      <CtaButton href={`${SITE}/tours`}>Browse another adventure</CtaButton>
    </BrandLayout>
  );
}
