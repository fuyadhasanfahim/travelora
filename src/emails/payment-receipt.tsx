import * as React from "react";
import { Section, Text } from "@react-email/components";
import { BrandLayout, Detail } from "./_layout";

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
      title={`We've received your payment, ${firstName}`}
    >
      <Text>This email confirms that your payment was successfully processed.</Text>
      <Section className="my-4 rounded-xl bg-[#f6f7fb] p-4">
        <Detail label="Receipt" value={paymentRef} />
        <Detail label="Booking" value={bookingRef} />
        <Detail label="Tour" value={tourTitle} />
        <Detail label="Method" value={method.toUpperCase()} />
        <Detail label="Amount" value={`$${amount}`} />
      </Section>
      <Text>
        Your booking is now confirmed. We'll be in touch closer to your departure
        date with final details.
      </Text>
    </BrandLayout>
  );
}
