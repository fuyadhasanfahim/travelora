import * as React from "react";
import { BrandLayout, BodyText, SummaryCard, Detail, CtaButton } from "./_layout";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travelora.app";

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
      intro="Your booking is confirmed. Get the camera ready — adventure unlocked."
    >
      <BodyText>
        Keep this email for your records. We&apos;ll send final logistics —
        meeting point, guide contact, packing tips — about 7 days before
        departure.
      </BodyText>

      <SummaryCard title="Trip details">
        <Detail label="Booking ref" value={reference} />
        <Detail label="Tour" value={tourTitle} />
        <Detail label="Start date" value={startDate} />
        <Detail label="Travellers" value={travellers} />
        <Detail label="Total paid" value={`$${total}`} />
      </SummaryCard>

      <CtaButton href={`${SITE}/tours`}>Plan your next escape</CtaButton>
    </BrandLayout>
  );
}
