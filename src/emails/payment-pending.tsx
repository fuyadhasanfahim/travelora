import * as React from "react";
import { Section, Text } from "@react-email/components";
import { BrandLayout, Detail } from "./_layout";

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
      title={`Hold tight, ${firstName} — payment pending`}
    >
      <Text>
        We've recorded your payment intent and are waiting for the funds to
        clear. This usually takes 1-2 business days for bank transfers.
      </Text>
      <Section className="my-4 rounded-xl bg-[#f6f7fb] p-4">
        <Detail label="Payment ref" value={paymentRef} />
        <Detail label="Booking ref" value={bookingRef} />
        <Detail label="Method" value={method.toUpperCase()} />
      </Section>
      <Text>
        We'll email you again as soon as your payment is confirmed. No action
        needed from you for now.
      </Text>
    </BrandLayout>
  );
}
