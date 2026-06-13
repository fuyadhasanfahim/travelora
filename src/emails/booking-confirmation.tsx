import * as React from "react";
import { Section, Text } from "@react-email/components";
import { BrandLayout, Detail } from "./_layout";

export type BookingConfirmationProps = {
  firstName: string;
  reference: string;
  tourTitle: string;
  startDate: string;
  travellers: string;
  total: number;
};

export default function BookingConfirmation({
  firstName,
  reference,
  tourTitle,
  startDate,
  travellers,
  total,
}: BookingConfirmationProps) {
  return (
    <BrandLayout
      preview={`Your Travelora booking is confirmed — ref ${reference}`}
      title={`You're going, ${firstName}!`}
    >
      <Text>
        Great news — your booking has been confirmed. We can't wait to see you
        on this trip. Keep this email for your records.
      </Text>
      <Section className="my-4 rounded-xl bg-[#f6f7fb] p-4">
        <Detail label="Booking ref" value={reference} />
        <Detail label="Tour" value={tourTitle} />
        <Detail label="Start date" value={startDate} />
        <Detail label="Travellers" value={travellers} />
        <Detail label="Total paid" value={`$${total}`} />
      </Section>
      <Text>
        We'll send you final logistics — meeting point, guide contact and
        packing notes — 7 days before departure.
      </Text>
    </BrandLayout>
  );
}
