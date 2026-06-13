import * as React from "react";
import { Section, Text } from "@react-email/components";
import { BrandLayout, Detail } from "./_layout";

export type BookingReceivedProps = {
  firstName: string;
  reference: string;
  tourTitle: string;
  startDate: string;
  total: number;
};

export default function BookingReceived({
  firstName,
  reference,
  tourTitle,
  startDate,
  total,
}: BookingReceivedProps) {
  return (
    <BrandLayout
      preview={`We've received your booking, ${firstName} — ref ${reference}`}
      title={`Thanks, ${firstName} — we've received your booking`}
    >
      <Text>
        We've received your booking request and will confirm it within 24 hours
        after a quick availability check. Your booking reference is{" "}
        <strong>{reference}</strong>.
      </Text>
      <Section className="my-4 rounded-xl bg-[#f6f7fb] p-4">
        <Detail label="Tour" value={tourTitle} />
        <Detail label="Start date" value={startDate} />
        <Detail label="Total" value={`$${total}`} />
        <Detail label="Status" value="Pending confirmation" />
      </Section>
      <Text>
        Need to change anything? Just reply to this email and our team will help
        you adjust your trip.
      </Text>
    </BrandLayout>
  );
}
