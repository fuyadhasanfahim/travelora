import * as React from "react";
import { BrandLayout, BodyText, SummaryCard, Detail, CtaButton } from "./_layout";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

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
      title={`Thanks, ${firstName} — your booking is in.`}
      intro="Our team is checking availability now. We'll confirm everything by email within 24 hours."
    >
      <BodyText>
        Here&apos;s the snapshot we have so far. If anything looks off, just reply
        to this email and we&apos;ll sort it out.
      </BodyText>

      <SummaryCard title="Booking summary">
        <Detail label="Reference" value={reference} />
        <Detail label="Tour" value={tourTitle} />
        <Detail label="Start date" value={startDate} />
        <Detail label="Total" value={`$${total}`} />
        <Detail label="Status" value="Pending confirmation" />
      </SummaryCard>

      <CtaButton href={`${SITE}/tours`}>Explore more journeys</CtaButton>
    </BrandLayout>
  );
}
